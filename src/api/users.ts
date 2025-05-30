import axios from 'axios';

const BASE_URL = "http://localhost:8000/users";

export const getUsers = async () => (await axios.get(BASE_URL)).data;
export const getUserById = async (id:string) => (await axios.get(`${BASE_URL}/${id}`)).data;
export const createUser = async (userData:unknown ) => (await axios.post(BASE_URL, userData)).data;
export const updateUser = async (id:string, userData:unknown) => (await axios.put(`${BASE_URL}/${id}`, userData)).data;
export const deleteUser = async (id:string) => (await axios.delete(`${BASE_URL}/${id}`)).data;