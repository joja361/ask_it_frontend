import axios from "axios";

const URL = "http://localhost:5000";
const newURL = "https://7afd-37-208-36-133.eu.ngrok.io";

export const mainUrl = axios.create({
  baseURL: URL,
});
