import React from "react";
import styles from "./AllDataPercentage.module.scss";
import PieChart from "react-minimal-pie-chart";
const AllDataPercentage = ({ data }) => {
  const dataType = [
    { title: "Приказы", value: data?.orders, color: "#5EE173" },
    // { title: 'Приказы', value: data?.percent?.order, color: 'rgba(24, 175, 85, 0.41)' },
    { title: "KPI", value: data?.kpi, color: "#3A82EF" },
    // { title: 'Документы', value: data?.percent?.document, color: 'rgba(22, 137, 202, 0.37)' },
    { title: "Обращения", value: data?.conversions, color: "#FF495F" },
    { title: "Задачи", value: data?.tasks, color: " #FFB038" },
    { title: "Служба поддержки", value: data?.appeals, color: "      #EE3CD2" },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.right_side}>
        <div className={styles.pie_size}>
          <PieChart
            animate
            animationDuration={1000}
            animationEasing="ease-in"
            center={[20, 20]}
            data={dataType}
            lengthAngle={360}
            lineWidth={40}
            paddingAngle={5}
            radius={50}
            startAngle={0}
            labelPosition={66}
            labelStyle={{
              fontSize: "6px",
              fontColor: "FFFFFA",
              fontWeight: "800",
              lineHeight: "0.9em",
            }}
            style={{ width: "163px", heigth: "163px", marginTop: "10px" }}
          />
        </div>
        <div className={styles.bottom_side}>
          <div style={{ display: "flex", gap: "15px", textAlign: "left" }}>
            {" "}
            <span
              className={styles.square}
              style={{ backgroundColor: "#5EE173" }}
            ></span>{" "}
            Приказы <br /> {data?.orders}%
          </div>{" "}
          <div style={{ display: "flex", gap: "15px", textAlign: "left" }}>
            {" "}
            <span
              className={styles.square}
              style={{ backgroundColor: "#3A82EF" }}
            ></span>
            KPI <br /> {data?.kpi}%
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "25px" }}>
        <div style={{ display: "flex", gap: "15px", textAlign: "left" }}>
          {" "}
          <span
            className={styles.square}
            style={{ backgroundColor: "#FF495F" }}
          ></span>{" "}
          Обращения <br /> {data?.conversions}%
        </div>{" "}
        <div style={{ display: "flex", gap: "15px", textAlign: "left" }}>
          {" "}
          <span
            className={styles.square}
            style={{ backgroundColor: "#FFB038" }}
          ></span>
          Задачи <br /> {data?.tasks}%
        </div>
        <div style={{ display: "flex", gap: "15px", textAlign: "left" }}>
          {" "}
          <span
            className={styles.square}
            style={{ backgroundColor: "#EE3CD2" }}
          ></span>
          Служба поддержки <br /> {data?.appeals}%
        </div>
      </div>
    </div>
  );
};

export default AllDataPercentage;
