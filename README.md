# 🏋️ Woopy - Workout Planner

Your personal workout planning companion built with modern Python and web technologies.

**Status:** Frontend Templates Complete ✅ | Ready for Testing 🚀

---

## 📋 Project Overview

Woopy is a full-featured workout planning and tracking application designed to help users:

- **Plan** workout routines with exercises, sets, reps, and weights
- **Track** workout sessions with detailed performance metrics
- **Monitor** long-term progress with customizable metrics
- **Organize** workouts by muscle groups, difficulty levels, and goals

Built following SDLC best practices with clean code principles, this project serves as:
- ✅ A production-ready workout planner
- 📚 An interview preparation showcase
- 🧪 A learning resource for FastAPI, SQLAlchemy, and modern frontend patterns

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern async web framework with automatic API docs
- **SQLAlchemy 2.0** - Type-safe ORM for database interactions
- **Alembic** - Database migration management
- **Pydantic** - Data validation and serialization
- **Python 3.13+**

### Frontend
- **Jinja2** - Server-side template engine
- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first CSS framework (CDN)
- **HTMX** - Dynamic interactions with minimal JavaScript
- **Alpine.js** - Lightweight interactivity (optional)

### Development Tools
- **uv** - Fast Python package manager
- **pytest** - Testing framework
- **black** - Code formatter
- **ruff** - Linter

---

## 🚀 Quick Start

### Prerequisites
- Python 3.13+
- uv (install: `pip install uv`)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sbtdotio/woopy.git
   cd woopy
   ```

2. **Create virtual environment**
   ```bash
   uv venv
   source .venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   uv pip install -e ".[dev]"
   ```
   Or using pip:
   ```bash
   pip install -e ".[dev]"
   ```

4. **Run the development server**
   ```bash
   cd app
   python main.py
   ```

   Or with uvicorn directly:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

5. **Open in browser**
   ```
   http://localhost:8000
   ```

---

## 📁 Project Structure

```
woopy/
├── app/
│   ├── main.py                 # FastAPI application entry point
│   ├── templates/              # Jinja2 templates
│   │   ├── base.html           # Base layout
│   │   ├── auth/               # Authentication pages
│   │   ├── dashboard/          # Dashboard
│   │   ├── workouts/           # Workout management
│   │   ├── exercises/          # Exercise library
│   │   ├── sessions/           # Workout logging
│   │   ├── progress/           # Progress tracking
│   │   ├── components/         # Reusable components
│   │   │   ├── navbar.html
│   │   │   ├── footer.html
│   │   │   ├── alert.html
│   │   │   ├── card.html
│   │   │   ├── button.html
│   │   │   ├── loading/
│   │   │   └── forms/
│   │   └── errors/             # Error pages (TODO)
│   ├── static/                 # Static assets
│   │   ├── css/style.css       # Custom CSS
│   │   ├── js/main.js          # JavaScript utilities
│   │   └── img/                # Images
│   └── [models/, schemas/, routers/, services/] # To be created
│
├── migrations/                  # Alembic migrations (to be created)
├── tests/                       # Test suite (to be created)
├── pyproject.toml              # Project configuration
├── .env.example                # Environment variables template
├── .gitignore
├── README.md                   # This file
└── PROJECT_PLAN.md             # Architecture & design documentation
```

---

## 🎨 Frontend Features

### Components Library
The frontend uses reusable Tailwind CSS components:

- **Forms**: Input fields, select dropdowns, textareas with validation
- **Cards**: Flexible content containers
- **Buttons**: Primary, secondary, danger variants with sizes
- **Alerts**: Dismissible notifications (info, success, warning, error)
- **Loading**: Spinner for async operations
- **Navigation**: Sticky navbar with user menu
- **Footer**: Branded footer with links

### Pages Implemented
- ✅ **Auth**: Login & Registration pages
- ✅ **Dashboard**: Overview with stats and quick actions
- ✅ **Workouts**: List, detail, and form pages
- ✅ **Exercises**: Searchable exercise library
- ✅ **Sessions**: Workout logging interface
- ✅ **Progress**: Metrics dashboard with history

### Design Principles
- **Clean Code**: DRY template components
- **Accessibility**: Semantic HTML5, ARIA labels
- **Responsive**: Mobile-first Tailwind design
- **Performance**: Server-side rendering (no JS framework overhead)
- **User Experience**: HTMX for dynamic interactions without page reloads

---

## 🔧 Development Workflow

### Running Tests
```bash
pytest tests/
pytest tests/ --cov=app  # With coverage
```

### Code Quality
```bash
# Format code
black app/

# Lint
ruff check app/

# Type checking
mypy app/
```

### Database Migrations (Setup for Phase 2)
```bash
# Create new migration
alembic revision --autogenerate -m "Add users table"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1
```

---

## 📖 API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 🔄 Development Phases

### Phase 1: Frontend Templates ✅ COMPLETE
- [x] Project structure and configuration
- [x] Reusable component library
- [x] All page templates with Tailwind CSS
- [x] HTMX integration for dynamic features
- [x] Static assets (CSS, JS)

### Phase 2: Backend Implementation (NEXT)
- [ ] Database models (SQLAlchemy)
- [ ] API routers and endpoints
- [ ] Business logic (services)
- [ ] Authentication (JWT)
- [ ] Data validation (Pydantic schemas)
- [ ] Integration tests

### Phase 3: Optimization & Polish
- [ ] Query optimization (N+1 prevention)
- [ ] Caching strategies
- [ ] Error handling & logging
- [ ] Security best practices
- [ ] Performance testing

### Phase 4: Django Version (Future)
- [ ] Replicate functionality using Django
- [ ] Compare frameworks (FastAPI vs Django)

---

## 📊 Database Schema (Ready for Implementation)

See `PROJECT_PLAN.md` for detailed database design including:
- Users & authentication
- Workouts & exercises
- Workout sessions & set logs
- Progress metrics
- Optimized indexes and query patterns

---

## 🧪 Testing Strategy

```
tests/
├── test_models.py           # ORM model tests
├── test_routers/            # API endpoint tests
├── test_services/           # Business logic tests
└── conftest.py              # Shared fixtures
```

Example test:
```python
@pytest.mark.asyncio
async def test_create_workout(client, user):
    response = await client.post(
        "/api/workouts",
        json={"name": "Push Day", "difficulty": "intermediate"}
    )
    assert response.status_code == 201
```

---

## 🔐 Authentication & Security

Future implementation:
- JWT token-based authentication
- Password hashing with bcrypt
- CORS configuration
- Rate limiting
- SQL injection prevention (via SQLAlchemy)
- CSRF protection

---

## 📚 Learning Resources

This project demonstrates:
- **FastAPI**: Type hints, dependency injection, async patterns
- **SQLAlchemy 2.0**: Modern ORM, relationships, query optimization
- **Jinja2**: Template inheritance, filters, macros
- **HTMX**: Server-driven interactivity, form handling
- **Tailwind CSS**: Utility-first styling, responsive design
- **Clean Code**: SOLID principles, separation of concerns
- **SDLC**: Requirements, architecture, documentation, testing

---

## 🤝 Contributing

For interview preparation or learning purposes:

1. Create a feature branch
2. Implement changes following project conventions
3. Add tests
4. Submit with clear commit messages

---

## 📝 Notes

- **No custom CSS**: Tailwind utilities only (learn utility-first approach)
- **Server-rendered**: Jinja2 templates reduce JavaScript complexity
- **Type-safe**: Python type hints throughout
- **API-first**: All UI backed by clean APIs
- **Database-ready**: Migrations versioning system in place

---

## 🎯 Next Steps

1. **Install dependencies**: `uv pip install -e ".[dev]"`
2. **Start the server**: `cd app && python main.py`
3. **View the app**: http://localhost:8000
4. **Explore templates**: Check out `app/templates/` structure
5. **Read PROJECT_PLAN.md**: Understand the architecture

---

## 📄 License

MIT License - feel free to use this for learning and portfolio purposes.

---

## 🙋 Support

For questions about the architecture, design decisions, or implementation:
1. Check `PROJECT_PLAN.md` for detailed documentation
2. Review template comments for component usage
3. Examine `main.py` route structure for API patterns

Happy training! 💪🚀
