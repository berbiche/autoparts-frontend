import { $, $$, API_PRODUCTS } from './common';


// const form = $('create-form');
const form = document.getElementsByTagName('form')[0];


$('retour').addEventListener('click', () => history.go(-1));
$('ajouter').addEventListener('click', () => {
    API_PRODUCTS
        .create(new FormData(form))
        .then(res => res.text())
        .then((data) => {
            console.log(data);
        });
});
