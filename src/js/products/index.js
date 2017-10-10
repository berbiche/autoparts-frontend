const API_PRODUCTS = new Api('products');
const generate_cell_row = (accumulator, product) =>
`${accumulator}
<tr id="${product._id}">
    <td>${product.code}</td>
    <td>${product.name}</td>
    <td>${product.inventoryActual}</td>
    <td>${product.price}</td>
    <td>${product.description || 'N/A'}</td>
</tr>`;

API_PRODUCTS
    .get()
    .then(res => res.json())
    .then(({ data }) => {
        // générer la table
        const tableContent = data.reduce(generate_cell_row, '');

        const products = $('products');
        // ajouter la table au DOM
        products.innerHTML = tableContent;
        // afficher le contenu sur la page
        products.parentElement.classList.remove('hidden');

        // ajouter l'événement pour ouvrir details/id
        products.addEventListener('click', (e) => {
            const { target: element } = e;

            if (!(element instanceof HTMLElement)
                || (element.tagName.toLowerCase() !== 'tr' && element.tagName.toLowerCase() !== 'td')
                || element.parentElement.tagName.toLowerCase() === 'thead') {
                return;
            }

            const id = element.tagName.toLowerCase() === 'td' ? element.parentElement.id : element.id;
            window.location = `${window.location.origin}/products/detail.html?id=${id}`;
        });
    });
