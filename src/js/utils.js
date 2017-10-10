const $ = document.getElementById.bind(document);
const $$ = document.querySelectorAll.bind(document);
const form_data_to_json = (formData) => {
    const body = {};
    for (const [key, value] of formData) {
        body[key] = value;
    }
    return body;
}
