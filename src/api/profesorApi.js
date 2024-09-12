import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const profesorApi = axios.create({
    baseURL: VITE_API_URL + "profesores/"
});

export default profesorApi