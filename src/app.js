import { API_URL_PRODUCTS, API_URL_CLIENTS } from './config';
import { ROUTES } from './routes';
import Api from './js/api';
import Navigation from './js/navigation';
import View from './js/view';


const navigation = new Navigation(ROUTES);
navigation.startApp(); // Start the application

