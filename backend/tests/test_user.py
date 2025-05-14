Here are the unit tests using pytest and FastAPI TestClient for the given endpoints:

```python
from fastapi.testclient import TestClient
import pytest
from main import app, User, Settings

client = TestClient(app)

def test_create_user():
    """Test creating a new user."""
    response = client.post("/user/", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password",
        "is_admin": False
    })
    assert response.status_code == 200
    assert response.json() == {
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password",
        "is_admin": False
    }

def test_create_user_existing_username():
    """Test creating a user with an existing username."""
    client.post("/user/", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password",
        "is_admin": False
    })
    response = client.post("/user/", json={
        "username": "testuser",
        "email": "anotheruser@example.com",
        "password": "password",
        "is_admin": False
    })
    assert response.status_code == 400
    assert response.json() == {"detail": "Username already exists"}

def test_update_user():
    """Test updating an existing user."""
    client.post("/user/", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password",
        "is_admin": False
    })
    response = client.put("/user/testuser", json={
        "username": "testuser",
        "email": "updateduser@example.com",
        "password": "newpassword",
        "is_admin": True
    })
    assert response.status_code == 200
    assert response.json() == {
        "username": "testuser",
        "email": "updateduser@example.com",
        "password": "newpassword",
        "is_admin": True
    }

def test_update_user_not_found():
    """Test updating a user that does not exist."""
    response = client.put("/user/nonexistentuser", json={
        "username": "nonexistentuser",
        "email": "nonexistentuser@example.com",
        "password": "password",
        "is_admin": False
    })
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}

def test_delete_user():
    """Test deleting an existing user."""
    client.post("/user/", json={
        "username": "testuser",
        "email": "testuser@example.com",
        "password": "password",
        "is_admin": False
    })
    response = client.delete("/user/testuser")
    assert response.status_code == 200
    assert response.json() == {"message": "User deleted successfully"}

def test_delete_user_not_found():
    """Test deleting a user that does not exist."""
    response = client.delete("/user/nonexistentuser")
    assert response.status_code == 404
    assert response.json() == {"detail": "User not found"}

# Similar tests can be written for settings endpoints.
```

This set of tests covers all the API endpoints, checking both the success cases (where the request should succeed) and error cases (where the request should fail due to some error condition). It also checks that the correct HTTP status codes are returned in each case, and that the returned JSON matches the expected values.

Note that this is a basic set of tests, and in a real application, you would want to have more comprehensive tests, including edge cases, invalid data, etc.