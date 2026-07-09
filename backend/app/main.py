import time
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.core.config import get_settings
from app.core.logging import setup_logging, get_logger
from app.api.routes import health, background, enhance
from app.utils.storage import ensure_storage_directories
from app.services.background_service import get_background_service
from app.services.enhancer_service import get_enhancer_service

# Load config
settings = get_settings()

# Initialize Logger
logger = get_logger("main")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup actions
    setup_logging()
    logger.info("Initializing system startup sequences...")

    # 1. Setup local folders
    ensure_storage_directories()

    # 2. Warm up services once on startup (models load once, reuse on requests)
    get_background_service().load_model()
    get_enhancer_service().load_model()

    logger.info("Startup complete. System fully operational.")
    yield
    # Shutdown actions
    logger.info("Shutting down API service...")


app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="Production-ready FastAPI backend for VisionCraft AI image tools.",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Global request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()

    client_host = request.client.host if request.client else "unknown"
    logger.info("Request: %s %s from %s", request.method, request.url.path, client_host)

    try:
        response = await call_next(request)
        process_time = (time.time() - start_time) * 1000
        logger.info(
            "Completed: %s %s -> %d (%.2fms)",
            request.method,
            request.url.path,
            response.status_code,
            process_time
        )
        return response
    except Exception as e:
        process_time = (time.time() - start_time) * 1000
        logger.error(
            "Failed: %s %s -> %s (%.2fms)",
            request.method,
            request.url.path,
            str(e),
            process_time,
            exc_info=True
        )
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": "An internal server error occurred while processing your image."}
        )


# Global Exception Handler for FastAPI HTTPException
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail}
    )


# Global Exception Handler for unhandled exceptions
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(
        "Unhandled exception on %s: %s",
        request.url.path,
        str(exc),
        exc_info=True
    )
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "A critical system error occurred. Please try again."}
    )


# Mount Routes
app.include_router(health.router, prefix="/health", tags=["Health Status"])
app.include_router(background.router, prefix="/remove-background", tags=["Background Remover"])
app.include_router(enhance.router, prefix="/enhance-image", tags=["Image Enhancer"])
