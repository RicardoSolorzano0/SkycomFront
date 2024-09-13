import notasApi from "../api/notaApi";

export const useNotaFunctions = () => {
  const getNotas = async () => {
    try {
      const { data } = await notasApi.get("/");
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const updateNota = async (nota) => {
    try {
      const { data } = await notasApi.put(`/${nota.id}/`, nota);
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const deleteNota = async (id) => {
    try {
      const { data } = await notasApi.delete(`/${id}/`);
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const createNota = async (nota) => {
    try {
      const { data } = await notasApi.post("/", nota);
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  return {
    getNotas,
    updateNota,
    deleteNota,
    createNota,
  };
};
