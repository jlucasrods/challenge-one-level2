from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from app.config.env import DB_URL

ModelBase = declarative_base()

engine = create_engine(DB_URL)

session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

db_session = session()


def get_db():
    return db_session
