"""
Woopy - Workout Planner App
FastAPI application entry point

Tech Stack:
- FastAPI: Modern async web framework
- Jinja2: Template engine for server-side rendering
- Tailwind CSS: Utility-first CSS framework
- HTMX: Dynamic interactions without JavaScript complexity
"""

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.config import settings

# Initialize FastAPI app
app = FastAPI(
    title="Woopy - Workout Planner",
    description="Your personal workout planning companion",
    version="0.1.0",
)

# Mount static files (CSS, JS, images)
app.mount("/static", StaticFiles(directory=settings.STATIC_DIR), name="static")

# Setup Jinja2 templates
templates = Jinja2Templates(directory=settings.TEMPLATES_DIR)


# ============================================================================
# ROUTE: Homepage /     Root
# ============================================================================
@app.get("/", include_in_schema=False)
async def index(request: Request):
    """Home page - redirects to dashboard or login"""
    return templates.TemplateResponse(request=request, name="auth/login.html")


# ============================================================================
# HEALTH CHECK
# ============================================================================
@app.get("/health")
async def health_check():
    """Health check endpoint for deployment"""
    return {"status": "healthy", "service": "woopy-api", "version": "0.1.0"}
