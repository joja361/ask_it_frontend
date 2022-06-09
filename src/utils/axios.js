import axios from "axios";

const URL = "http://localhost:5000";
const newURL = "https://0d91-37-208-36-133.eu.ngrok.io";

export const mainUrl = axios.create({
  baseURL: URL,
});

export const authUrl = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
