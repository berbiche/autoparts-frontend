(function init_product() {
    const url = `http://localhost:3033`;
    $.getJSON(url)
        .then(({ data }) => {
            const cellsContent = data
                .map(x => x.data)
                .reduce((accumulator, product) =>
                    `${accumulator}
                    <tr>
                        <td>${product.code}</td>
                        <td>${product.name}</td>
                        <td>${product.inventoryActual}</td>
                        <td>${product.price}</td>
                        <td>${product.description}</td>
                    </tr>`
                    , '');

            $('#products').html(cellsContent);
        });
}());
