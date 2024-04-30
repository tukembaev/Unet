
import $api from "../http";
import $apiJSON from "../http/apiJSON";



  export async function getDiscipline(data) {
    return $api.get(`/employee-subjects/`, data);
  }
  export async function getDisciplineInfo(id ,data) {
    return $api.get(`/themes/${id}/`, data);
  }
  export async function getStudentDiscipline(data) {
    return $api.get(`/student-discipline/`, data);
  }
  export async function getDirections(data) {
    return $api.get(`/direction/`, data);
  }
  export async function getSyllabusBase(data) {
    return $api.get(`/employee-syllabus-base/`, data);
  }
  export async function getSyllabusOptional(data) {
    return $api.get(`/employee-syllabus-optionally/`, data);
  }
  export async function getGroups(id ,data) {
    return $api.get(`/group/${id}/`, data);
  }


  export async function postTheme(theme , text , time , file) {
    return $api.post(`/employee-subjects/`, {theme , text , time , file});
  }

  export async function registerToDiscipline(subject , stream) {
    return $apiJSON.post(`/student-discipline/`, {subject , stream});
  }