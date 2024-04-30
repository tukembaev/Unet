import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../components";
import { getKpiCenters } from "../../../../../service/PublicationService";
import { setKpiReport } from "../../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import styles from "./KpiCenter.module.scss";
import { ScaleLoader } from "react-spinners";
export default function KpiCenter() {
  // states
  let [data,setData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [render, setRender] = useState(false);
  // getReport
  const getCenter = async () => {
    try {
      let response = await getKpiCenters(data);
      setData(response.data)
      dispatch(
        setKpiReport({
          KpiReport: response.data,
        })
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getCenter();
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

  const centers = data?.filter((elem) => elem)
  return (
    <Layout>
      <div className={styles.center_wrapper}>
        <Divider>Все центры</Divider>
        <div className={styles.center_close}>
          <button onClick={() => navigate(-1)}>Закрыть</button>
        </div>
        <div className={styles.center_body}>

            <div className={styles.center_parent}>
              {data? (
                <>
                {centers.length !== 0 ? centers?.map((item) => (
                <div
                  className={styles.center_child}
                  key={item?.id}
                  onClick={() => navigate(`/center-employee/${item?.id}`)}
                >
                  <p>{item?.center_name}</p>
                </div>
              )) :
              <>
              <p>Нет данных</p>
              </>
            }
                
                </>
                ) : ((
            <div style={{width:'50%', marginLeft: '50%'}}>

              <ScaleLoader color="grey" />
            </div>
          ))}
              
            </div>

        </div>
      </div>
    </Layout>
  );
}
