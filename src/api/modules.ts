import axios from 'axios';

const BASE_URL = "http://localhost:8000/modules";

export const getModules = async () => (await axios.get(BASE_URL)).data;
export const getModuleById = async (id:string) => (await axios.get(`${BASE_URL}/${id}`)).data;
export const createModule = async (userData:unknown ) => (await axios.post(BASE_URL, userData)).data;
export const updateModule = async (id:string, userData:unknown) => (await axios.put(`${BASE_URL}/${id}`, userData)).data;
export const deleteModule = async (id:string) => (await axios.delete(`${BASE_URL}/${id}`)).data;