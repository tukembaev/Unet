import React from "react";
import styles from "./DivisionEmployee.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../../../components";
import { getKpiDivisions, getKpiReport } from "../../../../../../../service/PublicationService";
import { setKpiReport } from "../../../../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

export default function DivisionEmployees() {
  // states
  let [data,setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const { id } = useParams();

  // getReport
  const getEmployee = async () => {
    try {
      let response = await getKpiDivisions(data);
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
    getEmployee();
    setRender(false);
  }, [render]);

  const reports = useSelector((state) => state.publications.KpiReport);
  const divisions = reports?.divisions;
  const employee = divisions?.filter((item) => item?.id === Number(id));

  return (
    <Layout>
      <div className={styles.employee_wrapper}>
        <Divider>Все сотрудники</Divider>
        <div className={styles.employees_close}>
          <button onClick={() => navigate(-1)}>Закрыть</button>
        </div>
        <div className={styles.employee_body}>
        
            <>
              {data?.length !== 0 ? (
                <div className={styles.employee_parent}>
                  {data?.map((item) => (
                    <div className={styles.employee_child} key={item?.user_id}>
                      <img src={item?.photo} alt="" />
                      <p>{item?.label}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Нет данных</p>
              )}
            </>
       
        </div>
      </div>
    </Layout>
  );
}
