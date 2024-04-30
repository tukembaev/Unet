import React, { useState } from "react";
import { Table, Layout } from "../../components/index";
import styles from "./QrcodePage.module.scss";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";
import Button from "../../components/Button/Button";
import QrForm from "../../components/Forms/QrForm/QrForm";

function QrcodePage() {
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const headList = ["Корпус", "Номер аудитории", "Название аудитории"];

  const bodyList = [
    {
      campus: "1",
      numberAudi: "151",
      nameAudi: "Ауд. для лабораторных работ",
    },
  ];

  return (
    <Layout>
      <div className={styles.qr__wrapper}>
        <div className={styles.qr_header}>
          <h2 className={styles.title}>Кампус Раззакова</h2>
          <div>
            <SlidingPane
              className={styles.some_custom_class2}
              overlayClassName={styles.some_custom_overlay_class2}
              isOpen={state.isPaneOpen}
              title="Новый рапорт"
              onRequestClose={() => {
                setState({ isPaneOpen: false });
              }}
            >
              <QrForm />
            </SlidingPane>
            <Button
              className="create__statement__btn"
              onClick={() => setState({ isPaneOpen: true })}
            >
              Создать рапорт
            </Button>
          </div>
        </div>
        <Table head={headList} listItem={bodyList} />
      </div>
    </Layout>
  );
}

export default QrcodePage;
