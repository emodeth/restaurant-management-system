from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# User
class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        from_attributes = True


# Category
class CategoryBase(BaseModel):
    category_name: str


class Category(CategoryBase):
    id: int
    

    class Config:
        from_attributes = True

# Product
class ProductBase(BaseModel):
    name: str
    description: str | None = None
    price: float
    category_id: int

class ProductCreate(ProductBase):
    pass

class ProductPost(ProductBase):
    id:int
    quantity:int
    

class Product(ProductBase):
    id: int
    category: CategoryBase | None

    class Config:
        from_attributes = True

# Order
class OrderBase(BaseModel):
    user_id: Optional[int] = None  # Foreign key referencing the user who placed the order
    tableId: int

class OrderCreate(OrderBase):
    username: str
    order : list[ProductPost]


class Order(OrderBase):
    id: int
    time_created: datetime
    user: Optional[User] = None  # Optional nested User schema

    class Config:
        from_attributes = True

# OrderProduct
class OrderProductBase(BaseModel):
    order_id: int
    product_id: int
    quantity: int

class OrderProductCreate(OrderProductBase):
    pass  

class OrderProduct(OrderProductBase):
    class Config:
        from_attributes = True
        