import React, { useEffect, useState } from "react";
import styles from "./KpiPage.module.scss";
import { Layout } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import {
  getCriteriaHas,
  getCriteriaHead,
  getKpiReport,
} from "../../service/PublicationService";
import Notification from "../../utils/Notifications";
import {
  setKpiTitle,
  setKpiHead,
  setKpiReport,
} from "../../store/slices/PublicationSlice";
import SlidingPaneUtil from "../../utils/SlidingPaneUtil";
import userInfo from "../../utils/userInfo";
import DirectorForm from "../../components/Forms/KpiFrom/DirectorForm/DirectorForm";
import IsHeadOfForm from "../../components/Forms/KpiFrom/IsHeadOfForm/IsHeadOfForm";
import EmployeeForm from "../../components/Forms/KpiFrom/EmployeeForm/EmployeeForm";
import KpiEmployee from "./components/KpiEmployee/KpiEmployee";
import KpiCategory from "../KpiPage/components/KpiCategory/KpiCategory";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import KpiCenter from "./components/KpiReport/KpiCenter/KpiCenter";
import KpiDivision from "./components/KpiReport/KpiDivision/KpiDivision";
import KpiInstitute from "./components/KpiReport/KpiInstitute/KpiInstitute";
import BottomSheet from "../../components/BottomSheet/BottomSheet";

export default function KpiPage2() {
  // states
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  let data;
  let info;
  let report;
  const [render, setRender] = useState(false);
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDirector, setIsDirector] = useState(false);
  const [isHeadOf, setIsHeadOf] = useState(false);

  // functions
  // getReport
  const getData2 = async () => {
    try {
      let response = await getKpiReport(report);
      dispatch(
        setKpiReport({
          KpiReport: response.data,
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };
  // getCriteriaHas
  const getData = async () => {
    try {
      let response = await getCriteriaHas(data);

      dispatch(
        setKpiTitle({
          kpiTitle: response.data,
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  // KpiHead
  const getInfo = async () => {
    try {
      let response = await getCriteriaHead(info);
      dispatch(
        setKpiHead({
          KpiHead: response.data,
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);

  useEffect(() => {
    getInfo();
    setRender(false);
  }, [render]);

  useEffect(() => {
    getData2();
    setRender(false);
  }, [render]);

  const kpiTitle = useSelector((state) => state.publications.kpiTitle);
  const kpiHead = useSelector((state) => state.publications.KpiHead);
  const reports = useSelector((state) => state.publications.KpiReport);

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  const user = userInfo();

  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) ~ :not(style)": {
      marginTop: "0px",
    },
  }));

  return (
    <Layout>
      <div className={styles.kpi_wrapper}>
        <Root>
          <div className={styles.kpi_head}>
            <div className={styles.kpi_title}>
              <h1>KPI </h1>
              <button
                onClick={() => setState({ isPaneOpen: true })}
                className={styles.btn_pin}
              >
                Создать
              </button>
              {user?.is_head_of === true ? (
                <div>
                  <button
                    className={styles.btn_pin}
                    onClick={() => setIsHeadOf(!isHeadOf)}
                  >
                    {isHeadOf ? "Как Сотрудник" : "Как Заведующий"}
                  </button>
                </div>
              ) : null}
              {user?.position === "Директор" ? (
                <div>
                  <button
                    className={styles.btn_pin}
                    onClick={() => setIsDirector(!isDirector)}
                  >
                    {isDirector ? "Как Сотрудник" : "Как Директор"}
                  </button>
                </div>
              ) : null}
            </div>
            <div className={styles.kpi_score}>
              <h3>
                Общий балл :{" "}
                {kpiTitle.reduce((acc, item) => {
                  let totalKpiScore = 0;
                  if (item?.score) {
                    totalKpiScore = acc + item?.score;
                  } else {
                    totalKpiScore = 0;
                  }
                  return totalKpiScore;
                }, 0)}
              </h3>
            </div>
          </div>
          <div className={styles.kpi_body}>
            {user.is_head_of === true ? (
              <>
                {/* <Divider>Общий отчет</Divider>
                <div className={styles.departments}>
                  <button onClick={() => navigate(`/kpi-division/`)}>
                    Отделы
                  </button>
                  <button onClick={() => navigate(`/kpi-institute/`)}>
                    Институты
                  </button>
                  <button onClick={() => navigate(`/kpi-center/`)}>
                    Центры
                  </button>
                </div> */}
                {/* <Divider>Все сотрудники</Divider> */}
                {/* <div className={styles.kpi}>
                  {kpiHead.length !== 0 ? (
                    <div className={styles.kpi__body}>
                      <div className={styles.table__row}>
                        <div className={styles.head__name}>
                          <p>Все </p>
                        </div>
                        <div className={styles.head__item}>
                          <p>B-1</p>
                        </div>
                        <div className={styles.head__item}>
                          <p>B-2</p>
                        </div>
                        <div className={styles.head__item}>
                          <p>B-3</p>
                        </div>
                        <div className={styles.head__item}>
                          <p>B-4</p>
                        </div>
                        <div className={styles.head__item}>
                          <p>B-5</p>
                        </div>
                        <div className={styles.head__item}>
                          <p>Общий балл</p>
                        </div>
                      </div>
                      <div className={styles.table__body}>
                        {kpiHead?.map((item) => (
                          <div
                            className={styles.table__row}
                            onClick={() =>
                              navigate(`/kpi-employee/${item.user_id}`)
                            }
                          >
                            <div className={styles.body__name}>
                              <div className={styles.kpi__person}>
                                <img
                                  src={item?.image}
                                  className={styles.size}
                                  alt=""
                                />
                                <p>{item?.employee_name}</p>
                              </div>
                            </div>
                            <div className={styles.body__item}>
                              <p>{item?.criteria_1}</p>
                            </div>
                            <div className={styles.body__item}>
                              <p>{item?.criteria_2}</p>
                            </div>
                            <div className={styles.body__item}>
                              <p>{item?.criteria_3}</p>
                            </div>
                            <div className={styles.body__item}>
                              <p>{item?.criteria_4}</p>
                            </div>
                            <div className={styles.body__item}>
                              <p>{item?.criteria_5}</p>
                            </div>
                            <div className={styles.body__item}>
                              <p>{item?.total_score}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div> */}
                <div>
                  {kpiTitle.length !== 0 ? (
                    <div>
                      <Divider>Мои Kpi</Divider>
                      {kpiTitle?.map((item) => (
                        <div className={styles.kpi__item} key={item?.id}>
                          <div className={styles.item__header}>
                            <span>{item?.label}</span>
                            <p> Баллы за категорию : {item?.score}</p>
                          </div>
                          <div className={styles.item__body}>
                            <KpiCategory
                              key={item?.id}
                              kpyTitle={kpiTitle}
                              categoryId={item?.id}
                              isDirector={isDirector}
                              isHeadOf={isHeadOf}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <>
                {kpiTitle.length !== 0 ? (
                  <>
                    {kpiTitle?.map((item) => (
                      <div className={styles.kpi__item} key={item?.id}>
                        <div className={styles.item__header}>
                          <span>{item?.label}</span>
                          <p> Баллы за категорию : {item?.score}</p>
                        </div>
                        <div className={styles.item__body}>
                          <KpiCategory
                            key={item?.id}
                            kpyTitle={kpiTitle}
                            categoryId={item?.id}
                            isDirector={isDirector}
                            isHeadOf={isHeadOf}
                          />
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className={styles.no_publick}>У вас нет публикаций</p>
                )}
              </>
            )}
          </div>
        </Root>
        <>
          {width > 600 ? (
            <BottomSheet
              title={"Создать KPI"}
              isOpen={state.isPaneOpen}
              onClose={setState}
            >
              {user?.is_head_of === true ? (
                <IsHeadOfForm setRender={setRender} setState={setState} />
              ) : user?.position === "Директор" ? (
                <DirectorForm setRender={setRender} setState={setState} />
              ) : (
                <EmployeeForm setRender={setRender} setState={setState} />
              )}
            </BottomSheet>
          ) : (
            // <SlidingPaneUtil
            //   size="50%"
            //   title=""
            //   state={state}
            //   setState={setState}
            // >

            // </SlidingPaneUtil>
            <SlidingPaneUtil
              size="100%"
              title="Создать KPI"
              state={state}
              setState={setState}
            >
              {user?.is_head_of === true ? (
                <IsHeadOfForm setRender={setRender} setState={setState} />
              ) : user?.position === "Директор" ? (
                <DirectorForm setRender={setRender} setState={setState} />
              ) : (
                <EmployeeForm setRender={setRender} setState={setState} />
              )}
            </SlidingPaneUtil>
          )}
        </>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  );
}
