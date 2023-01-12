-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

CREATE TABLE "ShoppingList"(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(200) NOT NULL,
    "quanity" DECIMAL (2,2),
    "unit" VARCHAR(50), 
    "is_purchased" BOOLEAN DEFAULT FALSE    
)

INSERT INTO "ShoppingList" ("name", "quantity", "unit")
VALUES
('Bread', '2', 'loaves');