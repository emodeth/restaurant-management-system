from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import join
from . import models, schemas

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_products(db: Session):
    return db.query(models.Product).all()

def get_orderdetail(db: Session, table_id: int):
    
    
    orders = db.query(models.OrderProduct,models.Order,models.Product, models.User) \
               .join(models.Order, models.Order.id == models.OrderProduct.order_id) \
               .join(models.Product, models.Product.id==models.OrderProduct.product_id) \
               .join(models.User, models.User.id == models.Order.user_id) \
               .filter(models.Order.table_id == table_id) \
               .all()
    
    processed_orders = []
    for order_product, order, product, user in orders:
        processed_orders.append({
            "order_id": order.id,
            "product_name": product.name,
            "quantity": order_product.quantity,
            "time_created": order.time_created,
            "user_name": user.username,
    })
    if processed_orders:
        return processed_orders
    else:
        return None

def get_user_by_username(db: Session, username: str):
    user =  db.query(models.User).filter(models.User.username == username).first()
    if user:
        return user
    return None
    
# create operations
def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, hashed_password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_category(db: Session, category: schemas.CategoryBase):
    db_category = models.Category(category_name = category.category_name)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category

def create_product(db: Session, product: schemas.ProductCreate):
    db_prdct = models.Product(name=product.name, description=product.description, price=product.price, category_id=product.category_id)
    db.add(db_prdct)
    db.commit()
    db.refresh(db_prdct)
    return db_prdct

def create_orderproduct(db: Session, orderprdct: schemas.OrderProductCreate): 
    db_orderprdct = models.OrderProduct(order_id=orderprdct.order_id, product_id=orderprdct.product_id,quantity=orderprdct.quantity)
    db.add(db_orderprdct)
    db.commit()
    db.refresh(db_orderprdct)

def create_orderinfo(db: Session, ordercreate: schemas.OrderCreate):
    user = db.query(models.User).filter(models.User.username == ordercreate.username).first()

    user_id = user.id

    db_order = models.Order(user_id=user_id,table_id=ordercreate.tableId, time_created=datetime.now()) # time created patlayabilir
    db.add(db_order)
    
    db.commit()
    db.refresh(db_order)

    order_products = []
    for product in ordercreate.order:
        order_products.append(models.OrderProduct(order_id=db_order.id, product_id=product.id, quantity=product.quantity))
    db.add_all(order_products)
    db.commit()
    db.refresh(db_order)

    return db_order
