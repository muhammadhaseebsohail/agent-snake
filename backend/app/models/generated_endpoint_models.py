From the provided code, we already have our Pydantic models for user creation and reading. Here is how they look:

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

Given that we have a `/items/{item_id}` endpoint in our FastAPI application, we need to create Pydantic models for item creation and reading. Let's assume an item has `id`, `title`, `description`, and `owner_id` as attributes.

First, let's define the SQLAlchemy model for an item:

```python
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
```

Next, we will define the Pydantic models:

```python
from pydantic import BaseModel

class ItemBase(BaseModel):
    title: str
    description: str

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True
```

Here, we are not including `owner_id` in `ItemCreate` because it will be automatically populated when creating an item, based on the current user.

We will also need a Pydantic model for handling JWT token data:

```python
from typing import Optional
from pydantic import BaseModel

class TokenData(BaseModel):
    username: Optional[str] = None
```

This model will be used in the `get_current_user_role` function to hold the decoded JWT token data.

Note: In this case, we are assuming that the item is owned by a user (owner_id), but this could vary depending on the relationship between the user and the item in your specific application.