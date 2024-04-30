import React, { useEffect, useRef, useState } from "react";
import styles from "./ActLowInfo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Layout } from "../../../../../../../../components";
import chevron from "./../../../../../../../../assets/icons/chevron.svg";
import QRCode from "react-qr-code";
import userInfo from "../../../../../../../../utils/userInfo";
import { useNavigate } from "react-router-dom";
import {
  getActCommission2,
  getActMocData,
  SignActMoc2,
} from "../../../../../../../../service/ActService";
import {
  setActCommissions,
  setActMocById,
  setPatchActOsn,
} from "../../../../../../../../store/slices/ActSlice";
import Notification from "../../../../../../../../utils/Notifications";
import { useReactToPrint } from "react-to-print";
const ActLowInfo = () => {
  const [data, setData] = useState([]);
  const [labelCom, setLabelCom] = useState([]);
  const [chairmanName, setChairmanName] = useState("");
  const [statusAct, setStatusAct] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [zakluchenie, setZakluchenie] = useState('');

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();

  const user = userInfo();
  const { id } = useParams();
  const navigate = useNavigate();



  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id, commissions, first_name, surname, last_name) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);

    setLabelCom(commissions);
    setChairmanName(`${surname} ${first_name} ${last_name}`);
    setOpen(!isOpen);
    setVisible(!isVisible);
  };

  const getData = async () => {
    try {
      let response = await getActMocData(id, data);

      dispatch(
        setActMocById({
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

  const setCommission = async ({ SignActMoc }) => {
    let newStatement = { ...SignActMoc, commitee: labelCom };

    let response = await SignActMoc2(id, newStatement);

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

  const SignActMoc = async ({ SignActMoc }) => {
    let newStatement = { ...SignActMoc };

    let response = await SignActMoc2(id, newStatement);

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

  const SignActMocChairman = async ({ SignActMoc }) => {
    if(zakluchenie === ''){
      setNotify({
        isOpen: true,
        message: "Вы не написали заключение коммиссии",
        type: "warning",     sound: 'warning'
      });
    }else {
    let newStatement = { ...SignActMoc, zakluchenie: zakluchenie  };

    let response = await SignActMoc2(id, newStatement);

    dispatch(setPatchActOsn(response.data));
    setNotify({
      isOpen: true,
      message: "Вы подписались",
       type: "success", sound : "success"
    });
    setTimeout(() => {
      navigate(`/alerts/${user.userId}`);
    }, 1000);
  }
  };

  const cancelActMocChairman = async ({ SignActMoc }) => {
    let application = { ...SignActMoc.applications };
    application.status = "Отказано";
    let newStatement = {
      ...SignActMoc,
      applications: application,
      zakluchenie: zakluchenie,
    };
    let response = await SignActMoc2(id, newStatement);

    dispatch(setPatchActOsn(response.data));
    setNotify({
      isOpen: true,
      message: "Успешно отказано",
       type: "success", sound : "success"
    });
    setTimeout(() => {
      navigate(`/alerts/${user.userId}`);
    }, 1000);
  };

  const cancelSignActMoc = async ({ SignActMoc }) => {
    let application = { ...SignActMoc.applications };
    application.status = "Отказано";
    let newStatement = { ...SignActMoc, applications: application };
    let response = await SignActMoc2(id, newStatement);

    dispatch(setPatchActOsn(response.data));
    setNotify({
      isOpen: true,
      message: "Вы отказали",
       type: "success", sound : "success"
    });
    setTimeout(() => {
      navigate(`/alerts/${user.userId}`);
    }, 1000);
  };

  const singleActMoc = useSelector((state) => state.act.actosnId);
  const items = useSelector((state) => state.act.commissions);

  const top =
    singleActMoc.spisanie === undefined
      ? []
      : singleActMoc.spisanie.filter((item) => item.ed_izm === null);
  const bot =
    singleActMoc.spisanie === undefined
      ? []
      : singleActMoc.spisanie.filter((item) => item.ed_izm != null);


      
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content:() => componentRef.current,
    documentTitle: `Акт № (${singleActMoc.act_num})`,
  })

  
  return (
    <Layout>
      <div className={styles.act_wrapper}>
        <div ref={componentRef}>
        <div className={styles.act_heading}>
          <div className={styles.top_right_heading}>
            <div className={styles.input_type3}>
              Дата утверждения {singleActMoc.date_utver}
            </div>
          </div>
          <div className={styles.column}>
            <div className={styles.wrapper_center}>
              <div className={styles.title__requir}>
                Акт № {singleActMoc.act_num}
              </div>
            </div>
            <div className={styles.wrapper_center}>
              <div>О списании малоценных предметов Форма №443 по ОКУД</div>
            </div>
          </div>
        </div>
        <div className={styles.act_body}>
          <div className={styles.act_body_section1}>
            <div className={styles.act_between}>
              <div className={styles.act_gap_20}>
                <div className={styles.input_type3}>
                  Дата {' '}{singleActMoc.date_act}
                </div>
                <div className={styles.input_type3}>
                  Учреждения(центральной бухгалтерии){' '}
                  {singleActMoc.uchrejdenie}
                </div>
                <div className={styles.input_type3}>
                  Структурное подразделение{' '}
                  {singleActMoc.struct_podrazdelenie}
                </div>
                <div className={styles.input_type3}>
                  Материально ответственное лицо{' '}
                  {singleActMoc.mat_otv}
                </div>
              </div>
              <div className={styles.wrapper_end}>
                <table className={styles.sup__table}>
                  <thead>
                    <tr>
                      <th>Код операции</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>504143</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className={styles.act_body_section2}>
            <div className={styles.input_type3}>
              Комиссия{' '}
              {singleActMoc.komis}
            </div>
            <div className={styles.input_type3}>
              Назначенная приказом (распоряжением) от{' '}
              {singleActMoc.date_naznach}{' '}№ {singleActMoc.naznach_num}{' '}
              произвела проверку состояния пришедших в негодность малоценных
              предметов в{' '}{singleActMoc.mesto}{' '} и установила , что не поддаются
              ремонту и не могу быть использованы или переданы другим
              организациям наименовенные ниже ценности, подлежащие списанию и
              исключению из учета:
            </div>
          </div>

          <div className={styles.act_body_section3}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Наименования и описание(марка сорт и т.д.)</th>
                  <th>Количество лет в эксплуатации</th>
                  <th>Код аналитического учета</th>
                  <th>Количество предметов</th>
                  <th>Цена , сом</th>
                  <th>Сумма, сом </th>
                  <th>Примечания к списанию</th>
                </tr>
              </thead>

              <tbody>
                {top === undefined
                  ? []
                  : [...top].map((item) => {
                      return (
                        <tr>
                          <td>{item.name_spisanie}</td>
                          <td>{item.let_expl}</td>
                          <td>{item.kod_ucheta}</td>
                          <td>{item.counts}</td>
                          <td>{item.cena}</td>
                          <td>{item.summa}</td>
                          <td>{item.prichina}</td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>

          <div className={styles.act_body_section4}>
            <div className={styles.act_gap_20}>
              Итог:
              <div className={styles.input_type3}>
                Всего по настоящему акту списано : {' '}
                {singleActMoc.date_expl}
              </div>
              <div className={styles.input_type3}>
                Предметов на общую сумму : {' '}
                {singleActMoc.summa}
              </div>
              <div className={styles.input_type3}>
                Перечислено в настоящем акте имущество принял на ответственное
                хранение : {' '} 
                {singleActMoc.date_hraneniya}{' '}№{singleActMoc.name_pokaz}
              </div>
              В результате списания получены следующие материалы, которые
              подлежат оприходованию в учете и сдаче на склад(кладовую) для
              дальнейшего использования:
              <div className={styles.input_type3}>
                Назначенная приказом(распоряжением) от{' '}
                {singleActMoc.date_izgotov}{' '}№{singleActMoc.debet}
              </div>
              <div className={styles.input_type3}>
                Произвела проверку состояния пришедших в негодность малоценных
                предметов в{' '}{singleActMoc.osnovanie}{' '}и установила, что не
                поддаются ремонту и не могут быть использованны и переданы
                другим организациям наименованные ниже ценности,подлежащие
                списанию и исключению из учета:
              </div>
              <div className={styles.act_body_section3}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Наименования и описание(марка сорт и т.д.)</th>
                      <th>Единица измерения по ОКЕИ</th>
                      <th>Код аналитического учета</th>
                      <th>Количество предметов</th>
                      <th>Цена , сом</th>
                      <th>Сумма, сом </th>
                      <th>Примечания к списанию</th>
                    </tr>
                  </thead>

                  <tbody>
                    {bot === undefined
                      ? []
                      : [...bot].map((item) => {
                          return (
                            <tr>
                              <td>{item.name_spisanie}</td>
                              <td>{item.ed_izm}</td>
                              <td>{item.kod_ucheta}</td>
                              <td>{item.counts}</td>
                              <td>{item.cena}</td>
                              <td>{item.summa}</td>
                              <td>{item.prichina}</td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.act_body_section5}>
              <div className={styles.input_type3}>
                Всего:{' '}
                {singleActMoc.summa_propis}
              </div>
              <div className={styles.input_type3}>
                Перечисленные в настоящем акте материалы на сумму{' '}
                {singleActMoc.credit}{' '}
                сом{' '}
                {singleActMoc.rasporyaditel}{' '}
                принял на хранение
              </div>
              <div className={styles.input_type3}>
                <h2>Заключение Комиссии: {singleActMoc.zakluchenie}</h2>
              </div>
            </div>
          </div>
       

        <div className={styles.all_checks}>
        {singleActMoc.prorectorcheck_act === null ? (
            ""
          ) : singleActMoc.prorectorcheck_act === undefined ? (
            ""
          ) : (
            <div className={styles.prorector_check}>
              {singleActMoc.prorectorcheck_act.includes("Отказано") ? (
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
                  value={singleActMoc.prorectorcheck_act}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          )}

          {singleActMoc.chairman === null ? (
            ""
          ) : singleActMoc.chairman === undefined ? (
            ""
          ) : (
            <div className={styles.prorector_check}>
              {singleActMoc.chairman.includes("Отказано") ? (
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
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={singleActMoc.chairman}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          )}
          {singleActMoc.member1 === null ? (
            ""
          ) : singleActMoc.member1 === undefined ? (
            ""
          ) : (
            <div className={styles.prorector_check}>
              {singleActMoc.member1.includes("Отказано") ? (
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
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={singleActMoc.member1}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          )}
          {singleActMoc.member2 === null ? (
            ""
          ) : singleActMoc.member2 === undefined ? (
            ""
          ) : (
            <div className={styles.prorector_check}>
              {singleActMoc.member2.includes("Отказано") ? (
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
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={singleActMoc.member2}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          )}
          {singleActMoc.member3 === null ? (
            ""
          ) : singleActMoc.member3 === undefined ? (
            ""
          ) : (
            <div className={styles.prorector_check}>
              {singleActMoc.member3.includes("Отказано") ? (
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
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={singleActMoc.member3}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          )}
          {singleActMoc.member4 === null ? (
            ""
          ) : singleActMoc.member4 === undefined ? (
            ""
          ) : (
            <div className={styles.prorector_check}>
              {singleActMoc.member4.includes("Отказано") ? (
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
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={singleActMoc.member4}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          )}
          {singleActMoc.member5 === null ? (
            ""
          ) : singleActMoc.member5 === undefined ? (
            ""
          ) : (
            <div className={styles.prorector_check}>
              {singleActMoc.member5.includes("Отказано") ? (
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
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={singleActMoc.member5}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          )}
          {singleActMoc.member6 === null ? (
            ""
          ) : singleActMoc.member6 === undefined ? (
            ""
          ) : (
            <div className={styles.prorector_check}>
              {singleActMoc.member6.includes("Отказано") ? (
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
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={singleActMoc.member6}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          )}
          {singleActMoc.member7 === null ? (
            ""
          ) : singleActMoc.member7 === undefined ? (
            ""
          ) : (
            <div className={styles.prorector_check}>
              {singleActMoc.member7.includes("Отказано") ? (
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
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={singleActMoc.member7}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </div>
          )}
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
                      className={`fa fa-chevron-right icon ${isOpen && "open"}`}
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
              <Button className={styles.btn1} onClick={() => navigate(-1)}>
                Назад
              </Button>
              <Button
                className={styles.btn1}
                onClick={() => {
                  setCommission({ SignActMoc: singleActMoc });
                }}
              >
                Назначить комисию
              </Button>
            </div>
          ) : user.userId === 7 && statusAct === "В процессе подтверждения" ? (
            <Button
              className={styles.btn1}
              onClick={() => {
                SignActMoc({ SignActMoc: singleActMoc });
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
                  SignActMoc({ SignActMoc: singleActMoc });
                }}
              >
                Подписать
              </Button>{" "}
              <Button
                className={styles.btn3}
                onClick={() => {
                  cancelSignActMoc({ SignActMoc: singleActMoc });
                }}
              >
                Отказать
              </Button>{" "}
            </div>
          ) : user.employeeId === singleActMoc.chairman_id &&
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
                  cancelSignActMoc({ SignActMoc: singleActMoc });
                }}
              >
                Отказать
              </Button>
            </div>
          ) : user.employeeId === singleActMoc.chairman_id &&
            statusAct === "В ожидании заключения председателя" ? (
            <div>
              <div className={styles.footer_padding}>
                <div className={styles.input_type3}>
                  Заключение Комиссии
                  <input
                    onChange={(e) => setZakluchenie(e.target.value)}
                    className={styles.discription_input}
                  />
                </div>
              </div>
              <div className={styles.footer_acc}>
                <div>
                  <Button className={styles.btn1} onClick={() => navigate(-1)}>
                    Назад
                  </Button>
                </div>
                <div>
                  <Button
                    className={styles.btn1}
                    onClick={() => {
                      SignActMocChairman({ SignActMoc: singleActMoc });
                    }}
                  >
                    Подписать
                  </Button>{" "}
                  <Button
                    className={styles.btn3}
                    onClick={() => {
                      cancelActMocChairman({ SignActMoc: singleActMoc });
                    }}
                  >
                    Отказать
                  </Button>{" "}
                </div>
              </div>
            </div>
          ) : user.userId === 163 && statusAct === "Завершена" ? (
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
                  SignActMoc({ SignActMoc: singleActMoc });
                }}
              >
                Подписать
              </Button>{" "}
              <Button
                className={styles.btn3}
                onClick={() => {
                  cancelSignActMoc({ SignActMoc: singleActMoc });
                }}
              >
                Отказать
              </Button>{" "}
            </div>
          )}
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  );
};

export default ActLowInfo;
