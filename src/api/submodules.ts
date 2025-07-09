import axios from 'axios';

const BASE_URL = "http://localhost:8000/submodules";
export const getSubmodules = async (moduleId: string) =>(await axios.get(`${BASE_URL}/${moduleId}`)).data;
export const getSubmoduleById = async (id: string) =>(await axios.get(`${BASE_URL}/detail/${id}`)).data;
export const createSubmodule = async (userData: unknown) =>(await axios.post(BASE_URL, userData)).data;
export const updateSubmodule = async (id: string, userData: unknown) =>(await axios.put(`${BASE_URL}/${id}`, userData)).data;
export const deleteSubmodule = async (id: string) =>(await axios.delete(`${BASE_URL}/${id}`)).data;
