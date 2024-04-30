import React, { useEffect, useState } from "react";
import styles from "./FinalKpiPage.module.scss";
import { Layout } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { getKpi } from "../../service/PublicationService";
import Notification from "../../utils/Notifications";
import { setKpiTitle } from "../../store/slices/PublicationSlice";
import SlidingPaneUtil from "../../utils/SlidingPaneUtil";
import userInfo from "../../utils/userInfo";
import DirectorForm from "../../components/Forms/KpiForm/DirectorForm/DirectorForm";
import IsHeadOfForm from "../../components/Forms/KpiForm/IsHeadOfForm/IsHeadOfForm";
import EmployeeForm from "../../components/Forms/KpiForm/EmployeeForm/EmployeeForm";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import KpiContent from "./components/KpiContent/KpiContent";
import KpiEmployees from "./components/KpiEmployees/KpiEmployees";
import KpiReport from "./components/KpiReport/KpiReport";
import KpiList from "./components/KpiList/KpiList";
import { getKpiList } from "../../service/PublicationService";
import { setKpiList } from "../../store/slices/PublicationSlice";
import { getEmployee } from "../../service/TaskService";
import BottomSheet from "../../components/BottomSheet/BottomSheet";

const FinalKpiPage = () => {
  // states
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  let data;
  const [render, setRender] = useState(false);
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const dispatch = useDispatch();
  const [isDirector, setIsDirector] = useState(false);
  const [isHeadOf, setIsHeadOf] = useState(false);
  const user = userInfo();
  const [activeButton, setActiveButton] = useState(null);
  const id = user?.employeeId;

  // functions
  const handleButtonClick = (index) => {
    if (activeButton === index) {
      setActiveButton(null); // Если текущая кнопка уже открыта, закрываем её
    } else {
      setActiveButton(index); // В противном случае открываем выбранную кнопку
    }
  };

  const getData = async () => {
    try {
      let response = await getKpi(data);
      dispatch(
        setKpiTitle({
          kpiTitle: response.data,
        })
      );
    } catch (error) {}
  };

  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);

  const kpiTitle = useSelector((state) => state.publications.kpiTitle);

  const getList = async () => {
    try {
      let response = await getKpiList(id, data);
      dispatch(
        setKpiList({
          kpiList: response.data,
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getList();
    setRender(false);
  }, [render]);

  const kpiList = useSelector((state) => state.publications.kpiList);
  const employeeList = kpiList.filter((item) => item.position === "Сотрудника");

  const HeadOfList = kpiList.filter(
    (item) => item.position === "Заведуйщий кафедры"
  );
  const DirectorList = kpiList.filter((item) => item.position === "Директор");

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) ~ :not(style)": {
      marginTop: "0px",
    },
  }));
  // employee
  const employee = kpiTitle.reduce((acc, item) => {
    const newItem = JSON.parse(JSON.stringify(item));
    if (newItem.category) {
      newItem.category.forEach((categoryItem) => {
        if (categoryItem.kpi) {
          categoryItem.kpi = categoryItem.kpi.filter(
            (kpiItem) => kpiItem.position === "Сотрудника"
          );
        }
      });
    }
    acc.push(newItem);
    return acc;
  }, []);
  // IsHeadOf
  const headOf = kpiTitle.reduce((acc, item) => {
    const newItem = JSON.parse(JSON.stringify(item));
    if (newItem.category) {
      newItem.category.forEach((categoryItem) => {
        if (categoryItem.kpi) {
          categoryItem.kpi = categoryItem.kpi.filter(
            (kpiItem) => kpiItem.position === "Заведуйщий кафедры"
          );
        }
      });
    }
    acc.push(newItem);
    return acc;
  }, []);

  // Director
  const Director = kpiTitle.reduce((acc, item) => {
    const newItem = JSON.parse(JSON.stringify(item));
    if (newItem.category) {
      newItem.category.forEach((categoryItem) => {
        if (categoryItem.kpi) {
          categoryItem.kpi = categoryItem.kpi.filter(
            (kpiItem) => kpiItem.position === "Директор"
          );
        }
      });
    }
    acc.push(newItem);
    return acc;
  }, []);

  let totalScore = 0;
  for (let i of kpiTitle) {
    totalScore += i.score;
  }

  let PotentialScore = 0;
  for (let i of kpiTitle) {
    PotentialScore += i.potential_points;
  }

  return (
    <Layout>
      <Root>
        <div className={styles.kpi_wrapper}>
          <div className={styles.kpi_head}>
            <div className={styles.kpi_title}>
              <h1>KPI </h1>
              <button
                onClick={() => setState({ isPaneOpen: true })}
                className={styles.btn_pin}
              >
                Создать
              </button>
            </div>
            <div className={styles.kpi_score}>
              <h3>
                <span style={{ color: "#8B0000" }}>{PotentialScore}</span>/
                <span style={{ color: "darkgreen" }}>{totalScore}</span>
              </h3>
            </div>
          </div>
          <div className={styles.kpi_body}>
            {user.is_admin_kpi ? <KpiReport /> : null}

            {user.is_head_of ? <KpiEmployees /> : null}

            <div className={styles.kpi_content}>
              {user?.is_head_of === true ? (
                <div className={styles.kpi_btns}>
                  <button
                    className={isHeadOf ? styles.btn_1 : styles.btn_1_active}
                    onClick={() => setIsHeadOf(false)}
                  >
                    Как Сотрудник
                  </button>
                  <button
                    className={!isHeadOf ? styles.btn_2 : styles.btn_2_active}
                    onClick={() => setIsHeadOf(true)}
                  >
                    Как Заведующий
                  </button>
                </div>
              ) : null}

              {user?.position === "Директор" ? (
                <div className={styles.kpi_btns}>
                  <button
                    className={isDirector ? styles.btn_1 : styles.btn_1_active}
                    onClick={() => setIsDirector(false)}
                  >
                    Как Сотрудник
                  </button>
                  <button
                    className={!isDirector ? styles.btn_2 : styles.btn_2_active}
                    onClick={() => setIsDirector(true)}
                  >
                    Как Директор
                  </button>
                </div>
              ) : null}
              {user?.is_head_of === true ? (
                <div className={styles.kpi_item_wrapper}>
                  <div className={styles.kpi_item}>
                    <Divider>Cписок Kpi</Divider>
                    {isHeadOf ? (
                      <>
                        <KpiList data={HeadOfList} />
                      </>
                    ) : (
                      <>
                        <KpiList data={employeeList} />
                      </>
                    )}
                  </div>
                </div>
              ) : user?.position === "Директор" ? (
                <div className={styles.kpi_item_wrapper}>
                  <div className={styles.kpi_item}>
                    {isDirector ? (
                      <>
                        <KpiList data={DirectorList} />
                      </>
                    ) : (
                      <>
                        <KpiList data={employeeList} />
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.kpi_item_wrapper}>
                  <div className={styles.kpi_item}>
                    <>
                      <KpiList data={employeeList} />
                    </>
                  </div>
                </div>
              )}
              <Divider>Мои Kpi</Divider>
              {user?.is_head_of === true ? (
                <div className={styles.kpi_item_wrapper}>
                  <div className={styles.kpi_item}>
                    {isHeadOf ? (
                      <>
                        <KpiContent
                          data={headOf}
                          setRender={setRender}
                          setNotify={setNotify}
                        />
                      </>
                    ) : (
                      <>
                        <KpiContent
                          data={employee}
                          setRender={setRender}
                          setNotify={setNotify}
                        />
                      </>
                    )}
                  </div>
                </div>
              ) : user?.position === "Директор" ? (
                <div className={styles.kpi_item_wrapper}>
                  <div className={styles.kpi_item}>
                    {isDirector ? (
                      <>
                        <KpiContent
                          data={Director}
                          setRender={setRender}
                          setNotify={setNotify}
                        />
                      </>
                    ) : (
                      <>
                        <KpiContent
                          data={employee}
                          setRender={setRender}
                          setNotify={setNotify}
                        />
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className={styles.kpi_item_wrapper}>
                  <div className={styles.kpi_item}>
                    <>
                      <KpiContent
                        data={employee}
                        setRender={setRender}
                        setNotify={setNotify}
                      />
                    </>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Root>
      <Notification notify={notify} setNotify={setNotify} />
      <>
        {width > 600 ? (
          <>
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
          </>
        ) : (
          <>
            <SlidingPaneUtil
              size="100%"
              title="Создать KPI"
              state={state}
              setState={setState}
              onRequestClose={() => {
                setState({ isPaneOpen: false });
              }}
            >
              {user?.is_head_of === true ? (
                <IsHeadOfForm setRender={setRender} setState={setState} />
              ) : user?.position === "Директор" ? (
                <DirectorForm setRender={setRender} setState={setState} />
              ) : (
                <EmployeeForm setRender={setRender} setState={setState} />
              )}
            </SlidingPaneUtil>
          </>
        )}
      </>
    </Layout>
  );
};

export default FinalKpiPage;
