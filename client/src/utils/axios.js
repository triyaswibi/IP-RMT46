import axios from "axios";

const instance = axios.create({
    // baseURL: "https://showroom-auto-care.codeninja.biz.id",
    baseURL: "http://localhost:3000"
})

export default instance;