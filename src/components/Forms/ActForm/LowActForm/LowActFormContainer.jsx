import React from "react";
import { useState } from "react";
import Button from "../../../Button/Button";
import styles from "./LowActForm.module.scss";
import { createLowAct } from "../../../../service/ActService";
import { postLowAct } from "../../../../store/slices/ActSlice";
import { useDispatch } from "react-redux";
import LowActForm from "./LowActForm";
import { useNavigate } from "react-router-dom";
import userInfo from "../../../../utils/userInfo";
import Notification from "../../../../utils/Notifications";

const LowActFormContainer = ({ idstatement, spisanietables }) => {
  //UseState

  const [date_utver, setDate_utver] = useState("");
  const [act_num, setAct_num] = useState("");
  const [date_act, setDate_act] = useState("");
  const [uchrejdenie, setUchrejdenie] = useState("");
  const [struct_podrazdelenie, setStruct_podrazdelenie] = useState("");
  const [mat_otv, setMat_otv] = useState();
  const [komis, setKomis] = useState();
  const [date_naznach, setDate_naznach] = useState();
  const [naznach_num, setNaznach_num] = useState();
  const [mesto, setMesto] = useState();
  const [date_expl, setDate_expl] = useState();
  const [kod_ucheta, setKod_ucheta] = useState();
  const [summa, setSumma] = useState();
  const [summaTable, setSummaTable] = useState();
  const [zakluchenie, setZakluchenie] = useState();
  const [date_hraneniya, setDate_hraneniya] = useState();
  const [summa_propis, setSumma_propis] = useState();
  const [name_pokaz, setName_pokaz] = useState();
  const [debet, setDebet] = useState();
  const [credit, setCredit] = useState();
  const [rasporyaditel, setRasporyaditel] = useState();
  const [osnovanie, setOsnovanie] = useState();
  const [name_obj, setName_obj] = useState();
  const [date_izgotov, setDate_izgotov] = useState();
  const [date_postupleniya, setDate_postupleniya] = useState();
  const [remont_count, setRemont_count] = useState();
  const [summa_remontov, setSumma_remontov] = useState();
  const [code_okei, setCode_okei] = useState();
  const [spisanie, setSpisanie] = useState([]);

  //Notifications
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  
  //Dispatch & Navigate
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Functions
  const user = userInfo();

  const handleSubmit = async (event) => {
    event.preventDefault();
  try {
      let response = await createLowAct({
        date_utver,
        act_num,
        date_act,
        uchrejdenie,
        struct_podrazdelenie,
        mat_otv,
        komis,
        date_naznach,
        naznach_num,
        mesto,
        date_expl,
        kod_ucheta,
        summa,
        zakluchenie,
        date_hraneniya,
        summa_propis,
        name_pokaz,
        debet,
        credit,
        rasporyaditel,
        osnovanie,
        name_obj,
        date_izgotov,
        date_postupleniya,
        remont_count,
        summa_remontov,
        code_okei,
        spisanie,
        applications_id: idstatement,
      });
      dispatch(
        postLowAct({
          date_utver,
          act_num,
          date_act,
          uchrejdenie,
          struct_podrazdelenie,
          mat_otv,
          komis,
          date_naznach,
          naznach_num,
          mesto,
          date_expl,
          kod_ucheta,
          summa,
          zakluchenie,
          date_hraneniya,
          summa_propis,
          name_pokaz,
          debet,
          credit,
          rasporyaditel,
          osnovanie,
          name_obj,
          date_izgotov,
          date_postupleniya,
          remont_count,
          summa_remontov,
          code_okei,
          spisanie,
          applications_id: idstatement,
        })
      );
      setNotify({
        isOpen: true,
        message: 'Малоценный акт успешно отправлен',
        type: 'success'
    })
      setTimeout(() => {
        navigate(`/alerts/${user.userId}`)
      }, 1000)
     
      
      
    } catch (error) {
      
      setNotify({
        isOpen: true,
        message: '',
        type: 'error'
    })
    }
  };

  return (
    <div>
      <LowActForm
        spisanie={spisanietables}
        setDate_utver={setDate_utver}
        setAct_num={setAct_num}
        setDate_act={setDate_act}
        setUchrejdenie={setUchrejdenie}
        setStruct_podrazdelenie={setStruct_podrazdelenie}
        setMat_otv={setMat_otv}
        setKomis={setKomis}
        setDate_naznach={setDate_naznach}
        setNaznach_num={setNaznach_num}
        setMesto={setMesto}
        setDate_expl={setDate_expl}
        setKod_ucheta={setKod_ucheta}
        setSummaTable={setSummaTable}
        setSumma={setSumma}
        setZakluchenie={setZakluchenie}
        setDate_hraneniya={setDate_hraneniya}
        setSumma_propis={setSumma_propis}
        setName_pokaz={setName_pokaz}
        setDebet={setDebet}
        setCredit={setCredit}
        setRasporyaditel={setRasporyaditel}
        setOsnovanie={setOsnovanie}
        setName_obj={setName_obj}
        setDate_izgotov={setDate_izgotov}
        setDate_postupleniya={setDate_postupleniya}
        setRemont_count={setRemont_count}
        setSumma_remontov={setSumma_remontov}
        setCode_okei={setCode_okei}
        setSpisanie={setSpisanie}
      />
       <Button className={styles.btn2} onClick={handleSubmit}> Отправить</Button>
       <Notification
                notify={notify}
                setNotify={setNotify}
            />
    </div>
  );
};

export default LowActFormContainer;
