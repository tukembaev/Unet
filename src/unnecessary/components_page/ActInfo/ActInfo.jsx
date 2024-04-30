import React, { useEffect, useRef, useState } from "react";
import styles from "./ActInfo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getActCommission2,
  getActOsnData,
  SignActOsn,
} from "../../../../../../../service/ActService";
import {
  setActCommissions,
  setActOsnById,
  setPatchActMoc,
  setPatchActOsn,
} from "../../../../../../../store/slices/ActSlice";
import { useParams } from "react-router-dom";
import { Button, Layout } from "../../../../../../../components";
import chevron from "./../../../../../../../assets/icons/chevron.svg";
import userInfo from "../../../../../../../utils/userInfo";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import Notification from "../../../../../../../utils/Notifications";
import { useReactToPrint } from "react-to-print";
const ActInfo = () => {
  const [data] = useState([]);
  const [labelCom, setLabelCom] = useState([]);
  const [chairmanName, setChairmanName] = useState("");
  const [statusAct, setStatusAct] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const dispatch = useDispatch();
  const { id } = useParams();
  const user = userInfo();
  const navigate = useNavigate();


  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id, commissions, first_name, surname, last_name) => {
    selectedItem === id ? setSelectedItem(null) : setSelectedItem(id);

    setLabelCom(commissions);
    setChairmanName(`${surname} ${first_name} ${last_name}`);
    setOpen(!isOpen);
    setVisible(!isVisible);
  };

  const getData = async () => {
    try {
      let response = await getActOsnData(id, data);

      dispatch(
        setActOsnById({
          actosnId: response.data,
        })
      );

      setStatusAct(response.data.applications.status);
    } catch (error) {
      
    }
  };

  const getCommissions = async () => {
    try {
      let response = await getActCommission2(data);

      dispatch(
        setActCommissions({
          commissions: response.data,
        })
      );
    } catch (error) {
      
    }
  };
  useEffect(() => {
    getData();
    getCommissions();
  }, []);

  const setCommission = async ({ singleActOsn }) => {
    let newStatement = { ...singleActOsn, commitee: labelCom };

    let response = await SignActOsn(id, newStatement);

    dispatch(setPatchActOsn(response.data));
    setNotify({
      isOpen: true,
      message: "Комиссия назначена",
       type: "success", sound : "success"
    });
    setTimeout(() => {
      navigate(`/alerts/${user.userId}`);
    }, 1000);
  };

  const signActOsn = async ({ singleActOsn }) => {
    let newStatement = { ...singleActOsn };

    let response = await SignActOsn(id, newStatement);

    dispatch(setPatchActOsn(response.data));
    setNotify({
      isOpen: true,
      message: "Вы подписались",
       type: "success", sound : "success"
    });
    setTimeout(() => {
      navigate(`/alerts/${user.userId}`);
    }, 1000);


  };

  const cancelSignActOsn = async (singleActOsn) => {
    let application = { ...singleActOsn.applications };

    application.status = "Отказано";
    let newStatement = { ...singleActOsn, applications: application };

    let response = await SignActOsn(id, newStatement);

    dispatch(setPatchActMoc(response.data));
    setNotify({
      isOpen: true,
      message: "Вы отказали",
       type: "success", sound : "success"
    });
    setTimeout(() => {
      navigate(`/alerts/${user.userId}`);
    }, 1000);
  };

  const singleActOsn = useSelector((state) => state.act.actosnId);
  const items = useSelector((state) => state.act.commissions);

  
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content:() => componentRef.current,
    documentTitle: `Акт № (${singleActOsn.act_num})`,
  })

  return (
    <Layout>
 
      <div className={styles.act_wrapper}>
       <div ref={componentRef}>
        <div className={styles.act_heading}>
          <div className={styles.column}>
            
            <div className={styles.wrapper_center}>
              <div className={styles.title__requir}>
                Акт №  {singleActOsn.act_num}
              </div>
            </div>
            <div className={styles.wrapper_center}>
              <div>
                О списании основных средств в бюджетных учреждениях Форма ОС-4
                бюдж. по ОКУД
              </div>
            </div>
            <div className={styles.title__requir2}>
              От  {singleActOsn.date_act}
            </div>
          </div>
        </div>
        <div className={styles.act_body}>
          <div className={styles.act_body_section1}>
            <div className={styles.act_between}>
              <div className={styles.act_gap_20}>
                <div className={styles.input_type3}>
                  Учреждение(централизованная бухгалтерия): {" "}
                  {singleActOsn.uchrejdenie}  по ОКПО
                </div>
                <div className={styles.input_type3}>
                  Структурное подразделение:  {singleActOsn.struct_podrazdelenie}
                  по КСП
                </div>
                <div className={styles.input_type3}>
                  Наименование средства: {singleActOsn.name_sredstva}
                  по ОКОФ
                </div>
                <div className={styles.input_type3}>
                  Материально ответственное лицо: {singleActOsn.mat_otv}
                </div>
              </div>
              <div className={styles.wrapper_end}>
                <table className={styles.sup__table}>
                  <thead>
                    <tr>
                      <th>Коды</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>504104</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className={styles.act_body_section2}>
            <div className={styles.act_between}>
              <table className={styles.sup__table}>
                <thead>
                  <th>Заводской номер</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{singleActOsn.zavod_num}</td>
                  </tr>
                </tbody>
              </table>

              <table className={styles.sup__table}>
                <thead>
                  <th>Инвентарный номер</th>
                </thead>
                <tbody>
                  <tr>
                    <td>{singleActOsn.invent_num}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.act_body_section3}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Наименование показателя</th>
                  <th>Дебет (Корреспондирущие счета)</th>
                  <th>Кредит (Корреспондирущие счета)</th>
                  <th>Сумма(сом)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{singleActOsn.name_pokaz}</td>
                  <td>{singleActOsn.debet}</td>
                  <td>{singleActOsn.credit}</td>
                  <td>{singleActOsn.summa}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.act_body_section4}>
            <div className={styles.act_gap_20}>
              <div className={styles.input_type3}>
                Комиссия: {singleActOsn.komis}
              </div>
              <div className={styles.input_type3}>
                Назначение приказом(распоряжением): {singleActOsn.rasporyaditel}
              </div>

              <div className={styles.wrapper_center}>
                <div className={styles.input_type3}>
                  Дата: {singleActOsn.date_naznach} №:{singleActOsn.naznach_num}{" "}
                  На основании: {singleActOsn.osnovanie}
                </div>
              </div>

              <div className={styles.input_type3}>
                Осмотрела: {singleActOsn.name_obj} и нашла его подлежащим
                списанию (разборке) по следующим причинам:
              </div>
              <div className={styles.input_type3}>
                1.Год изготовления или постройки: {singleActOsn.date_izgotov}г
              </div>
              <div className={styles.input_type3}>
                2.Дата поступления в учреждение:{" "}
                {singleActOsn.date_postupleniya}г
              </div>
              <div className={styles.input_type3}>
                3.Дата ввода в эксплуатацию : {singleActOsn.date_expl}г
              </div>
              <div className={styles.input_type3}>
                4.Количество капитальных ремонтов: {singleActOsn.remont_count}{" "}
                на сумму : {singleActOsn.summa_remontov} сом
              </div>
            </div>
          </div>
          <div className={styles.act_body_section5}>
            <div className={styles.input_type3}>
              5. Сведения о содержании драгоценных материалов (металлов, камней,
              и т.п )
            </div>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Наименование драгоценных металлов</th>
                  <th>Код аналитического учета</th>
                  <th>Наименование (единица измерения)</th>
                  <th>Код по ОКЕИ (единица измерения)</th>
                  <th>Количество (масса)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{singleActOsn.name_metall_1}</td>
                  <td>{singleActOsn.kod_ucheta_1}</td>
                  <td>{singleActOsn.ed_izm_1}</td>
                  <td>{singleActOsn.code_okei_1}</td>
                  <td>{singleActOsn.massa_1}</td>
                </tr>
                {singleActOsn.name_metall_2 != null ||
                singleActOsn.kod_ucheta_2 != null ||
                singleActOsn.ed_izm_2 != null ||
                singleActOsn.code_okei_2 != null ||
                singleActOsn.massa_2 != null ? (
                  <tr>
                    <td>{singleActOsn.name_metall_2}</td>
                    <td>{singleActOsn.kod_ucheta_2}</td>
                    <td>{singleActOsn.ed_izm_2}</td>
                    <td>{singleActOsn.code_okei_2}</td>
                    <td>{singleActOsn.massa_2}</td>
                  </tr>
                ) : (
                  ""
                )}

                {singleActOsn.name_metall_3 != null ||
                singleActOsn.kod_ucheta_3 != null ||
                singleActOsn.ed_izm_3 != null ||
                singleActOsn.code_okei_3 != null ||
                singleActOsn.massa_3 != null ? (
                  <tr>
                    <td>{singleActOsn.name_metall_3}</td>
                    <td>{singleActOsn.kod_ucheta_3}</td>
                    <td>{singleActOsn.ed_izm_3}</td>
                    <td>{singleActOsn.code_okei_3}</td>
                    <td>{singleActOsn.massa_3}</td>
                  </tr>
                ) : (
                  ""
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.act_body_section6}>
            <div className={styles.input_type3}>
              6. Техническое состояние и причины списания:{" "}
              {singleActOsn.zakluchenie}
            </div>
          </div>
          <div className={styles.act_body_section7}>
            <h2>Подписи комиссии </h2>
            <h3>{singleActOsn.commitee}</h3>
            <div className={styles.all_checks}>
            {singleActOsn.prorectorcheck_act === null ? (
            ""
          ) : singleActOsn.prorectorcheck_act === undefined ? (
            ""
          ) : (
            <div className={styles.prorector_check}>
              {singleActOsn.prorectorcheck_act.includes("Отказано") ? (
                <p className={styles.text_sign}>
                  Подпись проректора : <br />
                  Отказано{" "}
                </p>
              ) : (
                <p>
                  Подпись проректора : <br /> <br />{" "}
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
                  value={singleActOsn.prorectorcheck_act}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          )}

              {singleActOsn.chairman === null ? (
                ""
              ) : singleActOsn.chairman === undefined ? (
                ""
              ) : (
                <div className={styles.prorector_check}>
                  {singleActOsn.chairman.includes("Отказано") ? (
                    <p className={styles.text_sign}>
                      Подпись председателя комиссии : <br />
                      Отказано{" "}
                    </p>
                  ) : (
                    <p>
                      Подпись председателя комиссии : <br /> <br />{" "}
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
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={singleActOsn.chairman}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              )}
              {singleActOsn.member1 === null ? (
                ""
              ) : singleActOsn.member1 === undefined ? (
                ""
              ) : (
                <div className={styles.prorector_check}>
                  {singleActOsn.member1.includes("Отказано") ? (
                    <p className={styles.text_sign}>
                      Подпись участника № 1 : <br />
                      Отказано{" "}
                    </p>
                  ) : (
                    <p>
                      Подпись участника № 1 : <br /> <br />{" "}
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
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={singleActOsn.member1}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              )}
              {singleActOsn.member2 === null ? (
                ""
              ) : singleActOsn.member2 === undefined ? (
                ""
              ) : (
                <div className={styles.prorector_check}>
                  {singleActOsn.member2.includes("Отказано") ? (
                    <p className={styles.text_sign}>
                      Подпись участника № 2 : <br />
                      Отказано{" "}
                    </p>
                  ) : (
                    <p>
                      Подпись участника № 2 : <br /> <br />{" "}
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
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={singleActOsn.member2}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              )}
              {singleActOsn.member3 === null ? (
                ""
              ) : singleActOsn.member3 === undefined ? (
                ""
              ) : (
                <div className={styles.prorector_check}>
                  {singleActOsn.member3.includes("Отказано") ? (
                    <p className={styles.text_sign}>
                      Подпись участника № 3 : <br />
                      Отказано{" "}
                    </p>
                  ) : (
                    <p>
                      Подпись участника № 3 : <br /> <br />{" "}
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
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={singleActOsn.member3}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              )}
              {singleActOsn.member4 === null ? (
                ""
              ) : singleActOsn.member4 === undefined ? (
                ""
              ) : (
                <div className={styles.prorector_check}>
                  {singleActOsn.member4.includes("Отказано") ? (
                    <p className={styles.text_sign}>
                      Подпись участника № 4 : <br />
                      Отказано{" "}
                    </p>
                  ) : (
                    <p>
                      Подпись участника № 4 : <br /> <br />{" "}
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
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={singleActOsn.member4}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              )}
              {singleActOsn.member5 === null ? (
                ""
              ) : singleActOsn.member5 === undefined ? (
                ""
              ) : (
                <div className={styles.prorector_check}>
                  {singleActOsn.member5.includes("Отказано") ? (
                    <p className={styles.text_sign}>
                      Подпись участника № 5 : <br />
                      Отказано{" "}
                    </p>
                  ) : (
                    <p>
                      Подпись участника № 5 : <br /> <br />{" "}
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
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={singleActOsn.member5}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              )}
              {singleActOsn.member6 === null ? (
                ""
              ) : singleActOsn.member6 === undefined ? (
                ""
              ) : (
                <div className={styles.prorector_check}>
                  {singleActOsn.member6.includes("Отказано") ? (
                    <p className={styles.text_sign}>
                      Подпись участника № 6 : <br />
                      Отказано{" "}
                    </p>
                  ) : (
                    <p>
                      Подпись участника № 6 : <br /> <br />{" "}
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
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={singleActOsn.member6}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              )}
              {singleActOsn.member7 === null ? (
                ""
              ) : singleActOsn.member7 === undefined ? (
                ""
              ) : (
                <div className={styles.prorector_check}>
                  {singleActOsn.member7.includes("Отказано") ? (
                    <p className={styles.text_sign}>
                      Подпись участника № 7 : <br />
                      Отказано{" "}
                    </p>
                  ) : (
                    <p>
                      Подпись участника № 7 : <br /> <br />{" "}
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
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                      }}
                      value={singleActOsn.member7}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          </div>
          </div>
          <div className={styles.footer}>
            {user.userId === 163 && statusAct === "В процессе выполнения" ? (
              <div className={styles.forAccountant}>
                <div>
                  <h3 className={styles.zav}>
                    Председатель комиссией: <span>{chairmanName}</span>
                  </h3>

                  <div className={styles.dropdown}>
                    <div
                      className={styles.dropdown_header}
                      onClick={toggleDropdown}
                    >
                      {selectedItem
                        ? items.find((item) => item.id == selectedItem)
                            .commissions
                        : "Список комиссии  "}
                      <img
                        src={chevron}
                        className={`fa fa-chevron-right icon ${
                          isOpen && "open"
                        }`}
                      ></img>
                    </div>
                    <div className={`dropdown-body ${isOpen && "open"}`}>
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="dropdown-item"
                          onClick={(e) =>
                            handleItemClick(
                              e.target.id,
                              item.commissions,
                              item.chairman.first_name,
                              item.chairman.surname,
                              item.chairman.last_name
                            )
                          }
                          id={item.id}
                        >
                          <span
                            className={`dropdown-item-dot  ${
                              item.id == selectedItem && "selected"
                            }`}
                          >
                            {" "}
                          </span>
                          {item.commissions}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  className={styles.btn1}
                  onClick={() => {
                    setCommission({ singleActOsn });
                  }}
                >
                  Назначить комисию
                </Button>
              </div>
            ) : user.userId === 7 &&
              statusAct === "В процессе подтверждения" ? (
              <Button
                className={styles.btn1}
                onClick={() => {
                  signActOsn({ singleActOsn });
                }}
              >
                {" "}
                Подтвердить{" "}
              </Button>
            ) : user.userId === 163 &&
              statusAct === "На рассмотрении комиссии" ? (
              <div className={styles.footer_acc}>
                <Button
                  className={styles.btn1}
                  onClick={() => {
                    signActOsn({ singleActOsn });
                  }}
                >
                  Подписать
                </Button>{" "}
                <Button
                  className={styles.btn3}
                  onClick={() => {
                    cancelSignActOsn(singleActOsn);
                  }}
                >
                  Отказать
                </Button>{" "}
              </div>
            ) : user.employeeId === singleActOsn.chairman_id &&
              statusAct === "На рассмотрении комиссии" ? (
              <div className={styles.footer_acc}>
                <Button className={styles.btn1} onClick={() => navigate(-1)}>
                  Назад
                </Button>

                <Button disabled="true" className={styles.btn3}>
                  {" "}
                  Подписали не все члены комиссии{" "}
                </Button>
                <Button
                  className={styles.btn3}
                  onClick={() => {
                    cancelSignActOsn(singleActOsn);
                  }}
                >
                  Отказать
                </Button>
              </div>
            ) : user.employeeId === singleActOsn.chairman_id &&
              statusAct === "В ожидании заключения председателя" ? (
              <div className={styles.footer_acc}>
                <Button
                  className={styles.btn1}
                  onClick={() => {
                    signActOsn({ singleActOsn });
                  }}
                >
                  Подписать
                </Button>{" "}
                <Button
                  className={styles.btn3}
                  onClick={() => {
                    cancelSignActOsn(singleActOsn);
                  }}
                >
                  Отказать
                </Button>{" "}
              </div>
            ) : user.userId === 163 && (statusAct === "Завершена" || statusAct === "Отказано")  ? (
              <div className={styles.footer_acc}>
               <Button className={styles.btn1} onClick={() => navigate(-1)}>
                Назад
              </Button>
              <Button className={styles.btn2} onClick={handlePrint}> Распечатать PDF</Button>
            </div>

            ) : user.userId === 7 || user.is_mol_of === true ? (
              <div className={styles.footer_acc}>
              <Button className={styles.btn1} onClick={() => navigate(-1)}>
                Назад
              </Button>
              <Button className={styles.btn1} onClick={handlePrint}> Распечатать PDF</Button>
              </div>
            ) : statusAct === "Отказано" ? (
              <div className={styles.footer_acc}>
              <Button className={styles.btn1} onClick={() => navigate(-1)}>
                Назад
              </Button>
              <Button className={styles.btn1} onClick={handlePrint}> Распечатать PDF</Button>
              </div>
            ) : (
              <div className={styles.footer_acc}>
                <Button
                  className={styles.btn1}
                  onClick={() => {
                    signActOsn({ singleActOsn });
                  }}
                >
                  Подписать
                </Button>{" "}
                <Button
                  className={styles.btn3}
                  onClick={() => {
                    cancelSignActOsn(singleActOsn);
                  }}
                >
                  Отказать
                </Button>{" "}
              </div>
            )}
          </div>
       
        <Notification notify={notify} setNotify={setNotify} />
      </div>
    </Layout>
  );
};

export default ActInfo;
