import $api from "../http";
import $apiJSON from "../http/apiJSON";

export async function createBasicAct({
  act_num,
  date_act,
  uchrejdenie,
  struct_podrazdelenie,
  name_sredstva,
  mat_otv,
  zavod_num,
  invent_num,
  name_pokaz,
  debet,
  credit,
  summa,
  komis,
  rasporyaditel,
  date_naznach,
  naznach_num,
  osnovanie,
  name_obj,
  date_izgotov,
  date_postupleniya,
  date_expl,
  remont_count,
  summa_remontov,
  name_metall_1,
  kod_ucheta_1,
  ed_izm_1,
  code_okei_1,
  massa_1,
  name_metall_2,
  kod_ucheta_2,
  ed_izm_2,
  code_okei_2,
  massa_2,
  name_metall_3,
  kod_ucheta_3,
  ed_izm_3,
  code_okei_3,
  massa_3,
  zakluchenie,
  applications_id,
}) {
  return $apiJSON.post("axr/actosn/", {
    act_num,
    date_act,
    uchrejdenie,
    struct_podrazdelenie,
    name_sredstva,
    mat_otv,
    zavod_num,
    invent_num,
    name_pokaz,
    debet,
    credit,
    summa,
    komis,
    rasporyaditel,
    date_naznach,
    naznach_num,
    osnovanie,
    name_obj,
    date_izgotov,
    date_postupleniya,
    date_expl,
    remont_count,
    summa_remontov,
    name_metall_1,
    kod_ucheta_1,
    ed_izm_1,
    code_okei_1,
    massa_1,
    name_metall_2,
    kod_ucheta_2,
    ed_izm_2,
    code_okei_2,
    massa_2,
    name_metall_3,
    kod_ucheta_3,
    ed_izm_3,
    code_okei_3,
    massa_3,
    zakluchenie,
    applications_id
  });
}

export async function createLowAct({
  date_utver,
  act_num,
  date_act,
  uchrejdenie,
  struct_podrazdelenie,
  mat_otv,
  komis,
  date_naznach,
  naznach_num,
  mesto,
  date_expl,
  kod_ucheta,
  summa,
  zakluchenie,
  date_hraneniya,
  summa_propis,
  name_pokaz,
  debet,
  credit,
  rasporyaditel,
  osnovanie,
  name_obj,
  date_izgotov,
  date_postupleniya,
  remont_count,
  summa_remontov,
  code_okei,
  spisanie,
  applications_id,
}) {
  return $apiJSON.post("axr/actmoc/", {
    date_utver,
  act_num,
  date_act,
  uchrejdenie,
  struct_podrazdelenie,
  mat_otv,
  komis,
  date_naznach,
  naznach_num,
  mesto,
  date_expl,
  kod_ucheta,
  summa,
  zakluchenie,
  date_hraneniya,
  summa_propis,
  name_pokaz,
  debet,
  credit,
  rasporyaditel,
  osnovanie,
  name_obj,
  date_izgotov,
  date_postupleniya,
  remont_count,
  summa_remontov,
  code_okei,
  spisanie,
  applications_id,
  });
}

//API на основные акты 
export async function getActOsnData(id , data) {
  return $api.get(`/axr/actosn/${id}/`,data);
}

export async function SignActOsn(id, data) {
  return $apiJSON.patch(`/axr/actosn/${id}/`, data)
}

//API на малоценные акты 
export async function getActMocData(id , data) {
  return $api.get(`/axr/actmoc/${id}/`,data);
}

export async function SignActMoc2(id, data) {
  return $apiJSON.patch(`/axr/actmoc/${id}/`, data)
}

//API на малоценные акты 
export async function getActCommission2(data) {
  return $api.get('/axr/commitee/',data);
}



