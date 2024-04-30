import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../components/index";
import styles from "./QrcodeInfo.module.scss";
import { useParams } from "react-router-dom";
import { Button } from "./../../../components/index";
import { useNavigate } from "react-router-dom";
import { getQrData } from "../../../service/QrService";
import { setQrData } from "../../../store/slices/QrSlice";
function QrcodeInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const { id } = useParams();
  const getData = async () => {
    try {
      let response = await getQrData(id, data);
      dispatch(
        setQrData({
          qrId: response.data,
        })
      );
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const items = useSelector((state) => state.qr.qrId);

  return (
    <Layout>
      <div className={styles.qr_info_wrapper}>
        <div className={styles.qr_info_header}>
          <h1>{items.cumpus}</h1>
          <Button className={styles.btn2} onClick={() => navigate(-1)}>
            Закрыть
          </Button>
        </div>
        <div className={styles.qr_info_body}>
          <div className={styles.info_header_list}>
            <p>Корпус:{items.korpus}</p>
            <p>Номер аудитории:{items.num_audit}</p>
          </div>
          <h2>{items.nameRU}</h2>
          <div className={styles.info_list}>
            <p>Отвечающий за кабинет: {items.Responsible} </p>
            <p>Номер Отвечающего за кабинет: {items.numResponsible}</p>
            <p>Почта Отвечающего за кабинет: {items.opshion} </p>
            <p>Описание : {items.opshions}</p>
          </div>
        </div>
        <div className={styles.qr_info_footer}>
          <div className={styles.footer_left}>
            <Button className={styles.btn1}>
              <a href={`/${items.ssylka}`}>{items.ssylka}</a>
            </Button>
            <Button className={styles.btn1}>Изменить информацию</Button>
          </div>
          <div className={styles.footer_right}>
            <p>QR HERE</p>
            <Button className={styles.btn1}>Скачать</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default QrcodeInfo;
