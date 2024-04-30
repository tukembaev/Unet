import React from "react";
import { useState, useEffect } from "react";
import Notification from "../../../../../utils/Notifications";
import styles from "./KpiListFrom.module.scss";
import userInfo from "../../../../../utils/userInfo";
import { TextField } from "@mui/material";
import { ScaleLoader } from "react-spinners";
import KpiCategory from "../../../../../hooks/KpiSelect/KpiCategory";
import { postKpiList } from "../../../../../service/PublicationService";
import Button from "../../../../Button/Button";
import KpiCreteria from "../../../../../hooks/KpiSelect/KpiCreteria";


const KpiListForm = ({setRender , setState}) => {
  // states
  const user = userInfo();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const inputProps = {
    step: 300,
  };
  const [isHeadOf, setIsHeadOf] = useState(false);
  const [isDirector, setIsDirector] = useState(false);
  const [direction, setDirection] = useState("");
  const [category, setSemester] = useState("");
  const [amount, setAmount] = useState("");
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const id = user?.employeeId;

  // functions

  const changeRole = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
    handleClear();
  };

  const handleSubmit = async (event) =>{
    event.preventDefault();

    if (direction === "") {
      setNotify({
        isOpen: true,
        message: "Вы не выбрали критерий",
        type: "warning",     sound: 'warning'
      });
    } else if (category === "") {
      setNotify({
        isOpen: true,
        message: "Вы не выбрали катергорию",
        type: "warning",     sound: 'warning'
      });
    } else if (amount === "") {
      setNotify({
        isOpen: true,
        message: "Введите количество больше нуля",
        type: "warning",     sound: 'warning'
      });
    }else {
      try{
        setLoading(true);
        let response = await postKpiList(id ,{
          category: Number(category),
          planned_value: Number(amount), 
          position : isHeadOf ? "Заведуйщий кафедры" : isDirector ? "Директор" : "Сотрудника",
        });

        setNotify({
          isOpen: true,
          message: "Успешно опубликовано",
           type: "success", sound : "success"
        });
        setState({ isPaneOpen: false });
        setRender(true);
      }catch(error){
        setNotify({
          isOpen: true,
          message: "Ошибка",
          type: "error",
        });
      }finally{
        setLoading(false);
      }
    }
  }
  
  useEffect(() => {
    setSemester("");
  }, [direction]);

  const handleClear = () => {
    setDirection("");
    setSemester("");
    setAmount("");
  };
  
  const onAmount = (e) =>{
    const inputValue = e.target.value.replace(/[^0-9]/g, '');
    if(Number(inputValue) >= 0){
      setAmount(inputValue);
    }
  }

  return (
    <div className={styles.list_wrapper}>
      {user?.is_head_of === true ? (
        <div className={styles.qr_head}>
          <div>
            <h3>{isHeadOf ? "Заведующий" : "Сотрудник"}</h3>
          </div>
          <div className={styles.qr_controls}>
            <button
              className={styles.qr_btn}
              onClick={() => {
                setIsHeadOf(!isHeadOf);
                changeRole();
              }}
            >
              {isHeadOf
                ? "Заполнить как cотрудник"
                : "Заполнить как заведующий"}
            </button>
          </div>
        </div>
      ) : null}
      {user?.position === "Директор" ? (
        <div className={styles.qr_head}>
          <div>
            <h3>{isDirector ? "Директор" : "Сотрудник"}</h3>
          </div>
          <div className={styles.qr_controls}>
            <button
              className={styles.qr_btn}
              onClick={() => {
                setIsDirector(!isDirector);
                changeRole();
              }}
            >
              {isDirector
                ? "Заполнить как сотрудник"
                : "Заполнить как Директор"}
            </button>
          </div>
        </div>
      ) : null}
      <div className={styles.list_body}>
        {loader ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <ScaleLoader color="grey" size={30} />{" "}
            {/* Используйте нужные вам свойства для настройки загрузочного индикатора */}
          </div>
        ) : (
          <div className={styles.list_inputs}>
            {user?.is_head_of === true ? (
              <>
                {isHeadOf ? (
                  <>
                    <div>
                      <h3>
                      Критерий <span className={styles.required_img}>*</span>
                      </h3>
                      <KpiCreteria
                        role={"Заведующий"}
                        setDirection={setDirection}
                      />
                    </div>
                    <div>
                      <h3>
                        Категория <span className={styles.required_img}>*</span>
                      </h3>

                      <KpiCategory
                        role={"Заведующий"}
                        id={direction}
                        setSemester={setSemester}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3>
                      Критерий <span className={styles.required_img}>*</span>
                      </h3>
                      <KpiCreteria
                        role={"Сотрудник"}
                        setDirection={setDirection}
                      />
                    </div>
                    <div>
                      <h3>
                        Категория <span className={styles.required_img}>*</span>
                      </h3>

                      <KpiCategory
                        role={"Сотрудник"}
                        id={direction}
                        setSemester={setSemester}
                      />
                    </div>
                  </>
                )}
              </>
            ) : user?.position === "Директор" ? (
              <>
                {isDirector ? (
                  <>
                    <div>
                      <h3>
                      Критерий <span className={styles.required_img}>*</span>
                      </h3>
                      <KpiCreteria
                        role={"Директор"}
                        setDirection={setDirection}
                      />
                    </div>
                    <div>
                      <h3>
                        Категория <span className={styles.required_img}>*</span>
                      </h3>

                      <KpiCategory
                        role={"Директор"}
                        id={direction}
                        setSemester={setSemester}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h3>
                      Критерий <span className={styles.required_img}>*</span>
                      </h3>
                      <KpiCreteria
                        role={"Сотрудник"}
                        setDirection={setDirection}
                      />
                    </div>
                    <div>
                      <h3>
                        Категория <span className={styles.required_img}>*</span>
                      </h3>

                      <KpiCategory
                        role={"Сотрудник"}
                        id={direction}
                        setSemester={setSemester}
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                <div>
                  <h3>
                    Критерий <span className={styles.required_img}>*</span>
                  </h3>
                  <KpiCreteria role={"Сотрудник"} setDirection={setDirection} />
                </div>
                <div>
                  <h3>
                    Категория <span className={styles.required_img}>*</span>
                  </h3>

                  <KpiCategory
                    role={"Сотрудник"}
                    id={direction}
                    setSemester={setSemester}
                  />
                </div>
              </>
            )}
            <div className={styles.list_item}>
            <h3>Плановое значение <span className={styles.required_img}>*</span></h3>
            <TextField
              type="number"
              variant="outlined"
              InputProps={{ min: 0 , step:1} }
              sx={{
                input: {
                  color: "black",
                  background: "white",
                  maxWidth: "30px",
                  maxHeight:"30px",
                },
              }}
              placeholder="0"
              onChange={onAmount}
              value={amount}
              />
              </div>
          </div>
        )}
  
        {loading ? (
                <ScaleLoader color="white" size={30} />
              ) : (
                <Button className={styles.list_btn} onClick={handleSubmit}>
                  Отправить
                </Button>
              )}
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default KpiListForm;
