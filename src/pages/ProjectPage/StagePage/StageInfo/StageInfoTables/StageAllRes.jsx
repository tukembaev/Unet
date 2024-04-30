import React, { useState } from "react";
import styles from "./StageAllMembers.module.scss";
import { Button, Layout } from "../../../../../components";

import { useSelector } from "react-redux";

import right from "./../../../../../assets/icons/chevron_right.png";
import help from "./../../../../../assets/icons/help_table.svg";
import del from "./../../../../../assets/icons/trash_del.svg";

import { useNavigate, useParams } from "react-router-dom";
import ModalWindow from "../../../../../hooks/ModalWindow/ModalWindow";
import EmployeeSelectAllUserId from "../../../../../hooks/EmployeeSelect/EmployeeSelectAllUserId";
import Notification from "../../../../../utils/Notifications";
import { SendInviteToTeam } from "../../../../../service/CollectiveService";
import Dropdown from "../../../../../components/Dropdown/Dropdown";
import { patchStageInfo } from "../../../../../service/ProjectService";
import userInfo from "../../../../../utils/userInfo";
import { Slider } from "@mui/material";

const StageAllRes = () => {
  const [openModal, setOpenModal] = useState(false);
  const [idType, setIdType] = useState("");
  const [type_res, setType_Res] = useState("");
  const [title, setTitle] = useState("");
  const [entry_date, setEntry_date] = useState("");

  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");
  const request_type = [
    { id: 0, label: "kg" },
    { id: 1, label: "g" },
    { id: 2, label: "l" },
    { id: 3, label: "ml" },
    { id: 4, label: "pc" },
  ];
  const { id } = useParams();
  const [render, setRender] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };
  const navigate = useNavigate();

  const members = useSelector((state) => state.project.stageInfo);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let quantityDouble = parseFloat(quantity);
    let costDouble = parseFloat(cost)
    try {
      let response = await patchStageInfo(members.id, {
        resources: [
          {
            title,
            entry_date,
            unit: type_res,
            quantity:quantityDouble,
            cost:costDouble,
          },
        ],
      });

      setNotify({
        isOpen: true,
        message: "Приглашение отправлено",
         type: "success", sound : "success"
      });

      setRender(true);
      setOpenModal(false);
      navigate(`/stage-info/${members.id}/`);
    } catch (error) {
      

      setNotify({
        isOpen: true,
        message: "Ошибка",
        type: "error",
      });
    }
  };
  const user= userInfo()
  const roleInProject = members?.members?.find((member) => member?.employee_name?.includes(user.surName))?.role;
  const statusInProject = members?.members?.find((member) => member?.employee_name?.includes(user.surName))?.status;

  const handleChangeCost = (event, newValue) => {
    setCost(newValue);
  };
  const handleInputChange = (event) => {
    setCost(event.target.value === '' ? '' : Number(event.target.value));
  };
  const handleBlur = () => {
    if (cost < 0) {
      setCost(0);
    } else if (cost > members?.accounting?.current_budget) {
      setCost(members?.accounting?.current_budget);
    }
  };


  return (
    <Layout>
      <div className={styles.team__wrapper}>
        <div className={styles.team__header}>
          <div className={styles.title}>
            <span
              onClick={() => navigate(`/project/`)}
              style={{ cursor: "pointer" }}
            >
              Проекты
            </span>
            <img
              src={right}
              alt=""
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                verticalAlign: "middle",
              }}
            />
            <span
              onClick={() => navigate(`/stage/${members.project}`)}
              style={{ cursor: "pointer" }}
            >
              {members.project_title}
            </span>
            <img
              src={right}
              alt=""
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                verticalAlign: "middle",
              }}
            />
            <span
              onClick={() => navigate(`/stage-info/${members.id}/`)}
              style={{ cursor: "pointer" }}
            >
              {members.title}
            </span>
            <img
              src={right}
              alt=""
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                verticalAlign: "middle",
              }}
            />
            <span style={{ color: "#090909" }}>Ресурсы</span>
            <img
              src={right}
              alt=""
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                verticalAlign: "middle",
              }}
            />
          </div>
        </div>
        <div className={styles.member_add_header}>
          <div>
            <h3>Общие ресурсы</h3>
            <input
              className={styles.search}
              placeholder="Поиск по названию"
              type="text"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div>
            <h3>Расход</h3>
            { roleInProject === 'Ресурс-менеджер' && statusInProject !== 'неактивен' || roleInProject === 'Процесс-менеджер'  || members?.creator_name?.includes(user.surName) && members.status !== 'Завершен' &&  members.status.includes('Ждет выполнения с') === false ?     <button   onClick={() => setOpenModal(true)}>Добавить ресурс</button> :  '' }
  
       
          </div>
        </div>
        <div className={styles.team__body}>
          <table className={styles.table__wrapper}>
            <thead className={styles.table__head}>
              <tr className={styles.table__row}>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Наименование</span>
                </th>

                <th className={styles.table__item}>
                  <span className={styles.table__title}>Дата поступления</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Общее количество</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Используется</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Остаток</span>
                </th>
                <th className={styles.table__item}>
                  <span className={styles.table__title}>Общая стоимость</span>
                </th>
              </tr>
            </thead>

            <tbody className={styles.table__body}>
              {members?.resources
                ?.filter((item) => item.title.toLowerCase().includes(searchTerm))
                .map((item) => (
                  <tr className={styles.table__row}>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.title}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.entry_date}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>
                        {item.quantity}
                      </span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.in_use}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.remain}</span>
                    </td>
                    <td className={styles.table__item}>
                      <span className={styles.table__title}>{item.cost}</span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <ModalWindow
        setOpenModal={setOpenModal}
        openModal={openModal}
        modalTitle={"Добавить ресурс"}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.discription_input}
            placeholder="Название"
            required
          ></textarea>
          <Dropdown
            setId={setIdType}
            setType={setType_Res}
            title={"Единица измерения"}
            data={request_type ?? []}
          />
        
          <textarea
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={styles.discription_input}
            placeholder="Количество"
            required
          ></textarea>
           <Slider value={cost} onChange={handleChangeCost} m aria-label="Default" valueLabelDisplay="auto" max={members?.accounting?.current_budget} />
<input
                className={styles.discription_input}
            value={cost}
            size="small"
            onChange={handleInputChange}
            placeholder='Стоимость'
            onBlur={handleBlur}
            style={{paddingBottom:'15px'}}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
   
  <h4>Дата поступления</h4>
          <input
            value={entry_date}
            onChange={(e) => setEntry_date(e.target.value)}
            type="date"
            style={{ paddingBottom: "14px", paddingRight: "14px" }}
            className={styles.discription_input}
            placeholder="Дата поступления"
            required
          ></input>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              onClick={() => setOpenModal(false)}
              className={styles.btn_pin_close}
            >
              Закрыть
            </Button>
            <Button onClick={handleSubmit} className={styles.btn_pin}>
          Добавить
            </Button>
          </div>
        </div>
      </ModalWindow>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  );
};

export default StageAllRes;
