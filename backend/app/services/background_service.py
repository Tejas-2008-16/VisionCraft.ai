import os
from PIL import Image
from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger("services.background")
settings = get_settings()


class BackgroundService:
    def __init__(self):
        self.session = None
        self.model_loaded = False

    def load_model(self):
        """Loads the rembg model session.
        
        Loads once during server startup and caches the loaded instance.
        """
        if self.model_loaded:
            return
            
        logger.info("Initializing U2-Net/RMBG neural session...")
        try:
            from rembg import new_session
            # We initialize a new session to load model weights and cache them.
            # Using 'u2net' is highly accurate for general subject background removal.
            self.session = new_session("u2net")
            logger.info("Neural weights loaded and cached successfully.")
        except BaseException as e:
            logger.error("Failed to load U2-Net weights: %s", str(e))
            self.session = None
            
        self.model_loaded = True

    async def remove_background(self, input_path: str) -> str:
        """Processes an image to remove the background, saving a transparent PNG to outputs."""
        if not self.model_loaded:
            self.load_model()
            
        filename = os.path.basename(input_path)
        name, _ = os.path.splitext(filename)
        output_name = f"no_bg_{name}.png"
        output_path = os.path.join(settings.output_dir_path, output_name)
        
        logger.info("Running neural background removal for: %s", filename)
        
        try:
            from rembg import remove
            
            with Image.open(input_path) as img:
                # Run the actual background removal neural network
                if self.session:
                    output_img = remove(img, session=self.session)
                else:
                    output_img = remove(img)
                
                # Save to output path as PNG
                output_img.save(output_path, "PNG")
                logger.info("Neural background removal completed: %s", output_path)
                
            return output_path
        except Exception as e:
            logger.error("Failed running neural background removal: %s", str(e))
            raise e


# Singleton service instance
_background_service = BackgroundService()


def get_background_service() -> BackgroundService:
    """Dependency provider returning the singleton BackgroundService instance."""
    return _background_service
