import profesorApi from "../api/profesorApi";

export const useProfesorFunctions = () => {
  const getProfesores = async () => {
    try {
      const { data } = await profesorApi.get("/");
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const updateProfesor = async (profesor) => {
    try {
      const { data } = await profesorApi.put(`/${profesor.id}/`, profesor);
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const deleteProfesor = async (id) => {
    try {
      const { data } = await profesorApi.delete(`/${id}/`);
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const createProfesor = async (profesor) => {
    try {
      const { data } = await profesorApi.post("/", profesor);
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  return {
    getProfesores,
    updateProfesor,
    deleteProfesor,
    createProfesor,
  };
};
