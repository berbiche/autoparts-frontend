Application.execute_fn_for_page(() => {
    const generate_table = (accumulator, supplier) =>
        `${accumulator}
        <tr id="${supplier._id}">
            <td>${supplier.name}</td>
            <td>${supplier.address_street}</td>
            <td>${supplier.address_city}</td>
            <td>${supplier.address_province}</td>
            <td>${supplier.address_postal_code}</td>
        </tr>`;

    Application.generic_index('suppliers', generate_table);
}, () => {
    Application.generic_create('suppliers');
}, () => {
    Application.generic_detail('suppliers', [
        { id: 'name', api: 'name' },
        { id: 'address_street', api: 'address_street' },
        { id: 'address_city', api: 'address_city' },
        { id: 'address_province', api: 'address_province' },
        { id: 'address_postal_code', api: 'address_postal_code' },
    ]);
});
