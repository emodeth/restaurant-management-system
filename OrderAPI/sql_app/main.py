from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/products/",response_model=schemas.Product)
def create_product(product:schemas.ProductCreate,db: Session = Depends(get_db)):
    return crud.create_product(product=product, db=db)

@app.get("/products/",response_model=list[schemas.Product])
def get_product(db: Session = Depends(get_db)):
    return crud.get_products(db=db)

@app.get("/orders/")
def get_orders(db:Session= Depends(get_db)):
    return crud.get_orderdetail(db=db)

@app.post("/login/")
def check_login(username:str, password:str, db:Session = Depends(get_db),status_code=201):
    user = crud.get_user_by_username(username=username)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )
    if user.hashed_password!=password:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized",
        )
    return {"user":user}
        