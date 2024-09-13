import alumnoApi from "../api/alumnoApi";

export const useAlumnoFunctions = () => {
  const getAlumnos = async () => {
    try {
      const { data } = await alumnoApi.get("/");
      return data;
    } catch (error) {
      console.log(error, "error");
    }
  };

  const updateAlumno = async (alumno) => {
    try {
      const { data } = await alumnoApi.put(`/${alumno.id}/`, alumno);
      return data;
    } catch (error) {
      console.log(error, "error");
      return { data: undefined, error: "No se logro actualizar" };
    }
  };

  const deleteAlumno = async (id) => {
    try {
      const { data } = await alumnoApi.delete(`/${id}/`);
      return data;
    } catch (error) {
      console.log(error, "error");
      return { data: undefined, error: "No se logro eliminar" };
    }
  };

  const createAlumno = async (alumno) => {
    try {
      const { data } = await alumnoApi.post("/", alumno);
      return data;
    } catch (error) {
      console.log(error, "error");
      return { data: undefined, error: "No se logro crear" };
    }
  };

  return {
    getAlumnos,
    updateAlumno,
    deleteAlumno,
    createAlumno,
  };
};
