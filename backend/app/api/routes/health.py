import time
from fastapi import APIRouter
from app.core.config import get_settings

router = APIRouter()
settings = get_settings()

START_TIME = time.time()


@router.get("", summary="Get API Service Health")
async def health_check():
    """Returns the operational status of the service, system settings, and uptime info."""
    uptime_seconds = time.time() - START_TIME
    
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "debug_mode": settings.DEBUG,
        "max_upload_size_bytes": settings.MAX_UPLOAD_SIZE,
        "max_upload_size_mb": settings.MAX_UPLOAD_SIZE / (1024 * 1024),
        "uptime_seconds": round(uptime_seconds, 2),
        "uptime_formatted": format_uptime(uptime_seconds)
    }


def format_uptime(seconds: float) -> str:
    """Formats uptime seconds into a human-readable string."""
    days, rem = divmod(int(seconds), 86400)
    hours, rem = divmod(rem, 3600)
    minutes, secs = divmod(rem, 60)
    
    parts = []
    if days > 0:
        parts.append(f"{days}d")
    if hours > 0:
        parts.append(f"{hours}h")
    if minutes > 0:
        parts.append(f"{minutes}m")
    parts.append(f"{secs}s")
    
    return " ".join(parts)
