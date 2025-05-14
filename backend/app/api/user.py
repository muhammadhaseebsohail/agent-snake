Given the task, we will create two endpoints; one for managing users and another for managing task settings. We'll use a simple in-memory database to store users and task settings for the sake of simplicity.

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI()

# In-memory database
users_db = {}
settings_db = {}

# Pydantic models
class User(BaseModel):
    username: str
    email: str
    password: str
    is_admin: bool

class Settings(BaseModel):
    setting_id: str
    value: str

# Services
@app.post("/user/", response_model=User)
def create_user(user: User):
    """Creates a new user."""
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    users_db[user.username] = user
    return user

@app.put("/user/{username}", response_model=User)
def update_user(username: str, user: User):
    """Updates an existing user."""
    if username not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    users_db[username] = user
    return user

@app.delete("/user/{username}")
def delete_user(username: str):
    """Deletes an existing user."""
    if username not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    del users_db[username]
    return {"message": "User deleted successfully"}

@app.post("/settings/", response_model=Settings)
def create_setting(setting: Settings):
    """Creates a new setting."""
    if setting.setting_id in settings_db:
        raise HTTPException(status_code=400, detail="Setting already exists")
    settings_db[setting.setting_id] = setting
    return setting

@app.put("/settings/{setting_id}", response_model=Settings)
def update_setting(setting_id: str, setting: Settings):
    """Updates an existing setting."""
    if setting_id not in settings_db:
        raise HTTPException(status_code=404, detail="Setting not found")
    settings_db[setting_id] = setting
    return setting

@app.delete("/settings/{setting_id}")
def delete_setting(setting_id: str):
    """Deletes an existing setting."""
    if setting_id not in settings_db:
        raise HTTPException(status_code=404, detail="Setting not found")
    del settings_db[setting_id]
    return {"message": "Setting deleted successfully"}
```

This code creates a FastAPI application with endpoints for creating, updating, and deleting users and settings. The users and settings are stored in memory (not persistent). For a production application, you would want to use a real database. 

This code also includes error handling for cases where a user or setting already exists or does not exist. The Pydantic models are used for data validation and serialization/deserialization.

In a real application, you would also want to include authentication and authorization to ensure that only authorized users can manage users and settings. You might also want to encrypt the user passwords, rather than storing them in plain text. 

Finally, this code includes basic docstrings for each function, but for a real application, you would also want to include OpenAPI documentation.