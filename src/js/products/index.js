import Api from '../api';
import { $, $$ } from '../utils';


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

window.addEventListener('domcontentloaded', () => {
    API_PRODUCTS.get().then(({ data }) => {
        const tableContent = data.reduce(generate_cell_row, '');

        const products = $('products');
            // .html(tableContent)
            // .parent()
            // .removeClass('hidden');
    });
});
