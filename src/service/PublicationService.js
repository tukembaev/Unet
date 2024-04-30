import $api from "../http";
import $apiJSON from "../http/apiJSON";
//API для получения алертов
export async function getPublications(data) {
    return $api.get(`/publications/`,data);
  }
  
  export async function postPublications(title, description , kind , link, doi, issn, isni,
    wikipedia_url,
    wikidata, country , published ,  authors) {
    return $apiJSON.post(`/publications/`,{title, description , kind , link, doi, issn, isni,
      wikipedia_url,
      wikidata, country , published ,  authors});
  }
  
  export async function getPublicationInfo(id , data) {
    return $api.get(`/publications/${id}/`,data);
  }
  export async function patchPublicationInfo(id ,data) {
    return $api.patch(`/publications/${id}/`,data);
  }
  

// KPi service
export async function getKpi(data) {
  return $api.get(`/criteria-category-kpi/`,data);
}
// director
export async function getCriteria(data) {
  return $api.get(`/criteria/`,data);
}
export async function getCategoryKpi( id,data) {
  return $api.get(`/category/${id}/`,data);
}

// PPS
export async function getCriteriaPPS(data) {
  return $api.get(`/criteria-pps/`,data);
}
export async function getCategoryKpiPPS( id,data) {
  return $api.get(`/category-pps/${id}/`,data);
}

// export async function getCategoryKpiNested(id, data) {
//   return $api.get(`/category-nested/${id}/`,data);
// }

// export async function getCriteriaHas(data) {
//   return $api.get(`/criteria-has-kpi/`,data);
// }
export async function getCriteriaHead(data) {
  return $api.get(`/employees-kpis/`,data);
}
export async function getKpiEmployee(id , data) {
  return $api.get(`/kpi-employee/${id}/`, data);
}
export async function getCategoryForAnyKpi( data) {
  return $api.get(`/category/`,data);
}

  // export async function getKpiPublick(id , data) {
  //   return $api.get(`/kpi-category/${id}/`,data);
  // }

  export async function postKpi( data) {
    return $apiJSON.post(`/kpi/`, data);
        
  }

  export async function patchKpiInfo(id ,data) {
    return $api.patch(`/kpi-info/${id}/`,data,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  export async function deleteKpiInfo(id) {
    return $api.delete(`/kpi-info/${id}/`);
  }
  
  export async function patchKpiInfoJson(id ,data) {
    return $apiJSON.patch(`/kpi-info/${id}/`,data);
  }
  export async function getKpiInfo(id ,data) {
    return $api.get(`/kpi-info/${id}/`,data);
  }

  export async function getKpiInsititutions(data) {
    return $api.get(`/institutes/`,data);
  }
  export async function getKpiDepartment(id,data) {
    return $api.get(`/department/${id}/`,data);
  }
  export async function getKpiDivisions(data) {
    return $api.get(`/divisions/`,data);
  }
  export async function getKpiCenters(data) {
    return $api.get(`/centers/`,data);
  }
  export async function getAllEmployee(search,page,data) {
    return $api.get(`/employee-report/?page=${page}&search=${search}`,data);
  }

  // KPi service

// директор 
export async function getCategoryDirector( id,data) {
  return $api.get(`/category-is_director/${id}` ,data);
}

// заведуйщий
export async function getCategoryManager( id,data) {
  return $api.get(`/category/${id}/`,data);
}

// KpiList

export async function getKpiList( id,data) {
  return $api.get(`/kpi-planning/${id}/`,data);
}
export async function postKpiList( id,data) {
  return $api.post(`/kpi-planning/${id}/`,data);
}
 