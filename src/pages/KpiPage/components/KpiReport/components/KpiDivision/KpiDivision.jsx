import React from "react";
import styles from "./KpiDivision.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../../components";
import { getKpiReport } from "../../../../../../service/PublicationService";
import { setKpiReport } from "../../../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

export default function KpiDivision() {
  // states
  let data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [render, setRender] = useState(false);
  // getReport
  const getDivision = async () => {
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
    getDivision();
    setRender(false);
  }, [render]);

  const reports = useSelector((state) => state.publications.KpiReport);
  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) ~ :not(style)": {
      marginTop: "0px",
    },
  }));

  return (
    <Layout>
      <div className={styles.division_wrapper}>
        <Divider>Все отделы</Divider>
        <div className={styles.division_close}>
          <button onClick={() => navigate(-1)}>Закрыть</button>
        </div>
        <div className={styles.divisions_body}>
          {reports?.divisions?.length !== 0 ? (
            <div className={styles.division_parent}>
              {reports?.divisions?.map((item) => (
                <div
                  key={item?.id}
                  className={styles.division_child}
                  onClick={() => navigate(`/division-employee/${item?.id}`)}
                >
                  <p>{item?.division_name}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.division_null}>Нету отделов</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
