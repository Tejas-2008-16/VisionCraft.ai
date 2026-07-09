import logging
import sys
from app.core.config import get_settings

# Get settings
settings = get_settings()

# Define log format
LOG_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)s:%(funcName)s:%(lineno)d - %(message)s"


def setup_logging():
    """Sets up root logging configuration for the FastAPI application."""
    log_level = logging.DEBUG if settings.DEBUG else logging.INFO

    # Configure root logger
    logging.basicConfig(
        level=log_level,
        format=LOG_FORMAT,
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )

    # Disable excessive log spam from third-party libraries
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING if not settings.DEBUG else logging.INFO)
    logging.getLogger("uvicorn.error").setLevel(logging.INFO)
    logging.getLogger("numba").setLevel(logging.WARNING)
    logging.getLogger("llvmlite").setLevel(logging.WARNING)
    
    logger = logging.getLogger("app")
    logger.info("Logging configured. Level: %s", logging.getLevelName(log_level))


def get_logger(name: str) -> logging.Logger:
    """Returns a configured logger with the given name."""
    return logging.getLogger(name)
