import React, { useEffect, useState } from "react";
import styles from "./LoadPage.module.scss";
import { Layout } from "../../components";
import { getDisciplineInfo } from "../../service/DisciplineService";
import userInfo from "../../utils/userInfo";
import LoadTable from "./LoadTable";
import { getLoad } from "../../service/LoadService";
import LoadStudentTable from "./LoadStudentTable";
const LoadPage = () => {
  const user = userInfo();
  const [id, setId] = useState({
    subject_id: "",
    subject_name: "",
    subject_stream: "",
  });
  let [dataDiscrip, setDiscrip] = useState("");
  const [render, setRender] = useState(false);
  const [renderTheme, setRenderTheme] = useState(false);
  const [back, goBack] = useState(false);
  const [data, setData] = useState();
  const getData = async () => {
    try {
      let response = await getLoad(data);
      setData(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getData();
  }, [render]);



  const getDataInfo = async () => {
    try {
      let response = await getDisciplineInfo(id.subject_id, dataDiscrip);

      setDiscrip(response.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getDataInfo();
    setRenderTheme(false);
  }, [id, renderTheme]);

  useEffect(() => {
    setDiscrip("");
    setId({ subject_id: "", subject_name: "", subject_stream: "" });
    goBack(false);
  }, [back]);

  return (
    <Layout>
      <div className={styles.wrapper}>
        <div className={styles.titile__wrapper}>
          <div className={styles.title}>
            {" "}
            {id.subject_name === "" ? (
              "Нагрузка"
            ) : (
              <>
                <button
                  style={{ marginRight: "10px" }}
                  className={styles.btn_pin}
                  onClick={() =>
                    setId({
                      subject_id: "",
                      subject_name: "",
                      subject_stream: "",
                    })
                  }
                >
                  Назад
                </button>
                {id.subject_name}
              </>
            )}{" "}
          </div>
        </div>

        <div style={{ padding: "0 15px 0 0" }}>
          {id.subject_id === "" && user.user_type === "E" ? (
            <LoadTable data={data} setRender={setRender} setId={setId} />
          ) : null}
          {id.subject_stream !== "" ? (
            <LoadStudentTable setId={setId} id={id.subject_stream} />
          ) : (
            ""
          )}
        </div>
      </div>
    </Layout>
  );
};

export default LoadPage;
