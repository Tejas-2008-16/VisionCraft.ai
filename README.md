# VisionCraft AI - AI Image Toolkit

A premium, production-ready AI image toolkit for removing backgrounds and enhancing image quality. Built using a modern Next.js frontend and a modular FastAPI backend.

## Project Structure

```text
AI-Image-Toolkit/
├── frontend/               # Next.js App Router Frontend
│   ├── app/                # Application routes and views
│   ├── components/         # Glassmorphic and animated UI components
│   ├── public/             # Static assets
│   ├── package.json        # Frontend configuration
│   └── tsconfig.json       # TypeScript configuration
│
├── backend/                # FastAPI Backend
│   ├── app/                # Python backend codebase
│   │   ├── main.py         # Entrypoint
│   │   ├── api/routes/     # REST Endpoints (/health, /remove-background, etc.)
│   │   ├── core/           # Logging, config, security rules
│   │   └── services/       # Image processing services
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment variables example
│
├── README.md               # This file
└── .gitignore              # Multi-project gitignore rules
```

---

## Getting Started

### 1. Run the Frontend

Navigate to the `frontend/` directory and start the dev server:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

### 2. Run the Backend

Navigate to the `backend/` directory, set up your environment, and start the FastAPI server:

```bash
cd backend
# Create virtual environment
python -m venv venv
# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment variables
copy .env.example .env   # (Windows CMD)
# Or: cp .env.example .env (Linux/macOS/Powershell)

# Run server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

The API endpoints will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000) and the Interactive API Documentation at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).
