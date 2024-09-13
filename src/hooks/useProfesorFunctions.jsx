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
      return { data: undefined, error: "Error al actualizar el profesor" };
    }
  };

  const deleteProfesor = async (id) => {
    try {
      const { data } = await profesorApi.delete(`/${id}/`);
      return data;
    } catch (error) {
      console.log(error, "error");
      return { data: undefined, error: "Error al eliminar el profesor" };
    }
  };

  const createProfesor = async (profesor) => {
    try {
      const { data } = await profesorApi.post("/", profesor);
      return data;
    } catch (error) {
      console.log(error, "error");
      return { data: undefined, error: "Error al crear el profesor" };
    }
  };

  return {
    getProfesores,
    updateProfesor,
    deleteProfesor,
    createProfesor,
  };
};
