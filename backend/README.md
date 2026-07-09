# VisionCraft AI - FastAPI Backend

FastAPI backend for VisionCraft AI.

## Getting Started

First, set up your Python virtual environment:

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows (CMD):
.\venv\Scripts\activate
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# macOS/Linux:
source venv/bin/activate
```

Second, install the required dependencies:

```bash
pip install -r requirements.txt
```

Third, run the FastAPI application in development mode with uvicorn:

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Open [http://localhost:8000/docs](http://localhost:8000/docs) in your browser to view the interactive Swagger API documentation.
