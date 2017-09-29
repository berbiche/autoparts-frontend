(function init_product() {
    'use strict';

    const url = `http://localhost:3033/products`;
    const generate_cell_row = (accumulator, product) =>
        `${accumulator}
        <tr>
            <td>${product.code}</td>
            <td>${product.name}</td>
            <td>${product.inventoryActual}</td>
            <td>${product.price}</td>
            <td>${product.description || 'N/A'}</td>
        </tr>`;

    $.getJSON(url)
        .then(({ data }) => {
            const tableContent = data.reduce(generate_cell_row, '');

            $('#products')
                .html(tableContent)
                .parent()
                .removeClass('hidden');
        });
}());
