const { response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');


router.get('/', (req, res) => {
    const sqlText = `
        SELECT * FROM "ShoppingList"   
            ORDER BY "id";
    `;
    pool.query(sqlText)
        .then((dbRes) => {
            console.log('sending shopping list to the client!');
            res.send(dbRes.rows);
        })
        .catch((dbError) => {
            console.log(`error in server get route ${sqlText}`, dbErr);
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
        .then((dbRes) => {
            console.log(`Added an item to the shopping list!`);
            res.sendStatus(201);
        })
        .catch((dbErr) => {
            console.log(`error in server post route ${sqlText}`, dbErr);
            res.sendStatus(500);
        })
})

//delete route for deleting a single item from list
router.delete('/:id', (req, res) => {
    let id = req.params.id
    let sqlValues = [id]
    const sqlText = `
        DELETE FROM "ShoppingList"
            WHERE "id"=$1;
    `;
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log('deleting an item from the database');
            res.sendStatus(201);
        })
        .catch ((dbErr) => {
            console.log('error in deleting an item', dbErr);
            res.sendStatus(500);
        })
})

//delete route for deleting all items from shopping list
//clear entire shopping list
router.delete('/', (req, res) => {
    const sqlText = `
        DELETE FROM "ShoppingList";
    `;
pool.query(sqlText)
    .then((dbRes) => {
        console.log('clearing the whole shopping list');
        res.sendStatus(201);
    })
    .catch ((dbErr) => {
        console.log('error in clearing the shopping list', dbErr);
        res.sendStatus(500);
    })
})


module.exports = router;