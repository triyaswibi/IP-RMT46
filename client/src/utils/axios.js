import axios from "axios";

const instance = axios.create({
    baseURL: "https://showroom-auto-care.codeninja.biz.id"
})

export default instance;