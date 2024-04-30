
import $api from "../http";
import $apiJSON from "../http/apiJSON";



export async function createChat(employee_two) {
    return $apiJSON.post("chat/chat/",{employee_two});
  }

  export async function getDirections(data) {
    return $api.get("/syllabuses/", data);
  }
  export async function getSemesters(id , data) {
    return $api.get(`/semesters/${id}/`, data);
  }
  export async function getSubjects(id , data) {
    return $api.get(`/subjects/${id}/`, data);
  }

  export async function getCorpuses(data) {
    return $api.get("/organizations/korpuses/", data);
  }

  export async function getCorpusesClasses(id , data) {
    return $api.get(`/organizations/auditoriums/${id}/`, data);
  }
  export async function getFlows( data) {
    return $api.get(`/streams/`, data);
  }
  export async function getFlowsShedules(id ,  data) {
    return $api.get(`/stream/${id}/`, data);
  }
  export async function patchTeachers(id ,  data) {
    return $api.patch(`/stream/${id}/`, data);
  }

  export async function createFlow(data) {
    return $apiJSON.post(`/streams/`,data);
  }



  export async function createTheme(data) {
    return $api.post(`/themes/`,data);
  }

  export async function postFlowsShedules(id , data) {
    return $apiJSON.post(`/schedule/${id}/`, data);
  }