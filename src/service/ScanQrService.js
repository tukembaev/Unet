import $api from "../http";

//API для получения информации по QR кодам для принта (таск от мирбы)
export async function getQrPages( data) {
  return $api.get(`/mirbek/pages/`,data);
}
export async function getQrPrice( data) {
  return $api.get(`/mirbek/prise/`,data);
}
export async function getQrCopy( data) {
  return $api.get(`/mirbek/copy/`,data);
}
export async function getQrOperation( data) {
  return $api.get(`/mirbek/operation/`,data);
}

export async function getQrReportemail( data) {
  return $api.get(`/mirbek/reportemail/`,data);
}