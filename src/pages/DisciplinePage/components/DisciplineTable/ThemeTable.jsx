import React, { useState, useEffect } from "react";
import styles from "./../../../FlowPage/components/FlowPageTable/FlowPageTable.module.scss";
import { Button } from "../../../../components";
import SlidingPaneUtil from "../../../../utils/SlidingPaneUtil";
import ThemeForm from "../../../../components/Forms/ThemeForm/ThemeForm";
import userInfo from "../../../../utils/userInfo";

const ThemeTable = ({ data, setRenderTheme, subject, goBack }) => {
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
  });

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  const user = userInfo();

  return (
    <div>
      {data?.length === 0 ? (
        <h2 style={{ color: "black", marginLeft: "15px" }}>Список тем пуст</h2>
      ) : (
        <table className={styles.table__wrapper}>
          <thead className={styles.table__head}>
            <tr className={styles.table__row}>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Тема</span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Описание</span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Часы</span>
              </th>
              <th className={styles.table__item}>
                <span className={styles.table__title}>Файл</span>
              </th>
            </tr>
          </thead>
          <tbody className={styles.table__body}>
            {data?.map((item, index) => {
              return (
                <tr key={index} className={styles.table__row}>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>{item.theme}</span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {item.description}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    <span className={styles.table__title}>
                      {item.theme_hours}
                    </span>
                  </td>
                  <td className={styles.table__item}>
                    {item.file === null ? (
                      "Отсутствует"
                    ) : (
                      <a href={item.file} download>
                        Скачать{" "}
                      </a>
                    )}

                    {/* <span className={styles.table__title}>
                    
                  </span> */}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div>
        <Button
          onClick={() => goBack(true)}
          style={{ marginTop: "15px" }}
          className={styles.btn_pin_close}
        >
          Назад
        </Button>
        {user.user_type !== "S" ? (
          <Button
            style={{ marginTop: "15px" }}
            className={styles.btn_pin_close}
            onClick={() => setState({ isPaneOpen: true })}
          >
            Добавить тему
          </Button>
        ) : (
          ""
        )}
      </div>
      {width > 1000 ? (
        <>
          <SlidingPaneUtil
            size="900px"
            title="Новая тема"
            state={state}
            setState={setState}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              setState({ isPaneOpen: false });
            }}
          >
            {" "}
            <ThemeForm
              subject={subject}
              setRenderTheme={setRenderTheme}
              setState={setState}
            />
            {/* <AddEmployeeForm data = {state.isSubbranch ? state.subbranch : node}/> */}
          </SlidingPaneUtil>
        </>
      ) : (
        <>
          <SlidingPaneUtil
            size="100%"
            title="Новая тема"
            state={state}
            setState={setState}
            onRequestClose={() => {
              // triggered on "<" on left top click or on outside click
              setState({ isPaneOpen: false });
            }}
          >
            {" "}
            <ThemeForm
              subject={subject}
              setRenderTheme={setRenderTheme}
              setState={setState}
            />
        
          </SlidingPaneUtil>
        </>
      )}
    </div>
  );
};

export default ThemeTable;
