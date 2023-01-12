-- Don't forget to add your create table SQL 
-- It is also helpful to include some test data

-- create table
CREATE TABLE "ShoppingList" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(80) NOT NULL,
	"quantity" DECIMAL (2,2),
	"unity" VARCHAR(20) NOT NULL,
	"is_purchased" BOOLEAN DEFAULT FALSE
);	

-- dummy data
INSERT INTO "ShoppingList" 
	( "name", "quantity", "unit")
	VALUES
	('bread', 2, 'loaves');

-- get route
SELECT * FROM "ShoppingList"   
    ORDER BY "id";