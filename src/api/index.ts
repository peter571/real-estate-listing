import axios, { AxiosResponse } from "axios";
import { LoginValues, PropertyValues, RegisterValues } from "../types";

const API = axios.create({
    baseURL: 'https://k-homes-api.herokuapp.com/'
})

const responseBody = (response: AxiosResponse) => response;

const requests = {
    get: (url: string) => API.get(url).then(responseBody),
    getItem: (id: string) => API.get(id).then(responseBody),
    post: (url: string, body: {}) => API.post(url, body).then(responseBody),
    put: (url: string, body: {}) => API.put(url, body).then(responseBody),
    delete: (url: string) => API.delete(url).then(responseBody),
};

/**properties Api */
export const properties = {
    fetchProperties: (): Promise<any> => requests.get('/properties'),
    fetchProperty: (id: string): Promise<any> => requests.get(`/properties/${id}`),
    createProperty: (property: PropertyValues): Promise<any> => requests.post('/properties', property),
    updateProperty: (id: string, newProperty: {}): Promise<any> => requests.put(`/properties/${id}`, newProperty),
    deleteProperty: (id: string): Promise<any> => requests.delete(`/properties/${id}`)
}

/**Users Api */

export const users = {
    registerUser: (signupData: RegisterValues): Promise<AxiosResponse<any>> => requests.post('/auth/register', signupData),
    loginUser: (siginData: LoginValues): Promise<AxiosResponse<any>> => requests.post('/auth/login', siginData),
    resetUser: (email: {}): Promise<AxiosResponse<any>> => requests.post('/auth', email),
    resetUserPassword: (newpasswordValues: {}): Promise<AxiosResponse<any>> => requests.post('/auth', newpasswordValues)
}
