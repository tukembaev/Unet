import React, { useState, useEffect, useRef } from "react";
import styles from "./StudyPlanInfo.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Layout } from "../../../components";
import StudyPlanTable from "./StudyPlanTable/StudyPlanTable";
import {
  createSemester,
  getStudyPlanInfo,
} from "../../../service/StudyPlanService";
import { setStudyInfoData } from "../../../store/slices/StudyPlanSlice";
import { useDispatch, useSelector } from "react-redux";
import right from "./../../../assets/icons/chevron_right.png";
import StudyPlanAllSemesters from "./StudyPlanAllSemesters/StudyPlanAllSemesters";
import { useReactToPrint } from "react-to-print";
import print from "../../../assets/icons/print.png";
import kstu from "../../../assets/img/kstu.png";
import userInfo from "../../../utils/userInfo";
import PinCode from "../../../hooks/PinCode/PinCode";
import ModalWindow from "../../../hooks/ModalWindow/ModalWindow";
import Notification from "../../../utils/Notifications";
import { CircleLoader, ScaleLoader } from "react-spinners";

const StudyPlanInfo = () => {
  // states
  const [width, setWidth] = useState(window.innerWidth);
  const [render, setRender] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  let data;
  const printRef = useRef();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  // pin code
  const user = userInfo();
  const [pinCode, setPinCode] = useState();
  const [loader, setLoader] = useState(false);
  // functions
  const getData = async () => {
    try {
      let response = await getStudyPlanInfo(id, data);
      dispatch(
        setStudyInfoData({
          studyPlanInfo: response.data,
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };
  const studyDataInfo = useSelector((state) => state.study.studyPlanInfo);
  const semesters = studyDataInfo?.semesters;
  const condition = studyDataInfo?.creator_id === user?.userId;

  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);

  const handleSubmit = async () => {
    try {
      setLoader(true);
      let response = await createSemester(studyDataInfo.id, {
        semesters: [...studyDataInfo.semesters, { syllabus: studyDataInfo.id }],
      });
      setNotify({
        isOpen: true,
        message: "Семестр успешно добавлен",
        type: "success",
      });
      setRender(true);
    } catch (error) {
      // console.log(err.response);
    } finally {
      setTimeout(() => {
        setLoader(false);
      }, 500);
    }
  };


  return (
    <Layout>
      <div className={styles.study_plan_info__wrapper}>
        <div className={styles.study_plan_info__header}>
          <div className={styles.title} onClick={() => navigate(-1)}>
            <span style={{ cursor: "pointer" }}>Учебный план</span>
            <img
              src={right}
              alt=""
              style={{
                paddingLeft: "10px",
                paddingRight: "10px",
                verticalAlign: "middle",
              }}
            />
            <span style={{ color: "#090909" }}>
              {" "}
              ( {new Date(studyDataInfo?.start_year).getFullYear()} -{" "}
              {new Date(studyDataInfo?.end_year).getFullYear()} )
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
          </div>
        </div>
        <div className={styles.study_plan_info__header2}>
          <div className={styles.title2}>
            <div className={styles.semester_amount}>
              <h3>Количество семестров : {semesters?.length}</h3>
            </div>
            {condition && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "155px",
                    minHeight: "50px",
                  }}
                >
                  {loader ? (
                    <CircleLoader color="grey" size={20} />
                  ) : (
                    <Button
                      className={styles.btn_pin_close}
                      onClick={handleSubmit}
                    >
                      Добавить
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
        <div className={styles.print_box}>
          <p>Все семестры</p>
        </div>
        <div className={styles.table_box}>
          <StudyPlanTable data={studyDataInfo} setRender={setRender} condition={condition}/>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  );
};

export default StudyPlanInfo;
