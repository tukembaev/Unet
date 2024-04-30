import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../../components";
import { getKpiReport } from "../../../../../../service/PublicationService";
import { setKpiReport } from "../../../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import styles from "./KpiCenter.module.scss";
export default function KpiCenter() {
  // states
  let data;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [render, setRender] = useState(false);
  // getReport
  const getCenter = async () => {
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
    getCenter();
    setRender(false);
  }, [render]);

  const reports = useSelector((state) => state.publications.KpiReport);
  const centers = reports?.center;

  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    "& > :not(style) ~ :not(style)": {
      marginTop: "0px",
    },
  }));
  return (
    <Layout>
      <div className={styles.center_wrapper}>
        <Divider>Все сентры</Divider>
        <div className={styles.center_close}>
          <button onClick={() => navigate(-1)}>Закрыть</button>
        </div>
        <div className={styles.center_body}>
          {centers?.length !== 0 ? (
            <div className={styles.center_parent}>
              {centers?.map((item) => (
                <div
                  className={styles.center_child}
                  key={item?.id}
                  onClick={() => navigate(`/center-employee/${item?.id}`)}
                >
                  <p>{item?.center_name}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
