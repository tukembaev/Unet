import $api from "../http";
import $apiJSON from "../http/apiJSON";


//API для получения всех приказов 
export async function getOrder( data) {
  return $api.get(`/myorders/`,data);
}

//API для получения информации по одному приказу 
export async function getOrderData(id , data) {
  return $api.get(`/order/${id}/`,data);
}

//API для отправки приказа 
export async function createOrder(file,order_file,user_id ) {
  return $api.post("/order/",{file,order_file,user_id });
}

export async function registerOrder(user_id , order_date,order_number,file ) {
  return $api.post("/register-order/",{ user_id , order_date,order_number,file });
}

export async function RequestReportOrder(data) {
  return $apiJSON.post("/order-report/",data);
}


export async function patchOrder(id, data) {
  return $apiJSON.patch(`/order/${id}/`, data)
}
export async function patchOrderFormData(id, data) {
  return $api.patch(`/order/${id}/`, data)
}


export async function getPositionData( data) {
  return $api.get(`/position/`,data);
}
export async function getTopPositionData(data) {
  return $api.get(`/position-empl/`,data);
}


export async function getPositionEmpData(id , data) {
  return $api.get(`/posempl/${id}/`,data);
}