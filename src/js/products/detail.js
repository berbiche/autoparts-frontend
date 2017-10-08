import { $, $$, API_PRODUCTS } from './common';


class Product {
    constructor(id, API_PRODUCTS) {
        this.id = id;
        this.API_PRODUCTS = API_PRODUCTS;
    }
    
    getId() {
        return this.id;
    }
    
    supprimer() {
        // return API_PRODUCTS.delete()
    }
}

 // l'élément contenant les boutons
const bouton_container = $('button-container');
const modifier = $('modifier');
const supprimer = $('supprimer');
// bouton qui sera affiché pour sauvegarder les modifications
const sauvegarder = document.createElement('button');
// bouton qui sera affiché pour annuler les modifications
const annuler = document.createElement('button');
// le produit
const product = new Product(window.location.search);


(() => {
    // configuration des boutons
    const configurer_boutons = (bouton, couleur) => {
        bouton.attributes.setNamedItem('type', 'button');
        bouton.classList.add('button', couleur, 'is-outlined');
    };
    configurer_boutons(sauvegarder, 'is-success');
    configurer_boutons(annuler, 'is-danger');
    
    // configuration des eventListeners
    modifier.addEventListener('click', product.modifier);
    supprimer.addEventListener('click', product.supprimer);
    sauvegarder.addEventListener('click', product.sauvegarder);
    annuler.addEventListener('click', annuler);
})();

function modifier() {
    
}

function supprimer() {
    
}

function sauvegarder() {
    
}

function annuler() {
    if (confirm('Voulez-vous vraiment annuler les modifications?')) {
        window.location.reload();
    }
}
