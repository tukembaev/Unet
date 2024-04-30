import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../components";
import { getKpiInsititutions, getKpiReport } from "../../../../../service/PublicationService";
import { setKpiReport } from "../../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import styles from "./KpiInstitute.module.scss";
import { ScaleLoader } from "react-spinners";

export default function KpiInstitute() {
  // states
  let [data,setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [render, setRender] = useState(false);
  // getReport
  const getInstitute = async () => {
    try {
      let response = await getKpiInsititutions(data);
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

  const filteredData = data?.filter((item) => item !== null);
 
  return (
    <Layout>
      <div className={styles.institute_wrapper}>
        <Divider>Все институты</Divider>
        <div className={styles.institute_close}>
          <button onClick={() => navigate(-1)}>Закрыть</button>
        </div>
        <div className={styles.institute_body}>
          {data?.length !== 0 ? (
            <div className={styles.institutes_parent}>
              {filteredData?.map((item) => (
                <div
                  className={styles.institutes_child}
                  key={item?.id}
                  style={{display: 'flex', justifyContent: 'space-between'}}
                  onClick={() => navigate(`/institute-department/${item?.id}`)}
                >
                  <p>{item?.title_faculty}</p>
                  <div>
                    <span style={{display: 'flex'}}><p style={{color: 'red'}}>{item?.scores?.split('/')[0]}</p>/<p style={{color: 'green'}}>{item?.scores?.split('/')[1]}</p></span>
                    
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{width:'50%', marginLeft: '50%'}}>

              <ScaleLoader color="grey" />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
