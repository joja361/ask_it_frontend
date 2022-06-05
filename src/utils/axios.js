import axios from 'axios'

const URL = 'http://localhost:5000'

export const mainUrl = axios.create({
    baseURL: URL
})

