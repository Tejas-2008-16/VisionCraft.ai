import os
from fastapi import APIRouter, File, UploadFile, Depends, BackgroundTasks
from fastapi.responses import FileResponse
from app.core.security import validate_file_size, validate_image_content, sanitize_filename
from app.services.background_service import get_background_service, BackgroundService
from app.utils.storage import save_temp_upload, register_for_cleanup
from app.core.logging import get_logger

router = APIRouter()
logger = get_logger("routes.background")


@router.post("", summary="Remove Background from Image")
async def remove_background(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    service: BackgroundService = Depends(get_background_service)
):
    """Securely uploads an image, runs subject isolation segmentation, and returns a transparent PNG."""
    # 1. Validation Checks
    validate_file_size(file)
    validate_image_content(file)
    
    # 2. Storage & Sanitization
    sanitized_name = sanitize_filename(file.filename)
    logger.info("Processing background removal request for file: %s", sanitized_name)
    
    input_path = await save_temp_upload(file, sanitized_name)
    
    # Register upload for cleanup in case processing fails
    background_tasks.add_task(register_for_cleanup, input_path)
    
    # 3. Processing
    output_path = await service.remove_background(input_path)
    
    # Register output for cleanup after file is sent
    background_tasks.add_task(register_for_cleanup, output_path)
    
    logger.info("Background removal successful. Returning output: %s", os.path.basename(output_path))
    
    # 4. Return processed file Response
    return FileResponse(
        path=output_path,
        media_type="image/png",
        filename=f"no_bg_{sanitized_name}.png"
    )
