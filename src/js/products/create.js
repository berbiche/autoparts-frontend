/* eslint no-undef: */
(() => {
    const API_PRODUCTS = new Api('products');
    const form = $('create-form');


    $('retour').addEventListener('click', () => { window.history.go(-1); });
    $('ajouter').addEventListener('click', () => {
        API_PRODUCTS
            .create(form_data_to_json(new FormData(form)))
            .catch(async (res) => {
                throw await res.json();
            })
            .catch((err) => {
                alert(JSON.stringify(err.errors) || err.message);
            });
    });
})();
