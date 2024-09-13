import materiaApi from "../api/materiaApi";

export const useMateriasFunctions = () => {
  const getMaterias = async () => {
    try {
      const { data } = await materiaApi.get("/");
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const updateMateria = async (materia) => {
    try {
      const { data } = await materiaApi.put(`/${materia.id}/`, materia);
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const deleteMateria = async (id) => {
    try {
      const { data } = await materiaApi.delete(`/${id}/`);
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const createMateria = async (materia) => {
    try {
      const { data } = await materiaApi.post("/", materia);
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  return {
    getMaterias,
    updateMateria,
    deleteMateria,
    createMateria,
  };
};
