import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../../components";
import { getKpiReport } from "../../../../../../service/PublicationService";
import { setKpiReport } from "../../../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import styles from "./KpiInstitute.module.scss";

export default function KpiInstitute() {
  // states
  let data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [render, setRender] = useState(false);
  // getReport
  const getInstitute = async () => {
    try {
      let response = await getKpiReport(data);
      dispatch(
        setKpiReport({
          KpiReport: response.data,
        })
      );
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getInstitute();
    setRender(false);
  }, [render]);

  const reports = useSelector((state) => state.publications.KpiReport);
  const institutes = reports?.institutes;

  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) ~ :not(style)": {
      marginTop: "0px",
    },
  }));
  return (
    <Layout>
      <div className={styles.institute_wrapper}>
        <Divider>Все институты</Divider>
        <div className={styles.institute_close}>
          <button onClick={() => navigate(-1)}>Закрыть</button>
        </div>
        <div className={styles.institute_body}>
          {institutes?.length !== 0 ? (
            <div className={styles.institutes_parent}>
              {institutes?.map((item) => (
                <div
                  className={styles.institutes_child}
                  key={item?.id}
                  onClick={() => navigate(`/institute-department/${item?.id}`)}
                >
                  <p>{item?.title_faculty}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Нету институтов</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
