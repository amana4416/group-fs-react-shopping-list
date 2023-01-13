function ShoppingList({shoppingList}) {
    return (
        <>
            <table>
                <thead>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                </thead>
                <tbody>
                    {shoppingList.map(item => (
                        <tr key={item.id}>
                            <td>{item.item}</td>
                            <td>{item.quantity}</td>
                            <td>{item.unit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ShoppingList; 
