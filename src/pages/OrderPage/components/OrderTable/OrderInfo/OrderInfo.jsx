import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../components/index";
import { useLocation, useParams } from "react-router-dom";
import Order from "./components/Order/Order";
import { getOrderData } from "../../../../../service/OrderService";
import { setOrderById } from "../../../../../store/slices/OrderSlice";

const OrderInfo = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [render, setRender] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const getData = async () => {
    try {
      let response = await getOrderData(id, data);
      dispatch(
        setOrderById({
          orderId: response.data,
        })
      );
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getData();
    setRender(false);
  }, [render, location.pathname]);
  const items = useSelector((state) => state.order);
  const order = items.orderId;


  return (
    <Layout>
      <Order info={order} setRender={setRender} />
    </Layout>
  );
};

export default OrderInfo;
