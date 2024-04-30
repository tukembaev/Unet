import React from "react";
import styles from "./AllKpiList.module.scss";
import { Divider } from "@mui/material";
import { Layout } from "../../../../../components";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import SlidingPaneUtil from "../../../../../utils/SlidingPaneUtil";
import { useState, useEffect } from "react";
import KpiListForm from "../../../../../components/Forms/KpiForm/components/KpiListForm/KpiListForm";
import userInfo from "../../../../../utils/userInfo";
import { getKpiList } from "../../../../../service/PublicationService";
import { setKpiList } from "../../../../../store/slices/PublicationSlice";
import { useSelector, useDispatch } from "react-redux";

const AllKpiList = () => {
  // states
  let data;
  const navigate  = useNavigate();
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [render, setRender] = useState(false);
  const user = userInfo();
  const id = user?.employeeId;
  const dispatch = useDispatch();
  const [isHeadOf, setIsHeadOf] = useState(false);
  const [isDirector, setIsDirector] = useState(false);

  // functionos

  const getData = async () => {
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
    getData();
    setRender(false);
  }, [render]);

  const kpiList = useSelector((state) => state.publications.kpiList);
  
  const employeeList = kpiList.filter(
    (item) => item?.position === "Сотрудника"
  );

  const HeadOfList = kpiList.filter(
    (item) => item?.position === "Заведуйщий кафедры"
  );
  const DirectorList = kpiList.filter((item) => item?.position === "Директор");

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




  return (
    <Layout>
      <Root>
        <div className={styles.list_wrapper}>
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

          <Divider>Kpi List</Divider>
          <div className={styles.list_table}>
            <table className={styles.table__wrapper}>
              <thead className={styles.table__head}>
                <tr className={styles.table__row}>
                  <th className={styles.table__item}>
                    <span className={styles.table__title}>№</span>
                  </th>
                  <th className={styles.table__item}>
                    <span className={styles.table__title}>Наименование</span>
                  </th>
                  <th className={styles.table__item}>
                    <span className={styles.table__title}>
                      Плановое значение
                    </span>
                  </th>
                  <th className={styles.table__item}>
                    <span className={styles.table__title}>
                      Фактическое значение
                    </span>
                  </th>
                  <th className={styles.table__item}>
                    <span className={styles.table__title}>
                      Индекс достижения (ИД)
                    </span>
                  </th>
                  <th className={styles.table__item}>
                    <span className={styles.table__title}>
                      Независимая оценка{" "}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className={styles.table__body}>
                {user?.is_head_of === true ? (
                  <>
                    {isHeadOf ? (
                      <>
                        {HeadOfList?.length !== 0 ? (
                          <>
                            {HeadOfList?.map((item, index) => (
                              <tr className={styles.table__row}  key={item?.id}>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {index + 1}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.category_name}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.planned_value}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.actual}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.goal_achievement}%
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}></span>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <div className={styles.empty}>
                            <p>Таблица не заполнена</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {employeeList?.length !== 0 ? (
                          <>
                            {employeeList?.map((item, index) => (
                              <tr className={styles.table__row}  key={item?.id}>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {index + 1}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.category_name}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.planned_value}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.actual}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.goal_achievement}%
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}></span>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <div className={styles.empty}>
                            <p>Таблица не заполнена</p>
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : user?.position === "Директор" ? (
                  <>
                    {isDirector ? (
                      <>
                        {DirectorList?.length !== 0 ? (
                          <>
                            {DirectorList?.map((item, index) => (
                              <tr className={styles.table__row}  key={item?.id}>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {index + 1}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.category_name}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.planned_value}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.actual}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.goal_achievement}%
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}></span>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <div className={styles.empty}>
                            <p>Таблица не заполнена</p>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        {employeeList?.length !== 0 ? (
                          <>
                            {employeeList?.map((item, index) => (
                              <tr className={styles.table__row}  key={item?.id}>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {index + 1}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.category_name}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.planned_value}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.actual}
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}>
                                    {item?.goal_achievement}%
                                  </span>
                                </td>
                                <td className={styles.table__item}>
                                  <span className={styles.table__title}></span>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <div className={styles.empty}>
                            <p>Таблица не заполнена</p>
                          </div>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {employeeList?.length !== 0 ? (
                      <>
                        {employeeList?.map((item, index) => (
                          <tr className={styles.table__row} key={item?.id}>
                            <td className={styles.table__item}>
                              <span className={styles.table__title}>
                                {index + 1}
                              </span>
                            </td>
                            <td className={styles.table__item}>
                              <span className={styles.table__title}>
                                {item?.category_name}
                              </span>
                            </td>
                            <td className={styles.table__item}>
                              <span className={styles.table__title}>
                                {item?.planned_value}
                              </span>
                            </td>
                            <td className={styles.table__item}>
                              <span className={styles.table__title}>
                                {item?.actual}
                              </span>
                            </td>
                            <td className={styles.table__item}>
                              <span className={styles.table__title}>
                                {item?.goal_achievement}%
                              </span>
                            </td>
                            <td className={styles.table__item}>
                              <span className={styles.table__title}></span>
                            </td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <div className={styles.empty}>
                        <p>Таблица не заполнена</p>
                      </div>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.rest_list}>
            <div className={styles.list_btns}>
              <button className={styles.list_btn} onClick={() => navigate(-1)}>
                Назад
              </button>
              <button
                className={styles.list_btn}
                onClick={() => setState({ isPaneOpen: true })}
              >
                Заполнить
              </button>
            </div>
          </div>
        </div>
        <>
          {width > 1000 ? (
            <SlidingPaneUtil
              size="50%"
              title="Создать KPI"
              state={state}
              setState={setState}
            >{" "}
              <KpiListForm setRender={setRender} setState={setState} />{" "}
            </SlidingPaneUtil>
          ) : (
            <SlidingPaneUtil
              size="100%"
              title="KPI"
              state={state}
              setState={setState}
            >{" "}
              <KpiListForm setRender={setRender} setState={setState} />{" "}
            </SlidingPaneUtil>
          )}
        </>
      </Root>
    </Layout>
  );
};

export default AllKpiList;
