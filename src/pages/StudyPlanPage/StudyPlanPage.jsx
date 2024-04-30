import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./StudyPlanPage.module.scss";
import { Layout } from "../../components";
import Notification from "../../utils/Notifications";
import { useDispatch, useSelector } from "react-redux";
import right from "./../../assets/icons/chevron_right.png";
import StudyPlanForm from "./../../components/Forms/StudyPlanForm/StudyPlanForm";
import SlidingPaneUtil from "../../utils/SlidingPaneUtil";
import { getStudyPlan } from "../../service/StudyPlanService";
import { setStudyData } from "../../store/slices/StudyPlanSlice";
import { useNavigate } from "react-router-dom";
import refresh from "../../assets/icons/up-down.png";
import StudyPlanInfo from "./StudyPlanInfo/StudyPlanInfo";
import print from "../../assets/icons/print.png";
import { useReactToPrint } from "react-to-print";
import { setPerantId } from "../../store/slices/StudyPlanSlice";
import { CircleLoader, ScaleLoader } from "react-spinners";
import { setPrinting } from "../../store/slices/StudyPlanSlice";
import userInfo from "../../utils/userInfo";
import BottomSheet from "../../components/BottomSheet/BottomSheet";

const StudyPlanPage = () => {
  // states
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [searchByTitle, setSearchByTitle] = useState("");
  const [ascending, setAscending] = useState(true);

  const user = userInfo();

  // functions
  const [state, setState] = useState({
    isPaneOpen: false,
  });

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      let response = await getStudyPlan(data);

      dispatch(
        setStudyData({
          studyPlan: response.data,
        })
      );
      setData(response.data);
    } catch (error) {}
  };

  const myStudyPlan = useSelector((state) => state.study.studyPlan);

  useEffect(() => {
    getData();
    setRender(false);
  }, [render]);

  // search

  const handleSearch = useCallback((e, setState) => {
    setState(e.target.value);
  }, []);

  useEffect(() => {
    const filteredData = myStudyPlan?.filter((elem) =>
      elem?.direction.toLowerCase()?.includes(searchByTitle.toLowerCase())
    );
    setData(filteredData);
  }, [searchByTitle]);

  const handleReverseTitle = () => {
    const newFiltered = [...data].sort((a, b) => {
      if (ascending) {
        return a.direction.localeCompare(b.direction);
      } else {
        return b.direction.localeCompare(a.direction);
      }
    });

    setData(newFiltered);
    setAscending(!ascending);
  };

  const handleReverseYear = () => {
    const sortedData = [...data].sort((a, b) => {
      if (!ascending) {
        return a.start_year > b.start_year ? 1 : -1;
      } else {
        return a.start_year > b.start_year ? -1 : 1;
      }
    });

    setData(sortedData);
    setAscending(!ascending);
  };

  // separators
  const handleSetMine = () => {
    const filteredData = [...myStudyPlan].filter(
      (elem) => elem?.creator_id === user?.employeeId
    );
    setData(filteredData);
  };

  const handleSetOther = () => {
    const filteredData = [...myStudyPlan];
    setData(filteredData);
  };

  return (
    <Layout>
      <div className={styles.study_plan__wrapper}>
        <div className={styles.study_plan__header}>
          <div className={styles.title}>
            <span style={{ color: "#090909", cursor: "pointer" }}>
              Учебный план
            </span>
            <div className={styles.separator_btns}>
              <button onClick={handleSetMine}>Созданные мной</button>
              <button onClick={handleSetOther}>Все</button>
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", columnGap: "10px" }}
          >
            <div className={styles.searh_box}>
              <input
                type="search"
                placeholder="По направлению"
                value={searchByTitle}
                onChange={(e) => handleSearch(e, setSearchByTitle)}
              />
            </div>
            <button
              style={{ padding: "9px" }}
              onClick={() => setState({ isPaneOpen: true })}
            >
              Создать РУП
            </button>
          </div>
        </div>
        <div className={styles.study_plan__body}>
          {data?.length === 0 ? (
            <h3 style={{ color: "black" }}>Учебный план пуст</h3>
          ) : (
            <>
              <table className={styles.table__wrapper}>
                <thead className={styles.table__head}>
                  <tr className={styles.table__row}>
                    <th className={styles.table__item}>
                      <div className={styles.refresh_btn}>
                        <p>Направление</p>
                        <button onClick={handleReverseTitle}>
                          <img src={refresh} alt="" />
                        </button>
                      </div>
                    </th>
                    <th className={styles.table__item}>Количество предметов</th>
                    <th className={styles.table__item}>Количество семестров</th>
                    <th className={styles.table__item}>
                      <div className={styles.refresh_btn}>
                        <p>Год</p>
                        <button
                          className={styles.refresh_btn}
                          onClick={handleReverseYear}
                        >
                          <img src={refresh} alt="" />
                        </button>
                      </div>
                    </th>
                    <th className={styles.table__item}>Создал</th>
                  </tr>
                </thead>
                <tbody className={styles.table__body}>
                  {data?.map((item, index) => {
                    return (
                      <tr
                        className={styles.table__row}
                        onClick={() => navigate(`/study-plan/${item.id}/`)}
                      >
                        <td className={styles.table__item}>
                          <span>{item?.direction}</span>
                        </td>

                        <td className={styles.table__item}>
                          <span>{item?.subjects_count}</span>
                        </td>
                        <td className={styles.table__item}>
                          <span>{item?.semester_count}</span>
                        </td>
                        <td className={styles.table__item}>
                          <span>
                            {item.start_year} - {item.end_year} гг{" "}
                          </span>
                        </td>
                        <td className={styles.table__item}>
                          {item?.employee_name}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>

      {width > 1000 ? (
        <>
          <BottomSheet
            title={"Новый учебный план"}
            isOpen={state.isPaneOpen}
            onClose={setState}
          >
            <StudyPlanForm setRender={setRender} setState={setState} />
          </BottomSheet>
        </>
      ) : (
        <>
          <SlidingPaneUtil
            size="100%"
            title="Новый учебный план"
            state={state}
            setState={setState}
          >
            {" "}
            <StudyPlanForm setRender={setRender} setState={setState} />
          </SlidingPaneUtil>
        </>
      )}

      <Notification notify={notify} setNotify={setNotify} />
    </Layout>
  );
};

export default StudyPlanPage;
