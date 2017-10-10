import { $, $$ } from '../utils';
import { Api } from '../api';


const API_PRODUCTS = new Api('products');
const generate_cell_row = (accumulator, product) =>
`${accumulator}
<tr>
    <td>${product.code}</td>
    <td>${product.name}</td>
    <td>${product.inventoryActual}</td>
    <td>${product.price}</td>
    <td>${product.description || 'N/A'}</td>
</tr>`;

API_PRODUCTS
    .get()
    .then(res => res.text())
    .then(({ data }) => {
        // generate the table
        const tableContent = data.reduce(generate_cell_row, '');

        const products = $('products');
        // append to the DOM the generated table.
        products.innerHTML = tableContent;
        // unhide the content from the page
        products.parentElement.classList.remove('hidden');
    });
