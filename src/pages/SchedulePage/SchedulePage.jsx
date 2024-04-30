import React, { useEffect, useState } from "react";
import { getSchedules } from "../../service/ScheduleService";
import { Layout } from "../../components";
import styles from "./SchedulePage.module.scss";
import ScheduleCard from "./components/ScheduleCard";
import SheduleSubject from "./components/SheduleSubject/SheduleSubject";

const SchedulePage = () => {
  // states
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const [render, setRender] = useState(false);
  const [subject, setSubject] = useState(null);
  // functions

  const getData = async () => {
    try {
      let response = await getSchedules(data);
      setData(response.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getData();
  }, [render]);

  const getSubject = (value) => {
    setSubject(value);
  };

  return (
    <Layout>
      <div>
        <h1 style={{ paddingLeft: "15px", color: "white" }}>Расписание</h1>

        {isOpen ? (
          <SheduleSubject subject={subject} setClose={setIsOpen} />
        ) : (
          <div className={styles.schedule_wrapper}>
            <div className={styles.schedule_section}>
              <ScheduleCard
                getSubject={getSubject}
                setOpen={setIsOpen}
                title={"Понедельник"}
                data={data?.monday}
              />
            </div>
            <div className={styles.schedule_section}>
              <ScheduleCard
                getSubject={getSubject}
                setOpen={setIsOpen}
                title={"Вторник"}
                data={data?.tuesday}
              />
            </div>
            <div className={styles.schedule_section}>
              <ScheduleCard
                getSubject={getSubject}
                setOpen={setIsOpen}
                title={"Среда"}
                data={data?.wednesday}
              />
            </div>
            <div className={styles.schedule_section}>
              <ScheduleCard
                getSubject={getSubject}
                setOpen={setIsOpen}
                title={"Четверг"}
                data={data?.thursday}
              />
            </div>
            <div className={styles.schedule_section}>
              <ScheduleCard
                getSubject={getSubject}
                setOpen={setIsOpen}
                title={"Пятница"}
                data={data?.friday}
              />
            </div>
            <div className={styles.schedule_section}>
              <ScheduleCard
                getSubject={getSubject}
                setOpen={setIsOpen}
                title={"Суббота"}
                data={data?.saturday}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SchedulePage;
