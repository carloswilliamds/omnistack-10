import axios from "axios"

const api = axios.create({
    baseURL: "http://10.20.50.94:3333"
})

export default api;