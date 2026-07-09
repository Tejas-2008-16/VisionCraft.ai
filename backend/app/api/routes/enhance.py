import os
from fastapi import APIRouter, File, UploadFile, Query, Depends, BackgroundTasks, HTTPException, status
from fastapi.responses import FileResponse
from app.core.security import validate_file_size, validate_image_content, sanitize_filename
from app.services.enhancer_service import get_enhancer_service, EnhancerService
from app.utils.storage import save_temp_upload, register_for_cleanup
from app.core.logging import get_logger

router = APIRouter()
logger = get_logger("routes.enhance")


@router.post("", summary="Enhance Image Quality")
async def enhance_image(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    mode: str = Query("auto", enum=["auto", "color", "exposure", "contrast"], description="Enhancement mode"),
    service: EnhancerService = Depends(get_enhancer_service)
):
    """Securely uploads an image and applies intelligent color, brightness, and sharpness enhancements."""
    # 1. Validation Checks
    validate_file_size(file)
    validate_image_content(file)
    
    # 2. Storage & Sanitization
    sanitized_name = sanitize_filename(file.filename)
    logger.info("Processing image enhancement (%s mode) for file: %s", mode, sanitized_name)
    
    input_path = await save_temp_upload(file, sanitized_name)
    
    # Register upload for cleanup in case processing fails
    background_tasks.add_task(register_for_cleanup, input_path)
    
    # 3. Processing
    output_path = await service.enhance(input_path, mode)
    
    # Register output for cleanup after file is sent
    background_tasks.add_task(register_for_cleanup, output_path)
    
    logger.info("Image enhancement successful. Returning output: %s", os.path.basename(output_path))
    
    # Get proper response media type
    media_type = file.content_type or "image/jpeg"
    
    # 4. Return Response
    return FileResponse(
        path=output_path,
        media_type=media_type,
        filename=f"enhanced_{sanitized_name}"
    )


# --- Future Placeholders as requested ---

@router.post("/upscale", summary="Upscale Image Resolution [Future Endpoint]")
async def upscale_image(file: UploadFile = File(...)):
    """Placeholder for AI Super Resolution upscaling (Real-ESRGAN/GFPGAN)."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Super Resolution Upscaler endpoint is under development. Coming soon!"
    )


@router.post("/compress", summary="Compress Image File Size [Future Endpoint]")
async def compress_image(file: UploadFile = File(...)):
    """Placeholder for intelligent image compression (preserving structural similarity)."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Image Compression endpoint is under development. Coming soon!"
    )


@router.post("/resize", summary="Resize Image Dimensions [Future Endpoint]")
async def resize_image(file: UploadFile = File(...)):
    """Placeholder for standard image dimension resizing."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Image Resizing endpoint is under development. Coming soon!"
    )


@router.post("/convert", summary="Convert Image Formats [Future Endpoint]")
async def convert_image(file: UploadFile = File(...)):
    """Placeholder for converting between PNG, JPEG, WEBP, and HEIC formats."""
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Image Format Conversion endpoint is under development. Coming soon!"
    )
