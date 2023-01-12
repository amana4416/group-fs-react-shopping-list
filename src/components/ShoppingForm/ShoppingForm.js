import {useState} from 'react';
import axios from 'axios'

function ShoppingListForm() {
    let [typeShoppingList, setInputList]= useState('');
    let [newShoppingList, setShoppinglist]= useState('false');

    const handleSubmit = (event)=> {
        event.preventDefault();
        if(typeShoppingList){
            addShoopingList();
        }else{
            alert('Please add an item name')
        }
    }
    
    const addShoppinglist = () =>{
        axios
            .post('/shoppingList', { name: quantity, unit})
            .then((response)=>{
                setNewGuestName('');

            })
    }

    return(

    );
}

export default ShoppingListForm;