import os
import re
from fastapi import UploadFile, HTTPException, status
from PIL import Image
from app.core.config import get_settings
from app.core.logging import get_logger

logger = get_logger("security")
settings = get_settings()

# Allowed image MIME types
ALLOWED_MIME_TYPES = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/webp": "webp"
}

# Allowed PIL formats
ALLOWED_PIL_FORMATS = {"PNG", "JPEG", "WEBP"}


def sanitize_filename(filename: str) -> str:
    """Sanitizes a filename to keep only alphanumeric characters, dots, and hyphens.
    
    Replaces spaces with underscores and protects against path traversal.
    """
    # Get only the basename to prevent path traversal
    base_name = os.path.basename(filename)
    
    # Remove any character not in a-zA-Z0-9.-_
    sanitized = re.sub(r"[^a-zA-Z0-9.\-_]", "_", base_name)
    
    # Ensure it's not empty
    if not sanitized or sanitized in (".", ".."):
        sanitized = "unnamed_file"
        
    return sanitized


def validate_file_size(file: UploadFile) -> int:
    """Verifies that the uploaded file size is within the allowed limits."""
    # Move stream cursor to end of file to determine size
    file.file.seek(0, os.SEEK_END)
    file_size = file.file.tell()
    # Reset stream cursor to beginning
    file.file.seek(0)
    
    if file_size > settings.MAX_UPLOAD_SIZE:
        max_mb = settings.MAX_UPLOAD_SIZE / (1024 * 1024)
        logger.warning(
            "File upload rejected: size %d bytes exceeds limit of %d bytes",
            file_size,
            settings.MAX_UPLOAD_SIZE
        )
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds maximum allowed size of {max_mb:.1f}MB."
        )
        
    return file_size


def validate_image_content(file: UploadFile):
    """Verifies that the uploaded file is a valid image using PIL."""
    content_type = file.content_type
    
    # 1. Broad MIME type validation
    if not content_type:
        logger.warning("File upload rejected: missing content type")
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail="Missing file content type."
        )
    
    # Normalizing content type (e.g. image/jpeg;charset=utf-8)
    normalized_ct = content_type.split(";")[0].strip().lower()
    
    if normalized_ct not in ALLOWED_MIME_TYPES:
        logger.warning("File upload rejected: unsupported content type %s", content_type)
        raise HTTPException(
            status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
            detail=f"Unsupported file type: {content_type}. Only PNG, JPEG, and WEBP images are supported."
        )
        
    # 2. Open with PIL to verify integrity and actual format
    try:
        # Save current position
        file.file.seek(0)
        
        # Open image using PIL
        img = Image.open(file.file)
        img.verify()  # Verify image integrity (checks headers, doesn't load full pixel data)
        
        # Check if the format is allowed
        img_format = img.format
        if not img_format or img_format not in ALLOWED_PIL_FORMATS:
            logger.warning("File upload rejected: unsupported PIL format %s", img_format)
            raise HTTPException(
                status_code=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
                detail=f"Unsupported image format: {img_format}. Only PNG, JPEG, and WEBP are supported."
            )
            
        # Reset pointer for subsequent reads
        file.file.seek(0)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Security/Integrity check failed: invalid image structure. Error: %s", str(e))
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Invalid image structure or corrupted file. The file could not be parsed as a valid image."
        )
