import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const notasApi = axios.create({
    baseURL: VITE_API_URL + "notas/"
});

export default notasApi