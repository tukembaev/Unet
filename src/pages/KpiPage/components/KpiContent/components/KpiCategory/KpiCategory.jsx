import React from "react";
import styles from "./KpiCategory.module.scss";
import KpiPublick from "../KpiPublick/KpiPublick";

export default function KpiCategory({ data , setRender , setNotify , cantChange}) {
  // states
  
  return (
    <React.Fragment>
      {data?.length !== 0 ? (
        <div className={styles.category__parent}>
          {data?.map((item) => (
            <>
            {
              item?.kpi?.length !== 0 && (
                <div className={styles.category__child} key={item?.id}>
                  <p className={styles.category__title}>{item?.title}</p>
                  <div className={styles.category__publicks}>
                    <KpiPublick publiucks={item?.kpi} setRender={setRender} setNotify={setNotify} cantChange = {cantChange}/>
                  </div>
                </div>
              )
            }
            </>
          ))}
        </div>
      ) : null}
    </React.Fragment>
  );
}
