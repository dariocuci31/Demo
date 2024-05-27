import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Segnalazione } from '../models/types.model';

enum ConnectionEnum {
    BASE_URL = "http://localhost:8080",
    API_PATH = "/api",
    CONTROLLER_PATH = "/segnalazioni",
    ID = "/{id}"
}

const apiClient: AxiosInstance = axios.create({
    baseURL: ConnectionEnum.BASE_URL + ConnectionEnum.API_PATH,
    headers: {
        'Content-Type': 'application/json'
    },

});

export const getFilteredList = async (date?: string): Promise<Segnalazione[]> => {
    try {
        const response: AxiosResponse<Segnalazione[]> = await apiClient.get(ConnectionEnum.CONTROLLER_PATH + "/", { params: {date: date ? date : null } });
        return response.data;
    } catch (error) {
        console.error("Error fetching record:", error);
        throw error;
    }
}

export const create = async (data: Segnalazione): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await apiClient.post(ConnectionEnum.CONTROLLER_PATH + "/", data);
        return response.data;
    } catch (error) {
        console.error("Error creating segnalazione:", error);
        throw error;
    }
}

export const deleteById = async (id: number): Promise<boolean> => {
    try {
        const response: AxiosResponse<boolean> = await apiClient.delete(ConnectionEnum.CONTROLLER_PATH + ConnectionEnum.ID.replace("{id}", id.toString()), { data: id });
        return response.data;
    } catch (error) {
        console.error("Error deleteing record:", error);
        throw error;
    }
}





