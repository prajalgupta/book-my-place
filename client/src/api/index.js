import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8080/api"
});
export const UserSignUp = async (data) => await API.post("/user/signup", data);
export const UserSignIn = async (data) => await API.post("/user/signIn", data);

export const getAllProperty = async (filter) =>
    await  API.get(`/property/get?${filter}`);

export const getPropertyDetails = async (id) =>
    await  API.get(`/property/${id}`);

export const getFavourite = async (token) => 
    await API.get(`/user/getFavorites/`, {
        headers: { Authorization: `Bearer ${token}`},
    });

export const addToFavourite = async (token, data) => 
    await API.get(`/user/addToFavorites/`, data, {
        headers: { Authorization: `Bearer ${token}`},
    });

export const deleteFromFavourite = async (token, data) => 
    await API.get(`/user/removeFromFavorites/`, data, {
        headers: { Authorization: `Bearer ${token}`},
    });

export const bookProperty = async (token, data) => 
    await API.get(`/user/booking/`, data, {
        headers: { Authorization: `Bearer ${token}`},
    });

export const getBookedProperty = async (token) => 
    await API.get(`/user/getBooking/`, {
        headers: { Authorization: `Bearer ${token}`},
    });