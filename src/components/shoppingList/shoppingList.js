function ShoppingList({ShoppingListForm}) {
    return (
        <form>
            <table>
                <thead>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{newItem}</td>
                        <td>{newQuantity}</td>
                        <td>{newUnit}</td>
                    </tr>
                </tbody>
            </table>
        </form>
    );
}

export default ShoppingList; 
