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

//PUT Route for Buy Button
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let is_purchased = req.body.is_purchased;

    let sqlQuery = `
        UPDATE "ShoppingList"
        SET "is_purchased"=$1
        WHERE "id"=$2;
    `

    let sqlValues = [is_purchased, id];

    pool.query(sqlQuery, sqlValues)
        .then((res) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            res.sendStatus(500);
            console.log('something broke in PUT/items/:id Buy Button', error)
        })
})//end PUT Route for Buy Button


//PUT Route for Reset Button
router.put('/', (req, res) => {
    //let is_purchased = req.body.is_purchased;d

    let sqlQuery = `
        UPDATE "ShoppingList"
        SET "is_purchased"=$1;
    `;

    let sqlValues = [req.body.is_purchased];

    pool.query(sqlQuery, sqlValues)
        .then((response) => {
            res.sendStatus(200)
        })
        .catch((error) => {
            res.sendStatus(500);
            console.log('something broke in PUT/items/is_purchased Reset Button', error)
        })
})//end PUT Route for Reset Button


module.exports = router;