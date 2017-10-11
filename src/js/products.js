Application.execute_fn_for_page(() => {
    const generate_table = (accumulator, product) =>
        `${accumulator}
        <tr id="${product._id}">
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.inventoryActual}</td>
            <td>${product.price}</td>
            <td>${product.description}</td>
            <td>${product.supplier}</td>
        </tr>`;

    Application.generic_index('products', generate_table);
}, () => {
    Application.generic_create('products');
}, () => {
    Application.generic_detail('products', [
        { id: 'code', api: 'code' },
        { id: 'name', api: 'name' },
        { id: 'description', api: 'description' },
        { id: 'price', api: 'price' },
        { id: 'quantity', api: 'inventoryActual' },
        { id: 'supplier', api: 'supplier' },
    ]);
});
