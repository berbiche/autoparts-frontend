/**
 * @function
 * @param {string} id - Id of the element
 * @return {HTMLElement}
 */
const $ = document.getElementById.bind(document);

/**
 * @function
 * @param {string} selector - CSS like selector
 * @return {HTMLLiveCollection}
 */
const $$ = document.querySelectorAll.bind(document);

/**
 * Converts a FormData object to a standard object
 * @param {FormData} formData - the FormData to convert to json
 * @return {Object}
 */
const form_data_to_json = (formData) => {
    const body = {};
    for (const [key, value] of formData) {
        body[key] = value;
    }
    return body;
};

/**
 * @param {!Object.<string, *>} obj
 * @param {!string} key
 * @return {*|string}
 */
const get_key_or_none = (obj, key) => obj[key] || '';
