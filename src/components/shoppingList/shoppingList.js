
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
        })
    }

    return (
        <>
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
                    {shoppingList.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.unit}</td>
                            <td>
                                <button onClick={()=>buyItemButton(item.id)}>Buy</button>
                            </td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}











export default ShoppingList; 
