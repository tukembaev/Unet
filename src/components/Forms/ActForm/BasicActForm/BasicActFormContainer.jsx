import React from "react";
import BasicActForm from "./BasicActForm";
import { useState } from "react";
import Button from "../../../Button/Button";
import styles from "./BasicActForm.module.scss";
import { createBasicAct } from "../../../../service/ActService";
import { postBasicAct } from "../../../../store/slices/ActSlice";
import { useDispatch } from "react-redux";
import Notification from "../../../../utils/Notifications";
import { useNavigate } from "react-router-dom";
import userInfo from "../../../../utils/userInfo";

const BasicActFormContainer = ({ idstatement, spisanie }) => {
  //UseState 
  const navigate = useNavigate();
  const user = userInfo();
  const [act_num, setAct_num] = useState("");
  const [date_act, setDate_act] = useState("");
  const [uchrejdenie, setUchrejdenie] = useState("");
  const [struct_podrazdelenie, setStruct_podrazdelenie] = useState("");
  const [name_sredstva, setName_sredstva] = useState("");
  const [mat_otv, setMat_otv] = useState();
  const [zavod_num, setZavod_num] = useState();
  const [invent_num, setInvent_num] = useState();
  const [name_pokaz, setName_pokaz] = useState();
  const [debet, setDebet] = useState();
  const [credit, setCredit] = useState();
  const [summa, setSumma] = useState();
  const [komis, setKomis] = useState();
  const [rasporyaditel, setRasporyaditel] = useState();
  const [date_naznach, setDate_naznach] = useState();
  const [naznach_num, setNaznach_num] = useState();
  const [osnovanie, setOsnovanie] = useState();
  const [name_obj, setName_obj] = useState();
  const [date_izgotov, setDate_izgotov] = useState();
  const [date_postupleniya, setDate_postupleniya] = useState();
  const [date_expl, setDate_expl] = useState();
  const [remont_count, setRemont_count] = useState();
  const [summa_remontov, setSumma_remontov] = useState();
  const [name_metall_1, setName_metall_1] = useState();
  const [kod_ucheta_1, setKod_ucheta_1] = useState();
  const [ed_izm_1, setEd_izm_1] = useState();
  const [code_okei_1, setCode_okei_1] = useState();
  const [massa_1, setMassa_1] = useState();
  const [name_metall_2, setName_metall_2] = useState();
  const [kod_ucheta_2, setKod_ucheta_2] = useState();
  const [ed_izm_2, setEd_izm_2] = useState();
  const [code_okei_2, setCode_okei_2] = useState();
  const [massa_2, setMassa_2] = useState();
  const [name_metall_3, setName_metall_3] = useState();
  const [kod_ucheta_3, setKod_ucheta_3] = useState();
  const [ed_izm_3, setEd_izm_3] = useState();
  const [code_okei_3, setCode_okei_3] = useState();
  const [massa_3, setMassa_3] = useState();
  const [zakluchenie, setZakluchenie] = useState();
 
  //Notifications
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })

  //Dispatch
  const dispatch = useDispatch();

  //Functions
  const handleSubmit = async (event) => { 
    event.preventDefault();
    try {
      let response = await createBasicAct( {
        act_num,
        date_act,
        uchrejdenie,
        struct_podrazdelenie,
        name_sredstva,
        mat_otv,
        zavod_num,
        invent_num,
        name_pokaz:spisanie[0].name_spisanie,
        debet,
        credit,
        summa,
        komis,
        rasporyaditel,
        date_naznach,
        naznach_num,
        osnovanie,
        name_obj,
        date_izgotov,
        date_postupleniya,
        date_expl,
        remont_count,
        summa_remontov,
        name_metall_1,
        kod_ucheta_1,
        ed_izm_1,
        code_okei_1,
        massa_1,
        name_metall_2,
        kod_ucheta_2,
        ed_izm_2,
        code_okei_2,
        massa_2,
        name_metall_3,
        kod_ucheta_3,
        ed_izm_3,
        code_okei_3,
        massa_3,
        zakluchenie,
        applications_id:idstatement,
      }
      );
      dispatch(
        postBasicAct({
            act_num,
            date_act,
            uchrejdenie,
            struct_podrazdelenie,
            name_sredstva,
            mat_otv,
            zavod_num,
            invent_num,
            name_pokaz:spisanie[0].name_spisanie,
            debet,
            credit,
            summa,
            komis,
            rasporyaditel,
            date_naznach,
            naznach_num,
            osnovanie,
            name_obj,
            date_izgotov,
            date_postupleniya,
            date_expl,
            remont_count,
            summa_remontov,
            name_metall_1,
            kod_ucheta_1,
            ed_izm_1,
            code_okei_1,
            massa_1,
            name_metall_2,
            kod_ucheta_2,
            ed_izm_2,
            code_okei_2,
            massa_2,
            kod_ucheta_3,
            ed_izm_3,
            code_okei_3,
            massa_3,
            zakluchenie,
            applications_id:idstatement,
        })
      );
      setNotify({
        isOpen: true,
        message: 'Основной акт успешно отправлен',
        type: 'success'
    })
      setTimeout(() => {
        navigate(`/alerts/${user.userId}`)
      }, 1000)
    
     
    } catch (error) {
      
      setTimeout(() => {
        setNotify({
          isOpen: true,
          message: 'Ошибка',
          type: 'error'
      })
      }, 1000)
    }
  };


  return (
    <div>
      <BasicActForm
      
      spisanie={spisanie}


        setAct_num={setAct_num}
        setDate_act={setDate_act}
        setUchrejdenie={setUchrejdenie}
        setStruct_podrazdelenie={setStruct_podrazdelenie}
        setName_sredstva={setName_sredstva}
        setMat_otv={setMat_otv}
        setZavod_num={setZavod_num}
        setInvent_num={setInvent_num}
        setName_pokaz={setName_pokaz}
        setDebet={setDebet}
        setCredit={setCredit}
        setSumma={setSumma}
        setKomis={setKomis}
        setRasporyaditel={setRasporyaditel}
        setDate_naznach={setDate_naznach}
        setNaznach_num={setNaznach_num}
        setOsnovanie={setOsnovanie}
        setName_obj={setName_obj}
        setDate_izgotov={setDate_izgotov}
        setDate_postupleniya={setDate_postupleniya}
        setDate_expl={setDate_expl}
        setRemont_count={setRemont_count}
        setSumma_remontov={setSumma_remontov}
        setName_metall_1={setName_metall_1}
        setKod_ucheta_1={setKod_ucheta_1}
        setEd_izm_1={setEd_izm_1}
        setCode_okei_1={setCode_okei_1}
        setMassa_1={setMassa_1}
        setName_metall_2={setName_metall_2}
        setEd_izm_2={setEd_izm_2}
        setKod_ucheta_2={setKod_ucheta_2}
        setCode_okei_2={setCode_okei_2}
        setMassa_2={setMassa_2}
        setName_metall_3={setName_metall_3}
        setKod_ucheta_3={setKod_ucheta_3}
        setEd_izm_3={setEd_izm_3}
        setMassa_3={setMassa_3}
        setCode_okei_3={setCode_okei_3}
        setZakluchenie={setZakluchenie}
      />
      <Button className={styles.btn2} onClick={handleSubmit}> Отправить</Button>
      <Notification
                notify={notify}
                setNotify={setNotify}
            />
    </div>
  );
};

export default BasicActFormContainer;
