import {
    ProductsCreate,
    ProductsDelete,
    ProductsEdit,
    ProductsIndex,
} from './products/routes';


export
const ROUTES = [
    ['/', {
        title: 'Index',
        view: new View('index.html')
    }],
    ['/404', {
        title: '404 - Not Found',
        view: new View('404.html'),
    }],
    ['/products', {
        title: 'Catalogue des produits',
        view: new ProductsIndex('products/index.html', API_PRODUCTS)
    }],
    ['/products/add', {
        title: 'Products - Add',
        view: new ProductsCreate('products/add.html', API_PRODUCTS),
    }],
    ['/products/delete', {
        title: 'Products - Delete',
        view: new View('products/delete.html', API_PRODUCTS),
    }],
    ['/products/edit', {
        title: 'Products - Edit',
        view: new View('products/edit.html', API_PRODUCTS),
    }],
    ['/clients', {
        title: 'Catalogue des clients',
        view: new View('clients/index.html', API_CLIENTS),
    }],
    ['/clients/add', {
        title: 'Clients - Add',
        view: new View('clients/delete.html', API_CLIENTS),
    }],
    ['/clients/delete', {
        title: 'Clients - Delete',
        view: new View('clients/delete.html', API_CLIENTS),
    }],
    ['/clients/edit', {
        title: 'Clients - Edit',
        view: new View('clients/edit.html', API_CLIENTS),
    }],
];
