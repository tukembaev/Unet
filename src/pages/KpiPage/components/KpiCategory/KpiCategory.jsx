import React from "react";
import { getCategoryKpiNested } from "../../../../service/PublicationService";
import { setKpiCategory } from "../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./KpiCategory.module.scss";

import userInfo from "../../../../utils/userInfo";
import KpiDirectorPublick from "../KpiPublick/KpiDirectorPublick/KpiDirectorPublick";
import KpiEmployeePublick from "../KpiPublick/KpiEmployeePublick/KpiEmployeePublick";
import KpiIsHeadOfPublick from "../KpiPublick/KpiIsHeadOfPublick/KpiIsHeadOfPublick";

export default function KpiCategory({ kpyTitle, categoryId , isDirector , isHeadOf}) {
  // states
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);
  let data;
  const user = userInfo();
  // functions
  const getData = async (id) => {
    try {
      let response = await getCategoryKpiNested(id, data);
      return response.data;
    } catch (error) {
      console.log(error.response);
      return [];
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const promises = kpyTitle?.map((item) => getData(item.id));
      try {
        const array = await Promise.all(promises);

        dispatch(
          setKpiCategory({
            kpiCategory: array,
          })
        );
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
    setRender(false);
  }, [kpyTitle, dispatch, render]);
  const kpiCategory = useSelector((state) => state.publications.kpiCategory);
  return (
    <>
      {kpiCategory?.map((item) => {
        const key = Number(Object.keys(item)[0]);
        return (
          <>
            {item[key]?.map((link) => {
              return key === categoryId &&
                link?.kpi.length !== 0 &&
                link?.kpi?.map((item) => item?.creator_name).includes(`${user?.surName} ${user?.firstName}`) ? (
                <div className={styles.item__box}>
                  <p className={styles.item__title}>{link?.label}</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "20px",
                    }}
                  >
                    <hr />
                    {
                      user?.is_head_of === true ? (
                        <KpiIsHeadOfPublick  setRender={setRender} data={link.kpi} isHeadOf={isHeadOf} />
                      ) : user?.position === "Директор" ? (
                        <KpiDirectorPublick  setRender={setRender} data={link.kpi}  isDirector ={isDirector} />
                      ) : (
                        <KpiEmployeePublick  setRender={setRender} data={link.kpi} />
                      )
                    }
                  </div>
                </div>
              ) : null;
            })}
          </>
        );
      })}
    </>
  );
}
