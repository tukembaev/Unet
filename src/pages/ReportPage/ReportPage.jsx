import React, { useEffect, useState } from "react";
import styles from "./ReportPage.module.scss";
import { Button, Layout } from "../../components";
import DocsReportPage from "./components/DocsReportPage/DocsReportPage";
import TaskReportPage from "./components/TaskReportPage/TaskReportPage";
import OrderReportPage from "./components/OrderReportPage/OrderReportPage";
import StudyReportPage from "./components/StudyReportPage/StudyReportPage";
import { useNavigate } from "react-router-dom";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import StatementForm from "../../components/Forms/StatementForm/StatementForm";

const ReportPage = () => {
  const [choose, setChoose] = useState(0);
  const [openBottomSheet, setOpenBottomSheet] = useState(false);
  return (
    <Layout>
      <div
        className={styles.wrapper}
        style={choose === 0 ? { padding: "15px" } : { padding: "15px" }}
      >
        {choose === 0 ? <h2>Отчеты</h2> : null}
        {/* <Button className={styles.btn_pin} onClick={() => setOpen(true)}>
          Тест
        </Button> */}

        {choose === 0 ? (
          <div className={styles.card_list}>
            <div className={styles.card} onClick={() => setChoose(1)}>
              Отчет по задачам
            </div>
            <div className={styles.card} onClick={() => setChoose(2)}>
              Отчет по документам
            </div>
            <div className={styles.card} onClick={() => setChoose(3)}>
              Отчет по приказам
            </div>
            <div className={styles.card} onClick={() => setChoose(4)}>
              Отчет по учебному плану
            </div>{" "}
          </div>
        ) : choose === 1 ? (
          <TaskReportPage setChoose={setChoose} />
        ) : choose === 2 ? (
          <DocsReportPage setChoose={setChoose} />
        ) : choose === 3 ? (
          <OrderReportPage setChoose={setChoose} />
        ) : choose === 4 ? (
          <StudyReportPage setChoose={setChoose} />
        ) : null}
      </div>
    </Layout>
  );
};

export default ReportPage;
