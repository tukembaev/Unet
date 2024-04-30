import React from 'react';
import styles from "./DivisionEmployee.module.scss"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { Layout } from '../../../../../../components';
import { getKpiReport } from '../../../../../../service/PublicationService';
import { setKpiReport } from '../../../../../../store/slices/PublicationSlice';
import { useState , useEffect } from 'react'; 
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";


export default function DivisionEmployee() {
    // states
  let data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const {id} = useParams();

   // getReport 
   const getEmployee = async () => {
    try {
      let response = await getKpiReport(data);
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
    getEmployee();
    setRender(false);
  }, [render]);

  const reports = useSelector((state) => state.publications.KpiReport);
  const divisions = reports?.divisions;
  const employee = divisions?.filter(item => item?.id === Number(id));

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
                 {
                    employee[0]?.employees?.length !== 0 ? (
                        <div className={styles.employee_parent}>
                           {
                            employee[0]?.employees?.map((item) =>(
                                <div className={styles.employee_child}>
                                    <img src={item?.photo} alt="" />
                                    <p>{item?.label}</p>
                                </div>
                            ))
                           }
                        </div>
                    ) : (
                        null
                    )
                }
                </>
              ) : (null)}
            </div>
        </div>
    </Layout>
  )
}
