import React, { useEffect } from 'react';
import { useState, useEffet } from 'react';
import Header from '../Header/Header.jsx'
import './App.css';


function App() {

    const [shoppingList, setShoppingList] = useState([])


//On load, get ShoppingList
    useEffect(() => {
        getShoppingList()
    }, [])

    const getShoppingList = () => {
        axios.get('/ShoppingList')
         .then(response => {
            setShoppingList(response.data)
         })
         .catch(error => {
            alert('error getting shopping list');
            console.log(error);
         })
    }



    return (
        <div className="App">
            <Header />
            <main>
                <p>Under Construction...</p>
            </main>
        </div>
    );
}

export default App;
