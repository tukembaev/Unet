import React from "react";
import styles from "./KpiDivision.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../components";
import { getKpiDivisions } from "../../../../../service/PublicationService";
import { setKpiReport } from "../../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { ScaleLoader } from "react-spinners";
import { object } from "prop-types";

export default function KpiDivision() {
  // states
  let [data,setData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [render, setRender] = useState(false);
  // getReport
  const getDivision = async () => {
    try {
      let response = await getKpiDivisions(data);
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

  const divisions = data?.filter((elem) => elem)
 

  return (
    <Layout>
      <div className={styles.division_wrapper}>
        <Divider>Все отделы</Divider>
        <div className={styles.division_close}>
          <button onClick={() => navigate(-1)}>Закрыть</button>
        </div>
        <div className={styles.divisions_body}>
          {data ? (
            <div className={styles.division_parent}>
              
              {divisions?.map((item) => (
                <div
                  key={item?.id}
                  className={styles.division_child}
                  style={{display: 'flex', justifyContent: 'space-between'}}
                  onClick={() => navigate(`/division-employee/${item?.id}`)}
                >

                  <p>{item?.division_name}</p>
                  <div>
                    <span style={{display: 'flex'}}><p style={{color: 'red'}}>{item?.potential_points}</p>/<p style={{color: 'green'}}>{item?.score}</p></span>
                    
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // <p className={styles.division_null}>Нет отделов</p>
            <div style={{width:'50%', marginLeft: '50%'}}>

              <ScaleLoader color="grey" />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
