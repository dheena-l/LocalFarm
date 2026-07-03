from app.database import SessionLocal
from app.models import Product

PRODUCTS = [
    {
        "name": "Fresh Cow Milk",
        "price": 60,
        "category": "Dairy",
        "description": "Pure natural cow milk with no added water. Rich in calcium and protein.",
        "location": "Paramankeni",
        "image": "uploads/milk.png",
    },
    {
        "name": "Country Eggs",
        "price": 12,
        "category": "Poultry",
        "description": "Fresh country chicken eggs collected daily from free-range hens.",
        "location": "Paramankeni",
        "image": "uploads/egg.jpeg",
    },
    {
        "name": "Organic Cow Manure",
        "price": 250,
        "category": "Fertilizer",
        "description": "Natural cow manure suitable for organic farming and home gardens.",
        "location": "Paramankeni",
        "image": "uploads/cow-manure.jpg",
    },
    {
        "name": "Goat Manure",
        "price": 300,
        "category": "Fertilizer",
        "description": "High-quality goat manure that improves soil fertility and crop growth.",
        "location": "Paramankeni",
        "image": "uploads/goat-manure.jpg",
    },
    {
        "name": "Paddy",
        "price": 45,
        "category": "Grains",
        "description": "Freshly harvested paddy with excellent grain quality from local farms.",
        "location": "Paramankeni",
        "image": "uploads/paddy.jpg",
    },
    {
        "name": "Tender Coconuts",
        "price": 40,
        "category": "Fruits",
        "description": "Naturally grown tender coconuts filled with refreshing coconut water.",
        "location": "Paramankeni",
        "image": "uploads/coconut.jfif",
    },
    {
        "name": "Country Chicken",
        "price": 450,
        "category": "Poultry",
        "description": "Healthy free-range country chicken raised without harmful chemicals.",
        "location": "Paramankeni",
        "image": "uploads/chicken.avif",
    },
    {
        "name": "Fresh Bananas",
        "price": 55,
        "category": "Fruits",
        "description": "Naturally ripened bananas harvested directly from local farms.",
        "location": "Paramankeni",
        "image": "uploads/banana.jfif",
    },
    {
        "name": "Groundnuts",
        "price": 110,
        "category": "Crops",
        "description": "Premium-quality groundnuts rich in nutrients and natural flavor.",
        "location": "Paramankeni",
        "image": "uploads/groundnut.jfif",
    },
    {
        "name": "Fresh Vegetables",
        "price": 80,
        "category": "Vegetables",
        "description": "Seasonal farm-fresh vegetables grown using natural farming methods.",
        "location": "Paramankeni",
        "image": "uploads/vegetables.jpg",
    },
]


def seed_products():
    db = SessionLocal()
    try:
        for item in PRODUCTS:
            exists = db.query(Product).filter(Product.name == item["name"]).first()
            if not exists:
                product = Product(**item)
                db.add(product)
        db.commit()
        print("Seeded products successfully")
    finally:
        db.close()


if __name__ == "__main__":
    seed_products()
