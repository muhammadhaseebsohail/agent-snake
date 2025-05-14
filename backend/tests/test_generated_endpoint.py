You can expand the test suite for the `read_item` endpoint as follows:

```python
from fastapi.testclient import TestClient
from main import app
from models import User
from sqlalchemy.orm import Session
import jwt

# This would be a test user stored in your database
test_user = User(id=1, username="test", hashed_password="test", is_active=True, role="admin")

def test_read_item():
    # Test 401 Unauthorized error
    with TestClient(app) as client:
        response = client.get("/items/1")
        assert response.status_code == 401
        assert response.json() == {"detail": "Not enough permissions"}

    # Test successful request
    token_data = {"sub": test_user.username}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    headers = {"Authorization": f"Bearer {token}"}
    with TestClient(app) as client:
        response = client.get("/items/1", headers=headers)
        assert response.status_code == 200
        # assert other things about the response

def test_read_item_invalid_item_id():
    # Test with an item_id that doesn't exist in the database
    token_data = {"sub": test_user.username}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    headers = {"Authorization": f"Bearer {token}"}
    with TestClient(app) as client:
        response = client.get("/items/999", headers=headers)
        assert response.status_code == 404
        assert response.json() == {"detail": "Item not found"}

def test_read_item_inactive_user():
    # Test with a user that is not active
    inactive_user = User(id=2, username="inactive", hashed_password="test", is_active=False, role="admin")
    token_data = {"sub": inactive_user.username}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    headers = {"Authorization": f"Bearer {token}"}
    with TestClient(app) as client:
        response = client.get("/items/1", headers=headers)
        assert response.status_code == 401
        assert response.json() == {"detail": "Inactive user"}

def test_read_item_non_admin_role():
    # Test with a user that is not an admin
    non_admin_user = User(id=3, username="nonadmin", hashed_password="test", is_active=True, role="user")
    token_data = {"sub": non_admin_user.username}
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    headers = {"Authorization": f"Bearer {token}"}
    with TestClient(app) as client:
        response = client.get("/items/1", headers=headers)
        assert response.status_code == 401
        assert response.json() == {"detail": "Not enough permissions"}
```

This test suite covers the following cases:
- Unauthorized request
- Successful request
- Request with an item_id that doesn't exist in the database
- Request from a user that is not active
- Request from a user that is not an admin