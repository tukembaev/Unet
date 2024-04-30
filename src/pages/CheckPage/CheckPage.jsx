import React, { useEffect, useRef, useState } from "react";
import { Layout } from "../../components";
import styles from "./CheckPage.module.scss";
import {
  getQrCopy,
  getQrOperation,
  getQrPages,
  getQrPrice,
  getQrReportemail,
} from "../../service/ScanQrService";
import { useReactToPrint } from "react-to-print";

const CheckPage = () => {
  const [render, setRender] = useState(false);
  const [pages, setPages] = useState(null);
  const [price, setPrice] = useState(null);
  const [copy, setCopy] = useState(null);
  const [operation, setOperation] = useState(null);
  const [reportemail, setReportEmail] = useState(null);
  const data = null;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Simpleraport",
  });
  const getData = async () => {
    try {
      let response1 = await getQrPages(data);
      setPages(response1.data);
      let response2 = await getQrPrice(data);
      setPrice(response2.data);
      let response3 = await getQrCopy(data);
      setCopy(response3.data);
      let response4 = await getQrOperation(data);
      setOperation(response4.data);
      let response5 = await getQrReportemail(data);
      setReportEmail(response5.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);

  return (
    <Layout>
      <div className={styles.headnav}>
        <div className={styles.pdfwindow} ref={componentRef}>
          <h1
            style={{
              textAlign: "center",
              width: "100%",
              marginTop: "40px",
              marginBottom: "140px",
            }}
          >
            UNETPRINT
          </h1>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "35px" }}
          >
            <h3 style={{ fontSize: "24px" }}>
              Количество cтраницы: {pages?.page}{" "}
            </h3>
            <h3 style={{ fontSize: "24px" }}>Цена: {price?.scan} </h3>
            <h3 style={{ fontSize: "24px" }}>Копии: {copy?.copy} </h3>
            {reportemail?.report_email !== "hakerv63@gmail.com" ? (
              <h3 style={{ fontSize: "24px" }}>
                Почта: {reportemail?.report_email}{" "}
              </h3>
            ) : null}

            <h3 style={{ fontSize: "24px" }}>Итого: {operation?.bill} </h3>
            <h3 style={{ fontSize: "24px" }}>Время: {operation?.data} </h3>
          </div>
        </div>
        <button onClick={handlePrint} className={styles.shareButton}>
          Скачать
        </button>
      </div>
    </Layout>
  );
};

export default CheckPage;
