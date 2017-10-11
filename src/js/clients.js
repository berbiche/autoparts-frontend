Application.execute_fn_for_page(() => {
    const generate_table = (accumulator, client) =>
        `${accumulator}
        <tr id="${client._id}">
            <td>${client.name}</td>
            <td>${client.address_street}</td>
            <td>${client.address_city}</td>
            <td>${client.address_province}</td>
            <td>${client.address_postal_code}</td>
        </tr>`;

    Application.generic_index('clients', generate_table);
}, () => {
    Application.generic_create('clients');
}, () => {
    Application.generic_detail('clients', [
        { id: 'name', api: 'name' },
        { id: 'address_street', api: 'address_street' },
        { id: 'address_city', api: 'address_city' },
        { id: 'address_province', api: 'address_province' },
        { id: 'address_postal_code', api: 'address_postal_code' },
    ]);
});
