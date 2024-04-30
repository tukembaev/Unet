import React from "react";
import styles from "./PieChartsLine.module.scss";
import PieChart from "react-minimal-pie-chart";

const PieChartsLine = ({ data }) => {
  const dataOrders = [
    { title: "Завершенные", value: data?.orders_percent, color: "#18AF55" },
    {
      title: "В процессе выполнения",
      value: 100 - data?.orders_percent,
      color: "#FFB03A",
    },
  ];
  const dataTask = [
    { title: "Завершенные", value: data?.tasks_percent, color: "#18AF55" },
    {
      title: "В процессе выполнения",
      value: 100 - data?.tasks_percent,
      color: "#FFB03A",
    },
  ];
  const dataObr = [
    {
      title: "Завершенные",
      value: data?.conversions_percent,
      color: "#18AF55",
    },
    {
      title: "В процессе выполнения",
      value: 100 - data?.conversions_percent,
      color: "#FFB03A",
    },
  ];

  return (
    <div className={styles.pie_chats_col}>
      <div className={styles.pie_chats_line}>
        <div className={styles.single_pie}>
          <div className={styles.single_pie}>
            <div className={styles.pie_size}>
              <PieChart
                animate
                animationDuration={1000}
                animationEasing="ease-in"
                center={[20, 20]}
                data={dataOrders}
                lengthAngle={360}
                lineWidth={21}
                paddingAngle={0}
                radius={50}
                startAngle={0}
                label={null}
                labelPosition={60}
                labelStyle={{
                  fontSize: "12px",
                  fontColor: "FFFFFA",
                  fontWeight: "800",
                }}
                style={{
                  width: "123px",
                  heigth: "123px",
                  marginLeft: "12px",
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
          <h5>Приказы</h5>
          <h5>
            {data?.orders} ({data?.orders_percent}%){" "}
          </h5>
        </div>

        <div className={styles.single_pie}>
          <div className={styles.single_pie}>
            <div className={styles.pie_size}>
              <PieChart
                animate
                animationDuration={1000}
                animationEasing="ease-in"
                center={[20, 20]}
                data={dataTask}
                lengthAngle={360}
                lineWidth={21}
                paddingAngle={0}
                radius={50}
                startAngle={0}
                label={null}
                labelPosition={20}
                labelStyle={{
                  fontSize: "12px",
                  fontColor: "FFFFFA",
                  fontWeight: "800",
                }}
                style={{
                  width: "123px",
                  heigth: "123px",
                  marginLeft: "12px",
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
          <h5>Задачи</h5>
          <h5>
            {data?.tasks} ({data?.tasks_percent}%)
          </h5>
        </div>

        <div className={styles.single_pie}>
          <div className={styles.single_pie}>
            <div className={styles.pie_size}>
              <PieChart
                animate
                animationDuration={1000}
                animationEasing="ease-in"
                center={[20, 20]}
                data={dataObr}
                lengthAngle={360}
                lineWidth={21}
                paddingAngle={0}
                radius={50}
                startAngle={0}
                label={null}
                labelPosition={60}
                labelStyle={{
                  fontSize: "12px",
                  fontColor: "FFFFFA",
                  fontWeight: "800",
                }}
                style={{
                  width: "123px",
                  heigth: "123px",
                  marginLeft: "12px",
                  marginTop: "10px",
                }}
              />
            </div>
          </div>
          <h5>Обращения</h5>
          <h5>
            {data?.conversions} ({data?.conversions_percent}%)
          </h5>
        </div>
      </div>
    </div>
  );
};

export default PieChartsLine;
