from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from app.database import Base


class Contact(Base):

    __tablename__ = "contacts"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    message = Column(Text)


class Enquiry(Base):

    __tablename__ = "enquiries"

    id = Column(Integer, primary_key=True)
    product_id = Column(Integer)
    name = Column(String)
    phone = Column(String)
    message = Column(Text)


class Product(Base):

    __tablename__ = "products"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Integer, nullable=False)
    category = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    location = Column(String, nullable=False)
    image = Column(String, nullable=True)