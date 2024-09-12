import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

const alumnoApi = axios.create({
    baseURL: VITE_API_URL + "alumnos/"
});

export default alumnoApi