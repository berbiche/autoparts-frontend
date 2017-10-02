let navigation_instance; // Navigation is a singleton object

export default
class Navigation {
    constructor(routes) {
        if (!navigation_instance) {
            navigation_instance = this;

            window.addEventListener('hashchange', this.navigateTo.bind(this));
            window.addEventListener('popstate', this.navigateTo.bind(this));

            this.routes = new Map(routes);
            this.current_route = this.routes.get(window.location.hash) || this.routes.get('/');
            this.current_route.view.onEnter(this.current_route);
        }

        return navigation_instance;
    }

    addRoute(path, route) {
        this.routes.set(path, route);
    }

    navigateTo(event) {
        if (!(event instanceof HashChangeEvent))
            throw new Error('Invalid route navigation');
        const url = event.newURL;

        let route = this.routes.get(url);
        if (!route) {
            console.debug(`Route not found ${url}`);
            route = this.routes.get('404');
        }

        history.replaceState(this._getState(), route.title, url);
        history.pushState(null, route.title, url);
    }

    back(event) {
        if (!(event instanceof HashChangeEvent))
            throw new Error('Invalid route navigation');

        history.replaceState(this._getState(), route.title, route.url);
    }

    _parseLocation(url) {
        let route = this.routes.get(url) || this.routes.get('/404');
        const hash = url.startsWith()
        const segments = url.split('/');
        // if (segments.length < 2)
    }

    _getState() {
        return this.current_route.
    }
}
