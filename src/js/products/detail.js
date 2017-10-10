/* eslint no-use-before-define: */
/* eslint no-restricted-syntax: */
/* eslint no-alert: */
/* eslint no-confirm: */
/* eslint no-undef: */
(() => {
    const API_PRODUCTS = new Api('products');
    const product_id = document.location.search.match(/id=(.*)/)[1];

    // #region Constantes de l'application
    const btn_modifier = $('modifier');
    const btn_supprimer = $('supprimer');
    // bouton qui sera affiché pour sauvegarder les modifications
    const btn_sauvegarder = $('sauvegarder');
    // bouton qui sera affiché pour annuler les modifications
    const btn_annuler = $('annuler');

    // la form
    const form = $('edit-form');
    // et ses inputs
    const form_inputs = {
        code: $('code'),
        name: $('name'),
        description: $('description'),
        price: $('price'),
        quantity: $('quantity'),
    };
    // #endregion

    // le produit
    API_PRODUCTS
        .get(product_id)
        .catch((err) => {
            window.alert(err.statusText);
            window.location.pathname = 'products/index.html';
        })
        .then(res => res.json())
        .then((data) => {
            form_inputs.code.value = data.code;
            form_inputs.name.value = data.name;
            form_inputs.description.value = data.description;
            form_inputs.price.value = data.price;
            form_inputs.quantity.value = data.price;

            for (const element of Object.values(form_inputs)) {
                element.attributes.setNamedItem(document.createAttribute('readonly'));
            }

            // afficher l'élément maintenant que le contenu de la page est chargé
            $$('section.hidden')[0].classList.remove('hidden');
        });

    function modifier(array_of_elements) {
        return () => {
            // enlever la propriété
            for (const element of Object.values(array_of_elements)) {
                element.attributes.removeNamedItem('readonly');
            }
            // afficher les bons boutons
            btn_modifier.classList.toggle('hidden');
            btn_sauvegarder.classList.toggle('hidden');
            btn_annuler.classList.toggle('hidden');
        };
    }

    function supprimer() {
        if (window.confirm('Voulez-vous vraiment supprimer cet élément?')) {
            API_PRODUCTS
                .delete(product_id)
                .catch((err) => { window.alert(err.statusText); })
                .then(() => {
                    // aucune erreur, navigation à l'index
                    window.location.pathname = 'products/index.html';
                });
        }
    }

    function sauvegarder() {
        API_PRODUCTS
            .edit(product_id, form_data_to_json(new FormData(form)))
            .catch(async (err) => { throw await err.json(); })
            .catch((err) => {
                if (err.status >= 400) {
                    window.alert(err.statusText);
                } else {
                    window.location.reload();
                }
            });
    }

    function annuler() {
        if (window.confirm('Voulez-vous vraiment annuler les modifications?')) {
            window.location.reload();
        }
    }

    // configuration des eventListeners
    btn_modifier.addEventListener('click', modifier(form_inputs));
    btn_supprimer.addEventListener('click', supprimer);
    btn_sauvegarder.addEventListener('click', sauvegarder);
    btn_annuler.addEventListener('click', annuler);
})();
