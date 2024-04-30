import React, { useRef, useState } from "react";
import styles from "./RequirmentInfo.module.scss";
import cx from "classnames";
import { useNavigate } from "react-router-dom";
import Button from "./../../../../../../../components/Button/Button";
import "react-sliding-pane/dist/react-sliding-pane.css";
import SlidingPane from "react-sliding-pane";
import TaskForm from "./../../../../../../../components/Forms/TaskForm/TaskForm";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SingSendReqToZav } from "../../../../../../../service/StatementsService";
import { setSignSendReqToZavhoz } from "../../../../../../../store/slices/StatementsSlice";
import Notification from "../../../../../../../utils/Notifications";
import userInfo from "../../../../../../../utils/userInfo";

const RequirmentInfo = ({ info, employeeinfo , setRender }) => {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const reqinfo = info.purchaselist[0];
  const plp = reqinfo.purchaselistproducts;
  const user = userInfo();

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Требования, (${info.number})`,
  });

  const handleSubmit = async ({ info }) => {
    let newStatement = {
      employee: info.employee,
      type: info.type,
      status: "Завершена",
    };
    setNotify({
      isOpen: true,
      message: "Получение успешно подтверждено",
       type: "success", sound : "success"
    });
    setTimeout(() => {
      navigate(`/statements/${user.userId}`);
    }, 1000);
    let response = await SingSendReqToZav(id, newStatement);

    dispatch(setSignSendReqToZavhoz(response.data));
  };

  return (
    <div className={styles.requirment_info_wrapper}>
      <div ref={componentRef} className={styles.pdf}>
        <div className={styles.requirment__title}>Список на приобретение</div>
        <h3>Статус:{info.status}</h3>
        <div>
          <div className={styles.m_20}>
            <div className={cx(styles.wrapper_between)}>
              <div>{reqinfo.company_organization}</div>
              <div>Типовая межуведомственная форма М-11</div>
            </div>
            <div className={styles.wrapper_between}>
              <div>Предприятие организации</div>
              <div>
                Код по ОКУД{" "}
                <input readOnly value="0303008" className={styles.okd} />
              </div>
            </div>
          </div>
          <div className={styles.wrapper_center}>
            <div className={styles.title__requir}>
              Требования № {reqinfo.uniq_codes}
            </div>
          </div>
          <div className={styles.wrapper_center}>
            <div>{reqinfo.data_today}</div>
          </div>

          <div className={styles.m_20}>
            <div className={styles.wrapper_end}>
              <table className={styles.sup__table}>
                <thead>
                  <tr>
                    <th>Вид операции</th>
                    <th>Склад</th>
                    <th>Цех-отдел, обьект-получатель</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{reqinfo.views_operations}</td>
                    <td>{reqinfo.warehouse}</td>
                    <td>{reqinfo.department}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.wrapper_center}>
            <div>
              Через кого:{" "}
              <span>
                {employeeinfo.surname} {employeeinfo.first_name}{" "}
                {employeeinfo.last_name}
              </span>
            </div>
          </div>
          <div className={cx(styles.wrapper_between, styles.m_20)}>
            <div>Затребовал: {reqinfo.requestedmen}</div>
            {info.prorectorcheck != null && info.status === "Отказано" ? (
              <div>Отказал: Асиев А.Т.</div>
            ) : info.prorectorcheck != null ? (
              <div>Разрешил: Асиев А.Т </div>
            ) : (
              ""
            )}
          </div>
          {info.status === "Отказано" && info.prich_pr_otkaz != null ? (
            <div className={styles.simple_raports_info_heading}>
              <h2>Причина отказа: {info.prich_pr_otkaz} </h2>
            </div>
          ) : (
            ""
          )}
        </div>
        <div>
          <table className={styles.requirment__table}>
            <thead>
              <tr>
                <th colSpan={2}>Корреспондирущий счет</th>
                <th colSpan={2}>Материальные ценности</th>
                <th colSpan={2}>Единица измерения</th>
                <th colSpan={2}>Количество</th>
                <th rowSpan={2}>Цена</th>
                <th rowSpan={2}>Сумма</th>
                <th rowSpan={2}>
                  Порядковый номер записи по складской картотеке
                </th>
                <th className={styles.del} rowSpan={2} colSpan={2}></th>
              </tr>
              <tr>
                <th>Счет, суб-счет</th>
                <th>Код аналитического учета</th>
                <th>Наименование,сорт, размер, марка</th>
                <th>Код (номенклатурный номер)</th>
                <th>Код</th>
                <th>Наименование</th>
                <th>Затребовано</th>
                <th>Отпущено</th>
              </tr>
            </thead>
            <tbody>
              {plp.map((item) => {
                return (
                  <tr>
                    <td>{item.sub_account}</td>
                    <td>{item.analytical}</td>
                    <td>{item.name_grade_size_brand}</td>
                    <td>{item.nomenclature_number}</td>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.requested}</td>
                    <td>{item.released}</td>
                    <td>{item.price}</td>
                    <td>{item.ordinal}</td>
                    <td>{item.number_record_warehouse_file}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.all_checks}>
            
          {info.ispolnpodcheck === null ? (
              ""
            ) : (
              <div className={styles.ispol_check}>
                {info.ispolnpodcheck.includes("Отказано") ? (
                  <p className={styles.text_sign}>
                    Подпись заявителя: <br />
                    Отказано{" "}
                  </p>
                ) : (
                  <p>
                    Подпись заявителя: <br /> <br />{" "}
                  </p>
                )}
                <div
                  style={{
                    height: "auto",
                    maxWidth: 64,
                    margin: "0 auto",
                    width: "100%",
                  }}
                >
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={info.ispolnpodcheck}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            )}

            {info.prorectorcheck === null ? (
              ""
            ) : (
              <div className={styles.prorector_check}>
                {info.prorectorcheck.includes("Отказано") ? (
                  <p className={styles.text_sign}>
                    Подпись проректора: <br />
                    Отказано{" "}
                  </p>
                ) : (
                  <p>
                    Подпись проректора: <br /> <br />{" "}
                  </p>
                )}
                <div
                  style={{
                    height: "auto",
                    maxWidth: 64,
                    margin: "0 auto",
                    width: "100%",
                  }}
                >
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={info.prorectorcheck}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            )}
            {info.rukovpodcheck === null ? (
              ""
            ) : (
              <div className={styles.prorector_check}>
                {info.rukovpodcheck.includes("Отказано") ? (
                  <p className={styles.text_sign}>
                    Подпись заведующего склада: <br />
                    Отказано{" "}
                  </p>
                ) : (
                  <p>
                    Подпись заведующего склада: <br /> <br />{" "}
                  </p>
                )}
                <div
                  style={{
                    height: "auto",
                    maxWidth: 64,
                    margin: "0 auto",
                    width: "100%",
                  }}
                >
                  <QRCode
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={info.rukovpodcheck}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      <div className={styles.statement_footer}>
        <Button className={styles.btn1} onClick={() => navigate(-1)}>
          Вернуться
        </Button>
        {/* <SlidingPane
          className={styles.some_custom_class2}
          overlayClassName={styles.some_custom_overlay_class2}
          isOpen={state.isPaneOpen}
          title="Новый рапорт"
          onRequestClose={() => {
            setState({ isPaneOpen: false });
          }}
        >
          <TaskForm idstatement={info.id} typestatement={info.type} />
        </SlidingPane> */}
        <Button className={styles.btn2} onClick={handlePrint}>
            {" "}
            Распечатать PDF
          </Button>
          {info.status === "В процессе выполнения" && info.rukovpodcheck != null && info.employee.id === user.employeeId ?        <Button className={styles.btn2} onClick={() => {
           handleSubmit({info})
           }}>
            {" "}
            Подтвердить получение
          </Button> : ''}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default RequirmentInfo;
