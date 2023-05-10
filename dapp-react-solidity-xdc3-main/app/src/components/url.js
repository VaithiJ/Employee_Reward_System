import axios from "axios";


const instance = axios.create({
    baseURL: "http://65.2.3.121:8800"
})


export default instance;