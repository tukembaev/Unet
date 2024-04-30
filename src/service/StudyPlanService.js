import $api from "../http";
import $apiJSON from "../http/apiJSON";


export async function getStudyPlan(data) {
    return $api.get(`/all-syllabus/`,data);
  }

  // export async function getStudyPlanInfo(id , data) {
  //   return $api.get(`/syllabus/${id}/`,data);
  // }
  export async function getStudyPlanInfo(id , data) {
    return $api.get(`/courses/${id}/`,data);
  }

  // all select
  export async function getFacultyOptins(data) {
    return $api.get(`/faculties/`,data);
  }
  export async function getTitleOptins(id , data) {
    return $api.get(`/directions/${id}/`,data);
  }
  export async function getProfileOptins(id , data) {
    return $api.get(`/profiles/${id}/`,data);
  }

  export async function getSemester(id , data) {
    return $api.get(`/get-course/${id}/`,data);
  }


  export async function getAllSubjects(id , data) {
    return $api.get(`/get-course/${id}/`,data);
  }

  
  export async function createSemester(id ,data) {
    return $apiJSON.patch(`/syllabus/${id}/`,data);
  }
  export async function deleteSemester(id) {
    return $apiJSON.delete(`/semester/${id}/`);
  }
  export async function createSubject( data) {
    return $apiJSON.post(`/new-create-course/`,data);
  }
  export async function patchSubject(id , data) {
    return $apiJSON.patch(`/course/${id}/`,data);
  }
  export async function deleteSubject(id , data) {
    return $apiJSON.delete(`/course/${id}/`,data);
  }

  export async function getAllDepartment(data) {
    return $apiJSON.get(`/all-departments/`,data);
  }


  

  
  export async function createStudyPlan(data) {
    return $apiJSON.post(`/new-syllabus/`,data);
  }


