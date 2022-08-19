import { GET_CATEGORIES } from 'configs/url.config';
import http from 'services/http.services';

export async function GetCategory(id: string) {
    try {
        const response = await http.get(`${GET_CATEGORIES}/${id}`);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function GetCategories() {
    try {
        const response = await http.get(GET_CATEGORIES);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}