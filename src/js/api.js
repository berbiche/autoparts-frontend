const apis = new Map();

export default
class Api {

    constructor(api_url) {
        const api_exist = apis.get(api_url);

        if (!api_exist) {
            apis.set(api_url, this);
            api_exist = this;
        }

        return api_exist;
    }

    create(id, data) {
        fetch(api, )
    }

}
