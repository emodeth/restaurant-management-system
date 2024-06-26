from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins =[
    "http://localhost",
    "http://localhost:5173", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Login(BaseModel):
    name:str
    password:str


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/products/")#response_model=list[schemas.Product]
async def get_product(db: Session = Depends(get_db)):
    return crud.get_products(db=db)

@app.get("/orders/{table_id}")
async def read_item(table_id,db:Session= Depends(get_db)):
    return crud.get_orderdetail(table_id=table_id,db=db)

@app.post("/orders/")
async def create_order(createorder:schemas.OrderCreate,db:Session= Depends(get_db)):
    return crud.create_orderinfo(ordercreate=createorder,db=db)

@app.post("/login/")
async def check_login(user_info:Login ,db:Session = Depends(get_db),status_code=201):
    user = crud.get_user_by_username(username=user_info.name, db=db)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )
    if user.hashed_password!=user_info.password:
        raise HTTPException(
            status_code=401,
            detail="Unauthorized",
        )
    return {"user":user}
        
