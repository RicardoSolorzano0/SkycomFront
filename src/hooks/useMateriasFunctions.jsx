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
  return {
    getMaterias,
  };
};
