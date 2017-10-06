import Navigation from './navigation';
import View from './view';


let router_instance;

export default
class Router {
    constructor(routes) {
        if (!router_instance) {
            router_instance = this;

            this.navigation = new Navigation();
            this.routes = new Map(routes);
        }

        return router_instance;
    }

    navigateTo(path) {
        const route = this.routes.get(path);
        if (route) {
            this.navigation.navigateTo(route.path);
        }
    }

    addRoutes(route) {
        if (typeof route !== 'object' || (!route && (!route.path || !route.view))) {
            throw new Error('route is not a valid route');
        }

        if (this.routes.has(route.path))
            return; // route already exists

        this.routes.set(route.path, route.view);
    }
}
