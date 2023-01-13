function ShoppingList({ shoppingList }) {
    return (
        <>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default ShoppingList;
