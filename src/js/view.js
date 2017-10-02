/*
 * Lifecycle is the following:
 * 1. The class is instanciated
 * 2. The class onRender() is called for the rendering of the view
 */
export default
class View {

    constructor(template_url, api_url) {
        this.template_url = template_url;
        this.api_url = api_url;
    }

    onRender() {

    }

}
