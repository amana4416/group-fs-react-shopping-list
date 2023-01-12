const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');


router.get('/', (req, res) => {
    const sqlText = `
        SELECT * FROM "ShoppingList"   
            ORDER BY "id";
    `;
    pool.query(sqlText)
        .then((result) => {
            console.log('sending shopping list to the client!');
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`error in server get route ${sqlText}`, error);
            res.sendStatus(500);
        })
})

router.post('/', (req, res) => {
    const item = req.body;
    const sqlText = `
        INSERT INTO "ShoppingList" ("name", "quantity", "unit")
            VALUES ($1, $2, $3);
    `;
    const sqlParams = [item.name, item.quantity, item.unit];
    pool.query(sqlText, sqlParams)
        .then((result) => {
            console.log(`Added an item to the shopping list!`);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`error in server post route ${sqlText}`, error);
            res.sendStatus(500);
        })
})