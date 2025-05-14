First, we will create a user model where we will store information about the user's roles. 

```python
from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    role = Column(String)

```

Next, we will create Pydantic models for user creation and reading.

```python
from pydantic import BaseModel

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str
    role: str

class User(UserBase):
    id: int
    is_active: bool
    role: str

    class Config:
        orm_mode = True
```

Then, we create a dependency that ensures only certain roles can access certain routes:

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session

# You would have your own SECRET_KEY and ALGORITHM for JWT token
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_current_user_role(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user.role
```

We will use this dependency in our route:

```python
from fastapi import FastAPI, Depends, HTTPException, status
from . import schemas, models
from .database import SessionLocal, engine
from sqlalchemy.orm import Session

app = FastAPI()

models.Base.metadata.create_all(engine)

@app.get("/items/{item_id}", response_model=schemas.Item)
def read_item(item_id: int, current_user_role: str = Depends(get_current_user_role)):
    if current_user_role != "admin":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not enough permissions",
        )
    # your code to get the item
```

For unit tests:

```python
from fastapi.testclient import TestClient

def test_read_item():
    with TestClient(app) as client:
        response = client.get("/items/1")
        assert response.status_code == 401
        assert response.json() == {"detail": "Not enough permissions"}
```

This route will only be accessible by users with the role of 'admin'. A JWT token containing the username is expected to be included in the Authorization header of the request. The token is decoded and the username is used to fetch the user's role from the database. The role is then checked, and if it's not 'admin', an HTTP 401 Unauthorized error is returned.