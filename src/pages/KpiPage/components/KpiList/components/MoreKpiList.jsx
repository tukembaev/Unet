import React from "react";
import styles from "./MoreKpiList.module.scss";
import { Divider } from "@mui/material";
import { Layout } from "../../../../../components";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import SlidingPaneUtil from "../../../../../utils/SlidingPaneUtil";
import { useState , useEffect } from "react";
import KpiListForm from "../../../../../components/Forms/KpiForm/components/KpiListForm/KpiListForm";

const MoreKpiList = () => {
  // states
  const naviate = useNavigate();
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });
  const [render , setRender] = useState(false);
  // functionos
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
                <tr className={styles.table__row}>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>Tbody</span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>Tbody</span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>Tbody</span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>Tbody</span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>Tbody</span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>Tbody</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.rest_list}>
            <div className={styles.list_btns}>
              <button className={styles.list_btn} onClick={() => naviate(-1)}>
                Назад
              </button>
              <button className={styles.list_btn}
              onClick={() => setState({ isPaneOpen: true })}
              >Заполнить</button>
            </div>
          </div>
        </div>
        <>
            {width > 600 ? (
              <SlidingPaneUtil
                size="50%"
                title="Создать KPI"
                state={state}
                setState={setState}
              >
                <KpiListForm setRender={setRender} setState={setState}/>
              </SlidingPaneUtil>
            ) : (
              <SlidingPaneUtil
                size="100%"
                title="Создать KPI"
                state={state}
                setState={setState}
              >
             <KpiListForm setRender={setRender} setState={setState}/>
              </SlidingPaneUtil>
            )}
          </>
      </Root>
    </Layout>
  );
};

export default MoreKpiList;
