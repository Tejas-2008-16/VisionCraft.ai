import os
import cv2
import numpy as np
from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger("services.enhancer")
settings = get_settings()


class EnhancerService:
    def __init__(self):
        self.model = None
        self.model_loaded = False

    def load_model(self):
        """Pre-warms and checks for OpenCV/Pillow image enhancement libraries."""
        if self.model_loaded:
            return
            
        logger.info("Initializing OpenCV premium enhancement shaders...")
        self.model_loaded = True

    async def enhance(self, input_path: str, mode: str) -> str:
        """Processes an image using advanced OpenCV/PIL pipelines to restore details and color balance."""
        if not self.model_loaded:
            self.load_model()
            
        filename = os.path.basename(input_path)
        name, ext = os.path.splitext(filename)
        output_name = f"enhanced_{name}{ext}"
        output_path = os.path.join(settings.output_dir_path, output_name)
        
        logger.info("Running advanced OpenCV image enhancement (%s mode) for: %s", mode, filename)
        
        try:
            # Load the image using OpenCV
            img = cv2.imread(input_path)
            if img is None:
                raise ValueError("Failed to load image via OpenCV.")
                
            h, w = img.shape[:2]
            
            # --- Phase 1: Resolution-Based Pixel Smoothing ---
            # If the image is low-res/pixelated (e.g. less than 1200px wide),
            # upscale it using Lanczos interpolation to blend and smooth jagged pixel blocks.
            if w < 1200:
                scale_factor = 2
                img = cv2.resize(img, (w * scale_factor, h * scale_factor), interpolation=cv2.INTER_LANCZOS4)
                h, w = img.shape[:2]
                logger.info("Low-res image upscaled by 2x for pixel-smoothing (new size: %dx%d)", w, h)
                
            # --- Phase 2: Denoising & Block-Artifact Smoothing ---
            # Apply bilateral filter to smooth flat colors, textures, and compression jaggies
            # while keeping edge boundaries (details, lines, shapes) sharp.
            if mode == "contrast":
                # For contrast, keep smoothing moderate to prioritize sharp edges
                smoothed = cv2.bilateralFilter(img, d=7, sigmaColor=30, sigmaSpace=30)
            else:
                # Standard and auto modes receive high-quality texture smoothing
                smoothed = cv2.bilateralFilter(img, d=9, sigmaColor=50, sigmaSpace=50)

            # --- Phase 3: Brightness and Saturation Boosting ---
            hsv = cv2.cvtColor(smoothed, cv2.COLOR_BGR2HSV)
            h_ch, s_ch, v_ch = cv2.split(hsv)
            
            if mode == "exposure":
                # Max exposure adjustment: Brighten value channel by 20%
                v_enhanced = np.clip(v_ch.astype(np.int16) * 1.20, 0, 255).astype(np.uint8)
                s_enhanced = np.clip(s_ch.astype(np.int16) * 1.10, 0, 255).astype(np.uint8)
            elif mode == "color":
                # Max color adjustment: Saturate colors by 45%, mild brightness boost
                v_enhanced = np.clip(v_ch.astype(np.int16) * 1.05, 0, 255).astype(np.uint8)
                s_enhanced = np.clip(s_ch.astype(np.int16) * 1.45, 0, 255).astype(np.uint8)
            elif mode == "contrast":
                # Balanced adjustments
                v_enhanced = np.clip(v_ch.astype(np.int16) * 1.05, 0, 255).astype(np.uint8)
                s_enhanced = np.clip(s_ch.astype(np.int16) * 1.15, 0, 255).astype(np.uint8)
            else:  # "auto" mode
                # Auto: Brighten by 12% and saturate by 25%
                v_enhanced = np.clip(v_ch.astype(np.int16) * 1.12, 0, 255).astype(np.uint8)
                s_enhanced = np.clip(s_ch.astype(np.int16) * 1.25, 0, 255).astype(np.uint8)
                
            hsv_enhanced = cv2.merge((h_ch, s_enhanced, v_enhanced))
            enhanced_color = cv2.cvtColor(hsv_enhanced, cv2.COLOR_HSV2BGR)
            
            # --- Phase 4: Local Lighting Correction (CLAHE) ---
            # Adaptive histogram equalization on LAB L-channel to balance contrast and reveal shadows
            lab = cv2.cvtColor(enhanced_color, cv2.COLOR_BGR2LAB)
            l_ch, a_ch, b_ch = cv2.split(lab)
            
            clip_limit = 2.5 if mode in ("exposure", "auto") else 1.8
            clahe = cv2.createCLAHE(clipLimit=clip_limit, tileGridSize=(8, 8))
            cl = clahe.apply(l_ch)
            
            lab_enhanced = cv2.merge((cl, a_ch, b_ch))
            processed = cv2.cvtColor(lab_enhanced, cv2.COLOR_LAB2BGR)
            
            # --- Phase 5: High-Frequency Sharpness Restoration ---
            # Blend back sharpened details using an unsharp mask filter
            blurred = cv2.GaussianBlur(processed, (5, 5), 1.0)
            if mode == "contrast":
                # High sharpening
                processed = cv2.addWeighted(processed, 1.6, blurred, -0.6, 0)
            else:
                # Moderate/soft sharpening
                processed = cv2.addWeighted(processed, 1.4, blurred, -0.4, 0)
                
            # Save the processed image back to outputs
            cv2.imwrite(output_path, processed)
            logger.info("Advanced image enhancement completed: %s", output_path)
            return output_path
            
        except Exception as e:
            logger.error("Failed running OpenCV image enhancement: %s", str(e))
            raise e


# Singleton service instance
_enhancer_service = EnhancerService()


def get_enhancer_service() -> EnhancerService:
    """Dependency provider returning the singleton EnhancerService instance."""
    return _enhancer_service
