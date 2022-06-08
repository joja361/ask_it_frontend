import axios from "axios";
import { getTokenAndUser } from "./token";

const URL = "http://localhost:5000";
const newURL = "https://7afd-37-208-36-133.eu.ngrok.io";

const { token } = getTokenAndUser();

export const mainUrl = axios.create({
  baseURL: newURL,
});

export const authUrl = axios.create({
  baseURL: newURL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
