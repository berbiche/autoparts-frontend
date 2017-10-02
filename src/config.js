import Api from './api';


export const API_URL = 'http://localhost:3033';
export const API_URL_PRODUCTS = `${API_URL}/products`;
export const API_URL_CLIENTS = `${API_URL}/clients`;
export const API_PRODUCTS = new Api(API_URL_PRODUCTS);
export const API_CLIENTS = new Api(API_URL_CLIENTS);
