import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../../../components";
import { getKpiCenters, getKpiReport } from "../../../../../../../service/PublicationService";
import { setKpiReport } from "../../../../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import styles from "./CenterEmployee.module.scss";
import { ScaleLoader } from "react-spinners";

export default function CenterEmployee() {
  // states
  let [data, setData] =useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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
      
    }
  };

  useEffect(() => {
    getCenter();
    setRender(false);
  }, [render]);


  return (
    <Layout>
      <div className={styles.employee_wrapper}>
        <Divider>Все сотрудники</Divider>
        <div className={styles.employees_close}>
          <button onClick={() => navigate(-1)}>Закрыть</button>
        </div>
        <div className={styles.employee_body}>
          {employee ? (
            <>
              {/* {employee[0]?.employees?.length !== 0 ? (
                <div className={styles.employee_parent}>
                  {employee[0]?.employees?.map((item) => (
                    <div className={styles.employee_child} key={item?.user_id}>
                      <img src={item?.photo} alt="" />
                      <p>{item?.label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Нет данных</p>
              )} */}
              <p>dasf</p>
            </>
          ) :  <div style={{width:'50%', marginLeft: '50%'}}><ScaleLoader/></div>}
        </div>
      </div>
    </Layout>
  );
}
