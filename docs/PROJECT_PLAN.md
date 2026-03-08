# Workout Planner App - Project Plan & Architecture

**Project Status:** Pre-Implementation Phase - Awaiting Approval
**Last Updated:** 2026-03-07

---

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Tech Stack Overview](#tech-stack-overview)
3. [Architecture & Design](#architecture--design)
4. [Database Design](#database-design)
5. [API Specification](#api-specification)
6. [Frontend Structure](#frontend-structure)
7. [Clean Code Principles](#clean-code-principles)
8. [Development Workflow](#development-workflow)

---

## Executive Summary

A workout planner application built with modern Python/Web technologies following SDLC best practices. The app will help users:
- Plan and track workout routines
- Manage exercises and sets/reps
- Track progress over time
- Organize workouts by muscle groups/goals

**Phase 1:** FastAPI + SQLAlchemy backend
**Phase 2:** Django version (optional future phase)

---

## Tech Stack Overview

### Backend
- **FastAPI**: Modern, fast, with automatic docs (OpenAPI/Swagger)
  - Why: Type hints, async support, excellent for learning best practices
  - Skill-building value: Industry standard async patterns

- **SQLAlchemy ORM**: Database abstraction with data validation
  - Why: Clean data model definitions, relationship management
  - Skill-building value: Understanding ORM patterns and optimization

- **Alembic**: Database migration management
  - Why: Version control for schema changes, team collaboration
  - Skill-building value: Professional DB management practices

- **Pydantic**: Data validation and serialization
  - Why: Request/response validation, type safety
  - Comes integrated with FastAPI

### Frontend
- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first styling without custom CSS bloat
- **HTMX**: Dynamic interactions without JavaScript complexity
  - Why: Server-side rendering templates with minimal JS
  - Skill-building value: Modern HTML interactions, alternative to SPA frameworks

- **Jinja2**: Template engine (built into FastAPI)

### Development Tools
- **uv**: Fast Python package manager
  - Why: Faster than pip/poetry, modern tooling
  - Project structure: pyproject.toml + uv.lock

- **Development Server**: FastAPI + Uvicorn (auto-reload)

---

## Architecture & Design

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Jinja2 Templates)              │
│         HTML5 + Tailwind CSS + HTMX                         │
└────────────────────┬────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    HTML Pages              JSON API
         │                       │
┌────────▼───────────────────────▼────────────────────────────┐
│              FastAPI Application Layer                      │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Routes (API & Template Rendering)                  │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Business Logic / Services                          │   │
│  └─────────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Pydantic Schemas (Request/Response Validation)     │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│          Database Access Layer (SQLAlchemy ORM)            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Models (Tables, Relationships, Constraints)        │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│         Database (PostgreSQL or SQLite for dev)            │
│         Managed by Alembic (migrations)                    │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure (Proposed)
```
woopy/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI app creation
│   ├── config.py               # Configuration (DB URL, settings)
│   │
│   ├── models/                 # SQLAlchemy ORM models
│   │   ├── __init__.py
│   │   ├── base.py             # Base model with common fields
│   │   ├── user.py             # User model
│   │   ├── workout.py          # Workout & Exercise models
│   │   └── progress.py         # Progress tracking models
│   │
│   ├── schemas/                # Pydantic request/response schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── workout.py
│   │   └── progress.py
│   │
│   ├── routers/                # API route handlers
│   │   ├── __init__.py
│   │   ├── users.py            # User CRUD + auth
│   │   ├── workouts.py         # Workout management
│   │   ├── exercises.py        # Exercise library
│   │   └── progress.py         # Progress tracking
│   │
│   ├── services/               # Business logic layer
│   │   ├── __init__.py
│   │   ├── user_service.py
│   │   ├── workout_service.py
│   │   └── progress_service.py
│   │
│   ├── templates/              # Jinja2 templates
│   │   ├── base.html           # Base layout
│   │   ├── auth/               # Login, register
│   │   ├── dashboard/          # Main dashboard
│   │   ├── workouts/           # Workout pages
│   │   ├── exercises/          # Exercise library
│   │   ├── progress/           # Progress views
│   │   └── components/         # Reusable components
│   │
│   ├── static/                 # CSS, images, favicon
│   │   ├── css/
│   │   ├── img/
│   │   └── js/                 # Minimal JS if needed
│   │
│   ├── database.py             # Database connection setup
│   ├── dependencies.py         # Dependency injection helpers
│   └── exceptions.py           # Custom exception handling
│
├── migrations/                 # Alembic migrations (auto-generated)
│   ├── env.py
│   ├── alembic.ini
│   └── versions/
│
├── tests/                      # Unit & integration tests
│   ├── __init__.py
│   ├── conftest.py             # Pytest fixtures
│   ├── test_models.py
│   ├── test_routers/
│   └── test_services/
│
├── pyproject.toml              # Project metadata & dependencies
├── uv.lock                     # Lock file (uv)
├── .env.example                # Environment variables template
├── .gitignore
├── README.md
└── PROJECT_PLAN.md             # This file
```

---

## Database Design

### Core Entities & Relationships

#### 1. **Users** (Authentication & Profile)
```
users
├── id (PK, UUID)
├── email (UNIQUE)
├── username (UNIQUE)
├── password_hash
├── full_name
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
└── is_active (BOOLEAN)
```

**Why these fields:**
- UUID: Better distributed system support, privacy by default
- email + username: Flexibility in login methods
- password_hash: Security (never store plaintext)
- Timestamps: Audit trail, useful for analytics
- is_active: Soft delete pattern

---

#### 2. **Workouts** (Main Planning Entity)
```
workouts
├── id (PK, UUID)
├── user_id (FK → users)
├── name (VARCHAR): "Full Body A", "Push Day"
├── description (TEXT)
├── target_days (VARCHAR): Which days (e.g., "Monday,Wednesday")
├── difficulty_level (ENUM): Beginner, Intermediate, Advanced
├── estimated_duration_minutes (INT)
├── notes (TEXT)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
├── is_active (BOOLEAN)
└── INDEX on (user_id, is_active)
```

**Why this design:**
- Separates user data from workout definitions
- Template workouts can be reused/scheduled across days
- Difficulty level helps progression tracking

---

#### 3. **ExerciseLibrary** (Predefined Exercise Catalog)
```
exercise_library
├── id (PK, UUID)
├── name (VARCHAR): "Bench Press", "Squats"
├── description (TEXT)
├── muscle_groups (VARCHAR): "Chest,Triceps" (comma-separated or JSON)
├── equipment_required (VARCHAR)
├── instructions (TEXT)
├── difficulty_level (ENUM)
├── created_at (TIMESTAMP)
├── INDEX on (name) - for search
└── UNIQUE(name)
```

**Why this design:**
- System-wide exercise catalog (not user-specific initially)
- Reusable across all workouts
- Optimization: Query by muscle group for recommendations
---

#### 4. **WorkoutExercises** (Join Table - Exercises in a Workout)
```
workout_exercises
├── id (PK, UUID)
├── workout_id (FK → workouts, CASCADE DELETE)
├── exercise_id (FK → exercise_library)
├── order_in_workout (INT): Sequence order
├── target_sets (INT)
├── target_reps (VARCHAR): "8-12", "5x5", "AMRAP"
├── target_weight_kg (DECIMAL, NULLABLE)
├── rest_seconds (INT): Rest between sets
├── notes (TEXT)
├── created_at (TIMESTAMP)
├── UNIQUE(workout_id, exercise_id) [prevent duplicates]
└── INDEX on (workout_id, order_in_workout)
```

**Why this design:**
- Separates workout structure from exercise definitions
- Supports different rep schemes (hypertrophy, strength, endurance)
- Rest timing supports training principles
- Order field enables sequence tracking

---

#### 5. **WorkoutSessions** (Execution Tracking)
```
workout_sessions
├── id (PK, UUID)
├── user_id (FK → users)
├── workout_id (FK → workouts)
├── session_date (DATE)
├── session_time (TIME)
├── total_duration_minutes (INT)
├── completion_status (ENUM): "Planned", "In Progress", "Completed", "Skipped"
├── notes (TEXT)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
└── INDEX on (user_id, session_date)
```

**Why this design:**
- Track when workouts are executed
- Relationship to specific completed workout definition
- Status tracking for calendar views

---

#### 6. **SetLogs** (Granular Performance Data)
```
set_logs
├── id (PK, UUID)
├── workout_session_id (FK → workout_sessions, CASCADE DELETE)
├── workout_exercise_id (FK → workout_exercises)
├── set_number (INT)
├── actual_reps (INT)
├── actual_weight_kg (DECIMAL, NULLABLE)
├── actual_time_seconds (INT, NULLABLE): For timed exercises
├── completed (BOOLEAN)
├── rating_difficulty (INT): 1-10 scale
├── notes (TEXT)
├── created_at (TIMESTAMP)
└── INDEX on (workout_session_id, workout_exercise_id)
```

**Why this design:**
- Granular performance tracking
- Compare actual vs. target (RPE, strength progress)
- Data for progress charts and analysis

---

#### 7. **ProgressMetrics** (Long-term Tracking)
```
progress_metrics
├── id (PK, UUID)
├── user_id (FK → users)
├── metric_type (ENUM): "Max Weight", "Volume", "Reps", "Body Weight", "Custom"
├── metric_name (VARCHAR): "Bench Press 1RM"
├── value (DECIMAL)
├── unit (VARCHAR): "kg", "lbs", "reps", "%"
├── measurement_date (DATE)
├── notes (TEXT)
├── created_at (TIMESTAMP)
└── INDEX on (user_id, metric_type, measurement_date)
```

**Why this design:**
- Flexible schema for different metrics
- Enables long-term progress visualization
- Not tied to specific workouts (useful for PRs, body weight, etc.)

---

### Database Optimization Considerations

**Indexes:**
- User lookups: `users.email`, `users.username` (UNIQUE auto-indexes)
- Workout queries: `(user_id, is_active)` composite
- Session queries: `(user_id, session_date)` for calendar views
- Set logs: `(workout_session_id)` for quick completion checks

**Query Patterns** (we'll optimize for):
1. "Get user's active workouts" - used frequently
2. "Get today's planned sessions" - used in dashboard
3. "Get set logs for a session" - used in form display
4. "Get progress history for metric X" - used in charts

**Future Optimization Strategies** (to discuss):
- Materialized views for aggregated metrics
- Caching layer for exercise library
- Denormalization of frequently-joined data (if needed)
- Pagination for large result sets

---

## API Specification

### Authentication Routes
```
POST   /api/auth/register           # Create account
POST   /api/auth/login              # Login (JWT token)
POST   /api/auth/logout             # Logout
GET    /api/auth/me                 # Current user info
POST   /api/auth/refresh-token      # Refresh JWT
```

### User Management Routes
```
GET    /api/users/profile           # Get current user profile
PATCH  /api/users/profile           # Update profile
POST   /api/users/change-password   # Change password
```

### Workout Routes
```
GET    /api/workouts                # List all workouts
POST   /api/workouts                # Create new workout
GET    /api/workouts/{id}           # Get workout details
PATCH  /api/workouts/{id}           # Update workout
DELETE /api/workouts/{id}           # Delete workout

GET    /api/workouts/{id}/exercises # Get exercises in workout
POST   /api/workouts/{id}/exercises # Add exercise to workout
PATCH  /api/workouts/{workout_id}/exercises/{exercise_id}  # Update exercise in workout
DELETE /api/workouts/{workout_id}/exercises/{exercise_id}  # Remove exercise
```

### Exercise Library Routes
```
GET    /api/exercises               # List all exercises
GET    /api/exercises/{id}          # Get exercise details
GET    /api/exercises/search?q=bench # Search exercises
GET    /api/exercises/muscle/{group} # Filter by muscle group
```

### Workout Session Routes
```
GET    /api/sessions                     # List sessions (paginated, filterable)
POST   /api/sessions                     # Create new session
GET    /api/sessions/{id}                # Get session details
PATCH  /api/sessions/{id}                # Update session
POST   /api/sessions/{id}/complete       # Mark as complete

GET    /api/sessions/{id}/set-logs       # Get all set logs for session
POST   /api/sessions/{id}/set-logs       # Create set log entry
PATCH  /api/sessions/{id}/set-logs/{log_id}  # Update set log
```

### Progress Routes
```
GET    /api/progress/metrics           # List user's metrics
POST   /api/progress/metrics           # Create new metric entry
GET    /api/progress/metric/{name}     # Get metric history
GET    /api/progress/summary           # Dashboard summary statistics
```

### Template Routes (Server-Side Rendered)
```
GET    /                           # Homepage
GET    /dashboard                  # Main dashboard
GET    /workouts                   # Workouts list page
GET    /workouts/new               # Create workout form
GET    /workouts/{id}              # View workout
GET    /workouts/{id}/edit         # Edit workout form
GET    /exercises                  # Exercise library browse
GET    /sessions                   # Sessions calendar/list
GET    /sessions/new               # Start new session
GET    /sessions/{id}/log          # Log workout session
GET    /progress                   # Progress dashboard
GET    /auth/register              # Register page
GET    /auth/login                 # Login page
GET    /auth/logout                # Logout
```

---

## Frontend Structure

### Layout Philosophy
- **Base Template**: Single `base.html` with Tailwind CSS framework
- **Component-Based**: Reusable Tailwind components (buttons, forms, cards)
- **HTMX Integration**: Form submissions, partial updates without page reload
- **Responsive Design**: Mobile-first Tailwind approach

### Key Templates & Components

#### Base Structure
```
templates/
├── base.html              # Top-level layout (header, nav, footer)
├── auth/
│   ├── register.html      # Registration form
│   └── login.html         # Login form
├── dashboard/
│   ├── index.html         # Main dashboard
│   └── summary.html       # Stats component (reusable)
├── workouts/
│   ├── list.html          # Workouts list
│   ├── detail.html        # View workout
│   ├── form.html          # Create/edit workout
│   └── exercise_row.html  # HTMX swap: add/edit exercise
├── exercises/
│   ├── library.html       # Browse exercises
│   └── search.html        # Search results
├── sessions/
│   ├── list.html          # Calendar/list view
│   ├── detail.html        # Session details
│   ├── log_form.html      # Log sets during workout
│   └── set_card.html      # HTMX: single set entry
├── progress/
│   ├── dashboard.html     # Charts & metrics
│   ├── metric_chart.html  # Chart component
│   └── metric_form.html   # Add metric entry
└── components/
    ├── navbar.html        # Navigation bar
    ├── sidebar.html       # Side menu (optional)
    ├── alert.html         # Alert/notification
    ├── forms/
    │   ├── input.html     # Input field snippet
    │   ├── select.html    # Dropdown snippet
    │   └── checkbox.html
    └── loading/
        └── spinner.html   # Loading indicator
```

### HTMX Patterns (Learning Goals)
1. **Form Submission**: `hx-post` to API endpoints
2. **Partial Updates**: `hx-get` for live search/filters
3. **Swap Strategies**: `hx-swap="innerHTML"` vs `"outerHTML"`
4. **Targets**: `hx-target="#element"` for DOM updates
5. **Indicators**: `hx-indicator=".spinner"` for UX feedback

### Tailwind CSS Usage
- Pre-defined utility classes (no custom CSS initially)
- Consistent color scheme (primary, secondary, accent, danger)
- Spacing scale for consistency
- Dark mode support (future enhancement)

---

## Clean Code Principles

### 1. **Single Responsibility Principle (SRP)**
- **Models**: Only define data structure and relationships
- **Routers**: Only handle HTTP request/response
- **Services**: Contain all business logic
- **Schemas**: Only handle data validation

**Example:**
```
❌ WRONG: Router doing database queries AND calculations
✅ RIGHT: Router calls Service → Service calls Repository → Repo queries DB
```

### 2. **DRY (Don't Repeat Yourself)**
- Reusable template components for common UI patterns
- Service methods for repeated business logic
- Database query helpers (mixins, base classes)

### 3. **Code Organization**
- Each file <300 lines max (for readability)
- Logical grouping by feature (app/routers/, app/services/, etc.)
- Clear naming: `workout_service.py` not `ws.py`

### 4. **Type Safety**
- Use Python type hints throughout (from `typing` module)
- Pydantic models for runtime validation
- FastAPI automatic OpenAPI docs from types

### 5. **Error Handling**
- Custom exception classes (in `app/exceptions.py`)
- Proper HTTP status codes (400, 401, 403, 404, 500)
- Consistent error response format

### 6. **Database Best Practices**
- Use Foreign Keys with CASCADE/SET NULL appropriately
- Normalize data (3NF) to avoid redundancy
- Composite indexes for common query patterns
- Query optimization: Eager loading relationships, limiting result sets

### 7. **API Design**
- RESTful conventions (GET/POST/PATCH/DELETE)
- Consistent URL structure
- Pagination for large datasets
- Clear request/response schemas with Pydantic

### 8. **Template Practices**
- No logic in templates (use filters/context only)
- DRY Jinja2 blocks and includes
- Semantic HTML5 elements
- Accessibility: ARIA labels, semantic elements

### 9. **Testing Philosophy**
- Unit tests for services (business logic)
- Integration tests for API endpoints
- Fixtures for test data
- Aim for >80% coverage on critical paths

### 10. **Documentation**
- Docstrings on functions/classes (Google style)
- Type hints as inline documentation
- API docs auto-generated from FastAPI
- README with setup instructions

---

## Development Workflow

### Phase 1: Setup & Foundation
1. **Environment Setup**
   - `uv init` project structure
   - `pyproject.toml` with core dependencies
   - `.env` configuration
   - Git initialization + `.gitignore`

2. **Database Foundation**
   - SQLAlchemy setup (`database.py`)
   - Alembic initialization
   - Base model with common fields

3. **FastAPI Structure**
   - `main.py` app initialization
   - Middleware setup (CORS, error handling)
   - Static files & templates configuration

### Phase 2: Core Models & Database
1. Implement all 7 entities (models/)
2. Create initial Alembic migration
3. Database relationships and constraints
4. Composite indexes based on query patterns

### Phase 3: API Layer
1. Implement API routers (routers/)
2. Pydantic schemas (schemas/)
3. Business logic services (services/)
4. Authentication/authorization

### Phase 4: Frontend Templates
1. Base layout with Tailwind
2. Page templates (auth, dashboard, workouts, etc.)
3. Reusable components
4. HTMX integration for interactivity

### Phase 5: Integration & Polish
1. End-to-end testing
2. Performance optimization (query analysis, caching)
3. Error handling & edge cases
4. Documentation & README

### Phase 6: Deployment Preparation
1. Docker configuration (optional)
2. Environment variable management
3. Logging setup
4. Security best practices review

---

## Dependencies (Proposed for uv)

### Core
- `fastapi` - Web framework
- `uvicorn[standard]` - ASGI server
- `sqlalchemy` - ORM
- `alembic` - Migrations
- `pydantic` - Validation
- `python-dotenv` - Environment variables

### Frontend
- `jinja2` - Template engine (included with FastAPI)

### Authentication (Phase 1 optional, Phase 2 recommended)
- `python-jose` - JWT tokens
- `passlib[bcrypt]` - Password hashing
- `python-multipart` - Form data handling

### Database
- `psycopg2-binary` or `sqlite3` (built-in)

### Development
- `pytest` - Testing framework
- `pytest-asyncio` - Async test support
- `pytest-cov` - Coverage reporting
- `black` - Code formatting
- `ruff` - Linting

---

## Next Steps for Approval

**Before we proceed with code generation, please confirm:**

1. ✅ Is this architecture and structure aligned with your vision?
2. ✅ Do you want to start with SQLite (dev) or PostgreSQL?
3. ✅ Should authentication be Phase 1 or Phase 2?
4. ✅ Any additional features or modifications to the core entities?
5. ✅ Timeline expectations - which phase do you want to focus on first?

---

**Ready when you are. Once approved, I'll generate:**
- Project scaffold (directories, init files)
- `pyproject.toml` with all dependencies
- Base models and Alembic setup
- Core API routers skeleton
- Base Jinja2 templates with Tailwind
