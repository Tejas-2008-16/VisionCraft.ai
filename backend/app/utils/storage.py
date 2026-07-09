import os
import uuid
import aiofiles
from fastapi import UploadFile
from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger("utils.storage")
settings = get_settings()


def ensure_storage_directories():
    """Ensures all configured directory paths exist on disk."""
    directories = [
        settings.model_dir_path,
        settings.temp_dir_path,
        settings.output_dir_path
    ]
    for directory in directories:
        if not os.path.exists(directory):
            logger.info("Creating directory: %s", directory)
            os.makedirs(directory, exist_ok=True)
            
            # Place a .gitkeep file in the directory
            gitkeep_path = os.path.join(directory, ".gitkeep")
            if not os.path.exists(gitkeep_path):
                with open(gitkeep_path, "w") as f:
                    pass


async def save_temp_upload(file: UploadFile, sanitized_name: str) -> str:
    """Saves an UploadFile object asynchronously to the temp directory with a unique name."""
    ensure_storage_directories()
    
    # Generate unique prefix
    unique_id = uuid.uuid4().hex[:8]
    unique_name = f"{unique_id}_{sanitized_name}"
    dest_path = os.path.join(settings.temp_dir_path, unique_name)
    
    # Reset file pointer just in case
    file.file.seek(0)
    
    logger.debug("Saving upload chunk to: %s", dest_path)
    async with aiofiles.open(dest_path, "wb") as out_file:
        while content := await file.read(1024 * 1024):  # 1MB chunks
            await out_file.write(content)
            
    return dest_path


def register_for_cleanup(file_path: str):
    """Deletes a file from disk. Typically run inside a FastAPI BackgroundTask."""
    if not file_path:
        return
        
    try:
        if os.path.exists(file_path):
            # Check if it's a directory
            if os.path.isdir(file_path):
                return
            # Don't delete .gitkeep
            if os.path.basename(file_path) == ".gitkeep":
                return
                
            os.remove(file_path)
            logger.info("Cleaned up temporary file: %s", os.path.basename(file_path))
    except Exception as e:
        logger.warning("Failed to clean up file %s: %s", file_path, str(e))
