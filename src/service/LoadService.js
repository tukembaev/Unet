import $api from "../http";


export async function getStudentsForLoad(id, data) {
  return $api.get(`/student-flow/${id}/`,data);
}


export async function getLoad(data) {
    return $api.get(`/capacity/`,data);
  }
