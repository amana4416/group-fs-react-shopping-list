import { useState } from 'react';
import axios from 'axios';

function ShoppingListForm({getShoppingList}) {
    let [newItem, setNewItem] = useState('');
    let [newQuantity, setNewQuantity] = useState('');
    let [newUnit, setNewUnit] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (newItem) {
            addShoopingList();
        } else {
            alert('Please add an item name');
        }
    };

    const addShoppinglist = () => {
        axios
            .post('/items', { item: newItem, quantity: newQuantity, unit: newUnit })
            .then((response) => {
                setNewItem('');
                setNewQuantity('');
                setNewUnit('')
                getShoppingList();
            })
            .catch((error) => {
                alert('error adding Guest', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Enter item name"
                value={newItem}
                onChange={(event) => setNewItem(event.target.value)}
            />
            <input
                type="number"
                placeholder="Enter the Amount"
                value={newQuantity}
                onChange={(event) => setNewQuantity(event.target.value)}
            />
            <input
                type="text"
                placeholder="Enter The Units"
                value={newUnit}
                onChange={(event) => setNewUnit(event.target.value)}
            />
        </form>
    );
}

export default ShoppingListForm;
