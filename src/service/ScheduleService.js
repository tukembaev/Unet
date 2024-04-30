import $api from "../http";

//API для получения информации по QR кодам с кабинетами
export async function getSchedules( data) {
  return $api.get(`/schedule/`,data);
}
