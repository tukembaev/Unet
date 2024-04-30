import $api from "../http";

//API для получения информации по QR кодам с кабинетами
export async function getQr( data) {
  return $api.get(`/qrcodes/`,data);
}
export async function getQrData(id ,data) {
  return $api.get(`/qrcodes/${id}/`,data);
}