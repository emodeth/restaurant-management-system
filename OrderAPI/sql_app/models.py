from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Float
from sqlalchemy.orm import relationship
from .database import Base
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True)  
    hashed_password = Column(String)



class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True)
    category_name = Column(String, unique=True)
    products = relationship("Product", back_populates="categories")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True)
    description = Column(String)
    price = Column(Float)
    category_id = Column(Integer, ForeignKey("categories.id")) 
    categories = relationship("Category", back_populates="products")  


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id")) 
    table_id = Column(Integer)
    time_created = Column(DateTime)
    user = relationship("User", backref="orders")  # hata olabilir


class OrderProduct(Base):
    __tablename__ = "order_products"

    order_id = Column(Integer, ForeignKey("orders.id"), primary_key=True)
    product_id = Column(Integer, ForeignKey("products.id"), primary_key=True)
    quantity = Column(Integer, nullable=False)  

