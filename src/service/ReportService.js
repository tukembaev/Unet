import $api from "../http";
import $apiJSON from "../http/apiJSON";

export async function getStudyPlanExcal(id) {
  return $api.get(`/export-to-excel/${id}/`);
}

export async function getInstitutions() {
  return $api.get(`/faculties/`);
}

export async function getKafedra(id) {
  return $api.get(`/departments/${id}/`);
}

export async function getStudyPlanExcel(id) {
  return $api.get(`/export-to-excel/${id}/`);
}
export async function getStudyReport({
  institute_id,
  department_id,
  form,
  year,
}) {
  let queryString = "/institutes-syllabuses/?";

  if (
    institute_id !== undefined &&
    institute_id !== "" &&
    institute_id !== null
  ) {
    queryString += `institute_id=${institute_id}&`;
  }

  if (
    department_id !== undefined &&
    department_id !== "" &&
    department_id !== null
  ) {
    queryString += `department_id=${department_id}&`;
  }

  if (form !== undefined && form !== "" && form !== null) {
    queryString += `form=${form}&`;
  }

  if (year !== undefined && year !== "" && year !== null) {
    queryString += `year=${year}&`;
  }

  // Удалите последний символ '&' из строки запроса, если есть
  queryString = queryString.replace(/&$/, "");

  return $api.get(queryString);
}
