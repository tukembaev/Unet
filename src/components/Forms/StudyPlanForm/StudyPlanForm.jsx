import React, { useEffect, useState, lazy, Suspense } from "react";

import styles from "./StudyPlanForm.module.scss";

import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { TextareaAutosize } from "@material-ui/core";
import { setMyMembers } from "../../../store/slices/CollectiveSlice";
import { getMyMembers } from "../../../service/CollectiveService";
import Agreement from "../OrderForm/components/Agreement";
import Dropdown from "../../Dropdown/Dropdown";
import userInfo from "../../../utils/userInfo";
import Button from "../../Button/Button";
import Notification from "../../../utils/Notifications";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { createStudyPlan } from "../../../service/StudyPlanService";
import { type } from "@testing-library/user-event/dist/type";
import { ScaleLoader } from "react-spinners";
import {
  getTitleOptins,
  getProfileOptins,
  getFacultyOptins,
} from "../../../service/StudyPlanService";
const OrderSigner = lazy(() => import("../OrderForm/components/OrderSigner"));

function StudyPlanForm({ setRender, setState }) {
  //UseState

  const user = userInfo();
  const request_type = ["Очная", "Заочная"];
  const request_type2 = ["Бакалавр", "Магистратура"];
  const [formValues, setFormValues] = useState([]);
  const [id, setId] = useState("");
  const [type_doc, setType_doc] = useState("");
  const [id2, setId2] = useState("");
  const [education, setEducation] = useState("");
  const [signer, setSigner] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedYear2, setSelectedYear2] = useState("");
  const [loader, setLoader] = useState(false);
  const [data] = useState();
  const [memberArray, setMemberArray] = useState([]);
  const [agreementOutPut, setAgreementOutPut] = useState([]);
  const [title, setTitle] = useState("");
  const [institute, setInstitute] = useState("");
  const [titleOptions, setTitleOptions] = useState([]);
  const [facultyOptions, setFucultyOptions] = useState([]);

  // functions

  const handleStartYearChange = (e) => {
    let input = e.target.value;
    let filteredInput = input.replace(/\D/g, "");
    input = input.slice(0, 4);
    setSelectedYear(filteredInput);
  };

  const handleEndYearChange = (e) => {
    let input = e.target.value;
    let filteredInput = input.replace(/\D/g, "");
    input = input.slice(0, 4);
    setSelectedYear2(filteredInput);
  };

  //Notification
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  //Dispatch
  const dispatch = useDispatch();

  // getOptions
  const getFacultyData = async () => {
    try {
      let response = await getFacultyOptins(data);
      setFucultyOptions(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getFacultyData();
  }, []);

  // getOptions
  const getTitleData = async () => {
    try {
      let response = await getTitleOptins(Number(institute), data);
      setTitleOptions(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getTitleData();
  }, [institute]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (institute === "") {
      setNotify({
        isOpen: true,
        message: "Вы не выбрали институт",
        type: "warning",
        sound: "warning",
      });
    } else if (title === "") {
      setNotify({
        isOpen: true,
        message: "Вы не выбрали направление",
        type: "warning",
        sound: "warning",
      });
    } else if (type_doc === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали форму обучения",
        type: "warning",
        sound: "warning",
      });
    } else if (education === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали уровень образования",
        type: "warning",
        sound: "warning",
      });
    } else if (selectedYear === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали период",
        type: "warning",
        sound: "warning",
      });
    } else if (selectedYear.length < 4) {
      setNotify({
        isOpen: true,
        message: " Вы указали слишком короткий период",
        type: "warning",
        sound: "warning",
      });
    } else if (selectedYear2.length < 4) {
      setNotify({
        isOpen: true,
        message: " Вы указали слишком короткий период",
        type: "warning",
        sound: "warning",
      });
    } else if (selectedYear2 === "") {
      setNotify({
        isOpen: true,
        message: " Вы не указали период",
        type: "warning",
        sound: "warning",
      });
    } else if (signer === "") {
      setNotify({
        isOpen: true,
        message: "Вы не выбрали утверждающего",
        type: "warning",
        sound: "warning",
      });
    } else {
      try {
        setLoader(true);
        const user_ids = memberArray?.map((user) => user?.user_id);

        const newData = {
          name_direction: Number(title),
          form_education: type_doc,
          level_education: education,
          start_year: selectedYear,
          end_year: selectedYear2,
          coordinating: user_ids,
          сonfirming: signer,
        };

        let response = await createStudyPlan(newData);

        setNotify({
          isOpen: true,
          message: "Учебный план создан",
          type: "success",
          sound: "success",
        });

        setTitle("");
        setType_doc("");
        setEducation("");
        setSelectedYear("");
        setSelectedYear2("");
        setState({ isPaneOpen: false });
        setRender(true);
        setInstitute("");
      } catch (error) {
      } finally {
        setLoader(false);
      }
    }
  };

  // getRector
  const getData = async () => {
    try {
      let response = await getMyMembers(data);

      dispatch(
        setMyMembers({
          members: response.data,
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const myTeam = useSelector((state) => state.collective.members);
  const dataRector = [myTeam];

  return (
    <div>
      <div className={styles.signer}>
        <Select
          closeMenuOnSelect={true}
          options={facultyOptions}
          onChange={(selected) => setInstitute(selected.value)}
          isSearchable={true}
          placeholder="Институт"
          autosize={true}
        />
      </div>
      <div className={styles.signer}>
        <Select
          closeMenuOnSelect={true}
          options={titleOptions}
          onChange={(selected) => setTitle(selected.value)}
          isSearchable={true}
          placeholder="Направление"
          autosize={true}
        />
      </div>
      <div className={styles.signer}>
        <div>
          <select
            className={styles.dropdown}
            value={type_doc}
            onChange={(e) => setType_doc(e.target.value)}
          >
            <option value="" disabled selected hidden>
              Форма обучения
            </option>
            {request_type.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.signer}>
        <div>
          <select
            className={styles.dropdown}
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          >
            <option value="" disabled selected hidden>
              Уровень образования
            </option>
            {request_type2.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <p style={{ paddingBottom: "10px" }}>Год обучения: </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <TextareaAutosize
          id="start"
          name="start"
          type="number"
          minLength={1}
          maxLength={4}
          className={styles.type_input_number}
          value={selectedYear}
          onChange={handleStartYearChange}
          placeholder="Старт:"
        />
        <TextareaAutosize
          id="end"
          name="end"
          minLength={1}
          maxLength={4}
          type="number"
          className={styles.type_input_number}
          value={selectedYear2}
          onChange={handleEndYearChange}
          placeholder="Конец:"
        />
      </div>
      <div className={styles.signer}>
        <Suspense fallback={<p>Loading...</p>}>
          <OrderSigner
            text={"Утверждает:"}
            placeholder={"Выбрать утверждающего"}
            dataSigners={dataRector[0]}
            setSigner={setSigner}
          />
        </Suspense>
      </div>

      <div className={styles.signer}>
        {loader ? (
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ScaleLoader color="white" size={30} />
          </div>
        ) : (
          <Button className={styles.btn3} onClick={handleSubmit}>
            Создать
          </Button>
        )}
        <Agreement
          setState={setState}
          setRender={setRender}
          dataSigners={dataRector[0]}
          setMemberArrayOrder={setMemberArray}
          setAgreementOutPut={setAgreementOutPut}
          signer={signer}
        />
      </div>

      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default StudyPlanForm;
