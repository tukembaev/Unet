import React, { useState } from "react";
import styles from "./DocumentHistory.module.scss";
import add_member from "./../../assets/icons/add_member.png";
import bucket from "./../../assets/icons/delete.svg";

import userInfo from "../../utils/userInfo";
import ModalWindow from "../../hooks/ModalWindow/ModalWindow";
import Button from "../Button/Button";
import Notification from "../../utils/Notifications";
import { useDispatch } from "react-redux";
import AgreementCard from "./AgreementHistory/AgreementCard";
import ApprovalSelect from "./components/ApprovalSelect";
import MemberSelect from "./components/MemberSelect";
import { setSignStatement } from "../../store/slices/StatementsSlice";
import { SignRaport } from "../../service/StatementsService";
import { useParams } from "react-router-dom";
import { patchOrder, patchOrderFormData } from "../../service/OrderService";
import { setPatchedOrder } from "../../store/slices/OrderSlice";
import { AddWaterMark } from "../../hooks/PdfWaterMark/AddWaterMark";
import PinCode from "../../hooks/PinCode/PinCode";
import { ScaleLoader } from "react-spinners";

const DocumentHistory = ({ typeDoc, info }) => {
  const user = userInfo();
  const [report, setReport] = useState();

  const [userPinCode, setUserPinCode] = useState();
  const [userId, setUserId] = useState();
  const [pinOrComment,setPinOrComment] = useState(true)
  const [pinCode, setPinCode] = useState();
  const [load, setLoad] = useState(false)

  const [comment, setComment] = useState();
  const { id } = useParams();
  const [idMember, setIdMember] = useState({
    id: "",
    member: "",
    member_queue: "",
    member_choose_action: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [approvalId, setApprovalId] = useState({
    approval_name: "",
    approval_id: "",
  });
  const [memberInfo, setMemberInfo] = useState([]);
  const [memberArray, setMemberArray] = useState([]);
  const [order_count, setOrderCount] = useState(1);
  const [openModal2, setOpenModal2] = useState(false);
  const [loader, setLoader] = useState(false);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const dispatch = useDispatch();

  const AddMember = async () => {
    setLoad(true)
    memberArray.map((item) => delete item.id);

    if (typeDoc === "Рапорт") {
      let newMember = {
        addressee: info.addressee,
        status: info.status,
        agreement_comment: comment,
        applicationmember: memberArray,
      };
      let response = await SignRaport(id, newMember);

      dispatch(setSignStatement(response.data));
    }

    setOpenModal2(false);
    setNotify({
      isOpen: true,
      message: "Участники успешно добавлены",
       type: "success", sound : "success"
    });
  };

  const FinalRaportAccept = async () => {
    const updatedAppMember = [
      {
        id: idMember.id,
        member: idMember.employeeId,
        user: idMember.member,
        user_id: idMember.member,
        member_queue: idMember.member_queue,
        member_refusal: report,
        status: "Одобрено",
      },
    ];

    if (report === undefined) {
      setNotify({
        isOpen: true,
        message: " Введите причину отказа!",
        type: "error",
      });
    } else {
      if (typeDoc === "Рапорт") {
        let SignStatement = {
          addressee: info.addressee,
          status: info.status,
          applicationmember: updatedAppMember,
        };
        let response = await SignRaport(id, SignStatement);

        dispatch(setSignStatement(response.data));
      } else if (typeDoc === "Приказ") {
        try {
          setLoader(true);
          const member = info.ordermember.find((item) => item.turn === true);
          const count_turn = member ? member.member_queue : null;
          const file = info?.file;
          const name = member ? member.name : null;
          const type_approv = member ? member.name_approval : null;
          const type =
            type_approv === "Одобрить"
              ? "Одобрено"
              : type_approv === "Согласовать"
              ? "Согласовано"
              : type_approv === "Ознакомиться"
              ? "Ознакомлено"
              : type_approv === "Утвердить"
              ? "Утверждено"
              : type_approv === "Резолюция"
              ? "Принято"
              : "";

          const modifedFile = await AddWaterMark({
            name,
            type,
            count_turn,
            file,
          });

          let SignStatement = {
            addressee: info.addressee,
            status: info.status,
            ordermember: updatedAppMember,
          };
          let SignStatementFile = {
            addressee: info.addressee,
            status: info.status,
            file: modifedFile,
          };
          let response = await patchOrder(id, SignStatement);
          let response2 = await patchOrderFormData(id, SignStatementFile);

          dispatch(setPatchedOrder(response.data));
          dispatch(setPatchedOrder(response2.data));
        } catch (error) {
          console.log(error.data);
        }finally{
          setLoader(false);
        }
      }

      setNotify({
        isOpen: true,
        message: "Отчет успешно отправлен!",
         type: "success", sound : "success"
      });
      setOpenModal(false);
    }
  };

  const FinalRaportDecline = async () => {
    const updatedAppMember = [
      {
        id: idMember.id,
        member: idMember.employeeId,
        user: idMember.member,
        user_id: idMember.member,
        member_queue: idMember.member_queue,
        member_refusal: report,
        status: "Отказано",
      },
    ];

    if (report === undefined) {
      setNotify({
        isOpen: true,
        message: " Введите причину отказа!",
        type: "error",
      });
    } else {
      if (typeDoc === "Рапорт") {
        let SignStatement = {
          addressee: info.addressee,
          status: info.status,
          applicationmember: updatedAppMember,
        };
        let response = await SignRaport(id, SignStatement);

        dispatch(setSignStatement(response.data));
      } else if (typeDoc === "Приказ") {
        let SignStatement = {
          addressee: info.addressee,
          status: info.status,
          ordermember: updatedAppMember,
        };

        let response = await patchOrder(id, SignStatement);

        dispatch(setPatchedOrder(response.data));
      }


      setLoader(true);
      setTimeout(() =>{
        setLoader(false);
        setOpenModal(false);
        setNotify({
          isOpen: true,
          message: "Отчет успешно отправлен!",
           type: "success", sound : "success"
        });
      }, 1000);
    }
  };

  const RetryRaport = async () => {
    const updatedAppMember = [
      {
        id: idMember.id,
        member: idMember.employeeId,
        user: idMember.member,
        user_id: idMember.member,
        member_queue: idMember.member_queue,
        repeat_comment: report,
        status: "На рассмотрении",
        turn: true,
      },
    ];

    if (report === undefined) {
      setNotify({
        isOpen: true,
        message: " Введите причину отказа!",
        type: "error",
      });
    } else {
      if (typeDoc === "Рапорт") {
        let SignStatement = {
          addressee: info.addressee,
          status: info.status,
          applicationmember: updatedAppMember,
        };
        let response = await SignRaport(id, SignStatement);

        dispatch(setSignStatement(response.data));
      } else if (typeDoc === "Приказ") {
        let SignStatement = {
          addressee: info.addressee,
          status: info.status,
          ordermember: updatedAppMember,
        };

        let response = await patchOrder(id, SignStatement);

        dispatch(setPatchedOrder(response.data));
      }
      setNotify({
        isOpen: true,
        message: "Отчет успешно отправлен!",
         type: "success", sound : "success"
      });
      setOpenModal(false);
    }
  };

  const deleteElement = (id) => {
    // удаление объекта из массива при совпадении id
    setMemberInfo(memberInfo.filter((obj) => obj.id != id));
    setMemberArray(memberArray.filter((obj) => obj.id != id));
    setOrderCount(order_count - 1);
  };
  let sortedArray;
  typeDoc === "Заявление"
    ? (sortedArray =
        info?.statementmember &&
        [...info.statementmember].sort(
          (a, b) => a.member_queue - b.member_queue
        ))
    : typeDoc === "Приказ"
    ? (sortedArray =
        info?.ordermember &&
        [...info.ordermember].sort((a, b) => a.member_queue - b.member_queue))
    : (sortedArray =
        info?.applicationmember &&
        [...info.applicationmember].sort(
          (a, b) => a.member_queue - b.member_queue
        ));


        
        const pinLogIn = () => {

          
          if (String(pinCode).length === 4 && pinCode === user.pin) {
            setNotify({
              isOpen: true,
              message: "Верный Пин-Код!",
               type: "success", sound : "success"
            });
            
            setPinOrComment(false)
            
            
            
          } else {
            setNotify({
              isOpen: true,
              message: "Неправильный Пин-Код",
              type: "error",
            });
            
          }
        };

        
        
        
        
        
  return (
    <div className={styles.history_wrapper}>
      <div className={styles.history_header}>
        <h3>Согласование</h3>
      </div>

      <div className={styles.history_body}>
        {info.agreement_comment === null ? (
          ""
        ) : (
          <>
            {" "}
            Комментарий от {info.prorector_name}:
            <h3>{info.agreement_comment}</h3>{" "}
          </>
        )}

        <div className={styles.history_body_header}>
          <h4>Участники</h4>
          {typeDoc === "Документ" ? (
            info.prorector === undefined ? (
              ""
            ) : info.user_id_prorector === user.userId &&
              info.documentmember.length === 0 &&
              info.status !== "В канцелярии" &&
              info.status !== "Ознакомлен" &&
              info.status !== "Отказано" &&
              info.status !== "Завершена" ? (
                
              <img
                src={add_member}
                title="Добавить участников"
                onClick={() => setOpenModal2(true)}
                className={styles.size}
                alt=""
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {typeDoc === "Заявление" ? (
            info.prorector === undefined ? (
              ""
            ) : info?.prorector?.includes(user.surName) &&
              info?.statementmember?.length === 0 &&
              info.status !== "В канцелярии" &&
              info.status !== "Ознакомлен" &&
              info.status !== "Отказано" &&
              info.status !== "Завершена" ? (
              <img
                src={add_member}
                title="Добавить участников"
                onClick={() => setOpenModal2(true)}
                className={styles.size}
                alt=""
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
          {typeDoc === "Рапорт" ? (
            info.prorector === undefined ? (
              ""
            ) : info?.prorector?.includes(user.surName) &&
            info.user_id_prorector === user.userId &&
              info?.applicationmember?.length === 0 &&
              info.status !== "В канцелярии" &&
              info.status !== "Ознакомлен" &&
              info.status !== "Отказано" &&
              info.status !== "Завершена" ? (
              <img
                src={add_member}
                title="Добавить участников"
                onClick={() => setOpenModal2(true)}
                className={styles.size}
                alt=""
              />
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>
        {info?.applicationmember?.length === 0 ? "Список участников пуст" : ""}
        {info?.statementmember?.length === 0 ? "Список участников пуст" : ""}
        {sortedArray?.map((item) => (
          <AgreementCard
            user={user}
            setOpenModal={setOpenModal}
            item={item}
            setIdMember={setIdMember}
            prorector={info.prorector}
          />
        ))}
      </div>

      {pinOrComment? ( <ModalWindow
          openModal={openModal}
          setOpenModal={setOpenModal}
          modalText={"Введите ПИН-код"}
        >
          <>
            <PinCode setPinCode={setPinCode} passwordVisible={true} />

            <Button
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close}
              id ={styles.closeBtn}
            >
              {" "}
              Закрыть
            </Button>
            <Button id ={styles.pinBtn} onClick={pinLogIn} className={styles.btn_pin}>
              Подтвердить
            </Button>
          </>
        </ModalWindow>) : ( <ModalWindow
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalTitle={"Введите комментарий"}
      >
        <div className={styles.decline_form}>
          <div className={styles.item_flex1}>
            <div className={styles.input_type3}>
              <textarea
                onChange={(e) => setReport(e.target.value)}
                className={styles.discription_input}
                placeholder="Описание"
                required
              />
            </div>
          </div>
        </div>
        {/* <PinCode setPinCode={setPinCode} passwordVisible={true} /> */}
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{maxHeight: '50px', marginTop: '18px'}}>

        <Button
          onClick={() => {setOpenModal(false) ;setPinOrComment(true)}}
          className={styles.btn_pin_close}
        >
          Закрыть
        </Button>
          </div>

        {idMember.member_choose_action === "Отказано" ? (
          <>
          
          {loader ? (
            <div style={{display:"flex" , alignItems:"center"}}>
              <ScaleLoader color="grey" size={30} />
            </div>
          ) : (
            <Button onClick={FinalRaportDecline} className={styles.btn_pin}>
            Отказать
          </Button>
          )}
          </>

        ) : idMember.member_choose_action === "На рассмотрении" ? (
          <Button onClick={RetryRaport} className={styles.btn_pin}>
            Отправить повторно
          </Button>
        ) : (
         <>
          {loader ? (
            <div style={{display:"flex" , alignItems:"center"}}>
              <ScaleLoader color="grey" size={30} />
            </div>
          ) : (
            <Button onClick={FinalRaportAccept} className={styles.btn_pin}>
            Подписать
          </Button>
          )}
         </>
        )}
        </div>
      </ModalWindow>)}

     

      <ModalWindow
        openModal={openModal2}
        setOpenModal={setOpenModal2}
        modalTitle={"Добавьте участников для согласования"}
      >
        <div className={styles.decline_form}>
          <div className={styles.item_flex}>
            <ApprovalSelect setApprovalId={setApprovalId} />
            <MemberSelect
              order_count={order_count}
              setOrderCount={setOrderCount}
              approvalId={approvalId}
              memberInfo={memberInfo}
              setMemberInfo={setMemberInfo}
              setMemberArray={setMemberArray}
              memberArray={memberArray}
            />
          </div>
          <h3>Выбранные согласующие</h3>
          {memberInfo === undefined
            ? []
            : memberInfo.map((item, index) => {
                return (
                  <div key={item.id} className={styles.flex}>
                    <h4>
                      {index + 1} {item.type_approval} : {item.member}{" "}
                    </h4>

                    <img
                      onClick={() => deleteElement(item.id)}
                      className={styles.size}
                      src={bucket}
                      alt=""
                    />
                  </div>
                );
              })}
          <textarea
            onChange={(e) => setComment(e.target.value)}
            className={styles.discription_input}
            placeholder="Комментарий участникам согласования"
            required
          />
        </div>
        <div style={{display: 'flex', justifyContent:'space-between'}}>
              <div style={{maxHeight: '50px', marginTop: '14px'}}>

        <Button
          onClick={() => setOpenModal2(false)}
          className={styles.btn_pin_close}
        >
          Закрыть
        </Button>
              </div>

        {load ? <ScaleLoader color="grey" size={30} /> : <Button onClick={AddMember} className={styles.btn_pin}>
          Сохранить
        </Button>}
        </div>

        
      </ModalWindow>

      
      <Notification notify={notify} setNotify={setNotify} />
    </div>
    
  );
};

export default DocumentHistory;
