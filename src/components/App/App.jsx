import React from 'react';
import { useState, useEffet } from 'react';
import Header from '../Header/Header.jsx';
import axios from 'axios';
import './App.css';
import ShoppingListForm from '../ShoppingForm/ShoppingForm.js';

function App() {
    const [shoppingList, setShoppingList] = useState([]);

    //On load, get ShoppingList
    useEffect(() => {
        getShoppingList();
    }, []);

    const getShoppingList = () => {
        axios
            .get('/items')
            .then((response) => {
                setShoppingList(response.data);
            })
            .catch((error) => {
                alert('error getting shopping list');
                console.log(error);
            });
    };

    return (
        <div className="App">
            <Header />
            <main>
                <ShoppingListForm getShoppingList={getShoppingList} />
                <p>Under Construction...</p>
            </main>
        </div>
    );
}

export default App;
