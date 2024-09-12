import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const materiaApi = axios.create({
    baseURL: VITE_API_URL + "materias/"
});

export default materiaApi