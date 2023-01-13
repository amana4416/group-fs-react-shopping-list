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