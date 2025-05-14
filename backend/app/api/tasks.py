For this task, we will create an API endpoint to fetch tasks from a database. 

The request and response are modeled with Pydantic. 

We also include a service layer that communicates with the database. 

Finally, we include a database model for the tasks as well as a mock unit test.

```python
from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from typing import List
import time
from sqlalchemy.orm import Session
from fastapi.testclient import TestClient

# Pydantic models
class TaskBase(BaseModel):
    title: str = Field(..., example="Buy groceries")
    description: str = Field(..., example="Buy milk and bread from the supermarket")

class Task(TaskBase):
    id: int

    class Config:
        orm_mode = True

# Database model
class DBTask:
    def __init__(self, id: int, title: str, description: str):
        self.id = id
        self.title = title
        self.description = description

# Service layer
def get_tasks(db: Session):
    # Mock database fetch
    time.sleep(1)  # simulate delay
    return [DBTask(1, "Buy groceries", "Buy milk and bread from the supermarket")]

# FastAPI instance
app = FastAPI()

# Dependency
def get_db():
    class MockSession:
        pass
    return MockSession()

@app.get("/tasks", response_model=List[Task])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Fetch tasks from the database
    """
    start_time = time.time()
    tasks = get_tasks(db)
    end_time = time.time()
    elapsed_time = end_time - start_time
    if elapsed_time > 2:
        raise HTTPException(status_code=500, detail="Tasks took too long to load")
    return tasks

# Unit test
def test_read_tasks():
    client = TestClient(app)
    response = client.get("/tasks")
    assert response.status_code == 200
    assert len(response.json()) > 0
```

In the above code, the `read_tasks` function fetches tasks from the database through the `get_tasks` function. It then checks if the time taken to fetch the tasks exceeds 2 seconds. If it does, it returns a 500 status code with a suitable message. The unit test checks if the `/tasks` endpoint responds with a 200 status code and that the response contains at least one task.

Please note that in a real-world application, you would replace the `get_tasks` function and `DBTask` class with actual database operations. The `get_db` function would also provide an actual database session.