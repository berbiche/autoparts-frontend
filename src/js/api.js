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

    async get(id) {
        if (id) {
            return fetch(`${this.api_url}/${id}`);
        }
        return fetch(`${this.api_url}?$limit=50`);
    }

    async create(body) {
        const data = typeof body !== 'string' ? JSON.stringify(body) : body;
        return this.postFetch('', data);
    }

    async edit(id, body) {
        return this.postFetch('', JSON.stringify({ _id: id, ...body }));
    }

    async delete(id) {
        return this.postFetch(id, '', 'DELETE');
    }

    async postFetch(endpoint, body, method = 'POST') {
        const content_type = 'application/json';
        return fetch(this.api_url + (endpoint ? `/${endpoint}` : ''), {
            method,
            headers: {
                'Content-Type': content_type,
                'X-Content-Type': content_type,
            },
            body,
        }).then((res) => {
            if (!res.ok) throw res;
            return res;
        });
    }
}
