import axios from 'axios';

function ShoppingList({ shoppingList, getShoppingList }) {


    const buyItemButton = (id) => {

        axios({
            method: 'PUT',
            url: `/items/${id}`,
            data: {
                is_purchased: true,
            },
        }).then((response) => {
            getShoppingList();

        }).catch((error) => {
            console.log('unable to BUY item', error)
        })
    }

    const resetButton = () => {
        axios({
            method: 'PUT', 
            url: '/items',
            data: {
                is_purchased: false
            },
        }).then((response) => {
            getShoppingList();
        }).catch((error) => {
            console.log('unable to RESET items', error)
    
    //delete request deleting a single item
    const removeItem = (id) => {
        axios.delete(`/items/${id}`)
        .then(response => {
            console.log('deleting an item from the shopping list');
            getShoppingList();
        })
        .catch(error => {
            console.log('error in client delete route - just deleting one item', error);
            alert('error deleting just one item');
        })
    }
    
    //delete request clearing the whole list
    const clearList = () => {
        axios.delete(`/items`)
        .then(response => {
            console.log('clearing the whole shopping list');
            getShoppingList();
        })
        .catch(error => {
            console.log('error in client delete route - clearing the whole list', error);
            alert('error error clearing the list');

        })
    }

    return (
        <>

        <button onClick={clearList}>Clear</button>
        <button onClick={resetButton}>Reset</button>
            <table>
                <thead>
                    <tr>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Unit</th>
                    </tr>
                </thead>
                <tbody>
                    {shoppingList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.unit}</td>
                            <td>
                                <button onClick={()=>buyItemButton(item.id)}>Buy</button>
                            </td>
                             <td>
                                <button onClick={()=>removeItem(item.id)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ShoppingList;