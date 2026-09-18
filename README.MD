A full-stack task manager web application created for students. This application comes with user options to edit,create , delete,search , filter and complete academic or personal tasks.

## Features

- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- View pending and completed tasks
- Search tasks by title and description
- Filter tasks by status
- Filter tasks by priority
- View task statistics
- Store tasks in a SQLite database
- REST API built with FastAPI
- React frontend with responsive styling

## Technology Stack

### Frontend

- React
- Vite
- JavaScript
- CSS
- Fetch API

### Backend

- Python
- FastAPI
- SQLAlchemy ORM
- Pydantic
- Uvicorn

### Database

- SQLite

### Database

- SQLite

## Project Structure

```text
Student Taskmanager/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── routes/
│   │       └── tasks.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   │   └── taskapi.js
│   │   ├── App.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Architecture and Approach

The application follows a client-server architecture.

The React frontend is responsible for:

- Rendering the user interface
- Managing form state
- Searching and filtering tasks
- Displaying task statistics
- Sending HTTP requests to the backend API

The FastAPI backend is responsible for:

- Providing REST API endpoints
- Validating request data
- Handling task creation, editing, deletion, and completion
- Managing database sessions
- Communicating with the database

SQLAlchemy is used as the Object Relational Mapper (ORM). It maps the Python task model to the SQLite database table and manages database sessions and queries.

The request flow is:

```text
React frontend
      ↓
FastAPI REST API
      ↓
SQLAlchemy ORM
      ↓
SQLite database
```

The frontend never accesses SQLite directly. All database operations go through the FastAPI backend.
## Database Setup

The application uses SQLite with SQLAlchemy ORM.

SQLite is a file-based relational database, so no separate database server is required for local development.

The SQLAlchemy database URL is configured in the backend:

```python
sqlite:///./student_tasks.db
```

The database engine and session are configured using SQLAlchemy. The task model defines the database table and its columns.

When the backend starts, SQLAlchemy creates the required tables if they do not already exist.

The local database file is generated at:

```text
backend/student_tasks.db
```

The database file is excluded from Git using `.gitignore`. A fresh database is created automatically when the backend is run locally.
## How the Database Works

1. FastAPI receives a request from the React frontend.
2. A SQLAlchemy database session is created.
3. The request handler uses the SQLAlchemy task model to query or modify data.
4. SQLAlchemy executes the corresponding database operation on SQLite.
5. Changes are committed and the session is closed.
6. FastAPI returns the result to the React frontend.
## Backend Setup

Open a terminal in the project root and run:

```powershell
cd backend
```

Create a Python virtual environment:

```powershell
python -m venv venv
```

Activate it on Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install the dependencies:

```powershell
pip install -r requirements.txt
```

Start the FastAPI server:

```powershell
python -m uvicorn app.main:app --reload
```

The backend runs at:

```text
http://127.0.0.1:8000
```

FastAPI interactive documentation is available at:

```text
http://127.0.0.1:8000/docs
```

## Frontend Setup

Open a second terminal in the project root:

```powershell
cd frontend
```

Install frontend dependencies:

```powershell
npm install
```

Start the Vite development server:

```powershell
npm run dev
```

The frontend runs at:

```text
http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks/` | Retrieve all tasks |
| POST | `/api/tasks/` | Create a new task |
| PUT | `/api/tasks/{task_id}` | Update a task |
| PATCH | `/api/tasks/{task_id}/complete` | Toggle task completion |
| DELETE | `/api/tasks/{task_id}` | Delete a task |

## Error Handling

The frontend uses `try...catch` blocks around API requests. If a request fails, an error message is displayed to the user.

The API service checks HTTP response status codes and throws an error when a request is unsuccessful.

FastAPI validates incoming request data and returns appropriate error responses for invalid requests or missing tasks.

## CORS Configuration

Because the frontend and backend run on different ports during development, the backend uses CORS middleware.

The local frontend origins are:

```text
http://localhost:5173
http://127.0.0.1:5173
```

## Environment Configuration

For local development, the frontend uses:

```text
http://127.0.0.1:8000/api/tasks
```

If the backend is deployed, set the API URL using a Vite environment variable:

```env
VITE_API_URL=[https://your-backend-url/api/tasks](https://your-backend-url/api/tasks)
```

## Testing the Application

1. Start the FastAPI backend.
2. Start the React frontend.
3. Open `http://localhost:5173`.
4. Create a task.
5. Edit the task.
6. Mark it as completed.
7. Search and filter tasks.
8. Delete the task.
9. Refresh the page and verify that the data remains available.

## Deployment

The frontend can be deployed using services such as Vercel or Netlify.

The FastAPI backend can be deployed using a service such as Render.

For deployment, the frontend API URL must be changed from the local backend URL to the deployed backend URL.

## Live Links

GitHub repository:

```text
Add your GitHub repository link here
```

Frontend deployment:

```text
Not deployed yet
```

Backend API documentation:

```text
Not deployed yet
```

## Future Improvements

- User authentication
- Task categories
- Reminder notifications
- Calendar view
- PostgreSQL support
- Automated tests
- User-specific task lists
## Backend Dependencies

The backend uses the following main packages:

```text
fastapi
uvicorn
sqlalchemy
pydantic
```
## Live Links

GitHub repository:

https://github.com/anirudh2024b-max/Student-Taskmanager

Frontend:

https://studenttaskmanagr.vercel.app/

Backend API documentation:

https://student-taskmanager-1.onrender.com/docs

SQLite does not need to be installed separately because it is included with Python.
