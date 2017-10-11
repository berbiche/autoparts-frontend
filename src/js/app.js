(function start_app() {
    // bind des événements générales
    {
        const retour = $('retour');
        if (retour) {
            retour.addEventListener('click', () => window.history.back());
        }
        const annuler = $('annuler');
        if (annuler) {
            annuler.addEventListener('click', () => window.location.reload());
        }
    }

    /**
     * Retourne une nouvelle instance de la classe API
     * @private
     * @param {string} api_url
     * @return {Api}
     */
    function create_api(api_url) {
        return new Api(api_url);
    }

    /**
     * Affiche une alerte par rapport à une erreur
     * @private
     * @param {Object|string} err
     */
    function alert(err) {
        if (typeof err === 'object') {
            if (err.errors && Object.keys(err.errors).length > 0) {
                window.alert(JSON.stringify(err.errors));
            } else {
                window.alert(err.message);
            }
        } else if (typeof err === 'string') {
            window.alert(err);
        }
    }

    /**
     * Exécute une des fonctions passée en paramètre selon la page du site
     *
     * @typedef {function(): void} void_fn
     * @param {void_fn} fn_index - La fonction pour la page index
     * @param {void_fn} fn_create - La fonction pour la page create
     * @param {void_fn} fn_detail - La fonction pour la page detail
     */
    function execute_fn_for_page(fn_index, fn_create, fn_detail) {
        switch (window.location.pathname.split('/')[2].replace('.html', '')) {
            case 'create':
                fn_create();
                break;
            case 'detail':
                fn_detail();
                break;
            default:
                fn_index();
                break;
        }
    }

    /**
     * Construit la page index
     * @param {string} api_url - API endpoint a utilisé
     * @param {(accumulator: string, model_element: string) => string} template_fn
     * La fonction pour produire le template
     */
    function generic_index(api_url, template_fn) {
        const API = create_api(api_url);

        API
            .get()
            .then(res => res.json())
            .then(({ data }) => {
                // générer la table
                const tableContent = data.reduce(template_fn, '');

                const table_of_model = $('table-index');
                // ajouter la table au DOM
                table_of_model.innerHTML = tableContent;
                // afficher le contenu sur la page
                table_of_model.parentElement.classList.remove('hidden');

                // ajouter l'événement pour ouvrir details/id
                table_of_model.addEventListener('click', (e) => {
                    const { target: element } = e;

                    // si ce n'est pas un HTMLElement, ni un tr, ni un td sinon pas enfant de thead
                    // retourner car on s'en calisse
                    if (!(element instanceof HTMLElement)
                        || (element.tagName.toLowerCase() !== 'tr'
                            && element.tagName.toLowerCase() !== 'td')
                        || element.parentElement.tagName.toLowerCase() === 'thead') {
                        return;
                    }

                    const id = element.tagName.toLowerCase() === 'td'
                        ? element.parentElement.id
                        : element.id;
                    window.location = `${window.location.origin}/${api_url}/detail.html?id=${id}`;
                });
            });
    }

    /**
     * Construit la page create
     * @param {string} api_url - API endpoint a utilisé
     */
    function generic_create(api_url) {
        const API = create_api(api_url);
        const form = $('create-form');

        $('ajouter').addEventListener('click', () => {
            API
                .create(form_data_to_json(new FormData(form)))
                .catch(async (res) => { throw await res.json(); })
                .catch((err) => {
                    alert(err);
                    throw new Error('sinon le .then est exécuté, merci pour cet api tc39');
                })
                .then(() => {
                    const loc = window.location;
                    loc.pathname = `${loc.pathname.split('/')[1]}/index.html`;
                });
        });
    }

    /**
     * Construit la page detail
     * @param {string} api_url - API endpoint a utilisé
     * @param {{id: string, api: string}[]} inputs
     * - Object contenant le mapping des ids des inputs de la page
     * vers le code équivalent de l'api
     */
    function generic_detail(api_url, inputs) {
        const API = create_api(api_url);
        const model_id = document.location.search.match(/id=(.*)/)[1];

        // les boutons auxquels bind les events
        const btn_modifier = $('modifier');
        const btn_supprimer = $('supprimer');
        const btn_sauvegarder = $('sauvegarder');
        const btn_annuler = $('annuler');
        // le formulaire
        const form = $('edit-form');
        const form_inputs = (() => {
            const arr = [];
            inputs.forEach((obj) => {
                arr.push({ ...obj, element: $(obj.id) });
            });
            return arr;
        })();


        API
            .get(model_id)
            .catch((err) => {
                alert(err.statusText);
                window.location.pathname = 'products/index.html';
            })
            .then(res => res.json())
            .then((data) => {
                form_inputs.forEach(({ element, api }) => {
                    // eslint-disable-next-line no-param-reassign
                    element.value = get_key_or_none(data, api);
                    element.attributes.setNamedItem(document.createAttribute('readonly'));
                });
            });

        /**
         * Prépare le document pour le mode édition
         * @param {HTMLInputElement[]} array_of_elements - L'élément a 'bind' à la fonction
         * @return {function(): void} - La fonction qui permet de rendre le document en mode édition
         */
        function modifier(array_of_elements) {
            return () => {
                // enlever la propriété
                array_of_elements.forEach(({ element }) => {
                    element.attributes.removeNamedItem('readonly');
                });
                // afficher les bons boutons
                btn_modifier.classList.toggle('hidden');
                btn_sauvegarder.classList.toggle('hidden');
                btn_annuler.classList.toggle('hidden');
            };
        }

        /**
         * Supprime l'élément de la base de données
         */
        function supprimer() {
            if (window.confirm('Voulez-vous vraiment supprimer cet élément?')) {
                API
                    .delete(model_id)
                    .catch((err) => { alert(err.statusText); })
                    .then(() => {
                        // aucune erreur, navigation à l'index
                        window.location.pathname = `${api_url}/index.html`;
                    });
            }
        }

        /**
         * Sauvegarde les modifications faites au modèle
         */
        function sauvegarder() {
            API
                .edit(model_id, form_data_to_json(new FormData(form)))
                .catch(async (err) => { throw await err.json(); })
                .catch(alert);
        }

        // configuration des eventListeners
        btn_modifier.addEventListener('click', modifier(form_inputs));
        btn_supprimer.addEventListener('click', supprimer);
        btn_sauvegarder.addEventListener('click', sauvegarder);
    }

    // Eh oui, malheureusement
    window.Application = {
        execute_fn_for_page,
        generic_index,
        generic_create,
        generic_detail,
    };
})();
