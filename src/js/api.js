export default
class Api {
    constructor(api_url) {
        if (typeof api_url !== 'string') {
            throw new Error('api_url must be a string');
        }

        this.api_url = Api.API_URL + api_url;
    }

    static get API_URL() {
        return 'http://localhost:3033/';
    }

    async get() {
        return fetch(`${this.api_url}`);
    }

    async create(body) {
        return this.postFetch('create', body);
    }

    async edit(body) {
        return this.postFetch('edit', body);
    }

    async delete(body) {
        return this.postFetch('delete', body, 'DELETE');
    }

    async postFetch(endpoint, body, method = 'POST') {
        const content_type = 'application/json';
        return fetch(`${this.api_url}/${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': content_type,
                'X-Content-Type': content_type,
            },
            body: typeof body !== 'string' ? JSON.stringify(body) : body,
        });
    }
}
