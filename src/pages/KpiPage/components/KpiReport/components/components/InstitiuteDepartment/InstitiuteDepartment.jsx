import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../../../components";
import { getKpiDepartment, getKpiInsititutions, getKpiReport } from "../../../../../../../service/PublicationService";
import { setKpiReport } from "../../../../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import styles from "./InstitiuteDepartment.module.scss";
import { ScaleLoader } from "react-spinners";

export default function InstitiuteDepartment() {
  // states
  let [data,setData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [render, setRender] = useState(false);
  // getReport
  const getInstitute = async () => {
    try {
      let response = await getKpiDepartment(id,data);
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
    getInstitute();
    setRender(false);
  }, [render]);

  const reports = useSelector((state) => state.publications.KpiReport);
  const institutes = reports?.institutes;
  const departments = data?.filter((item) => item?.id == id);

  return (
    <Layout>
      <div className={styles.department_wrapper}>
        <Divider>Все Кафедры</Divider>
        <div className={styles.department_close}>
          <button onClick={() => navigate(-1)}>Закрыть</button>
        </div>
        <div className={styles.department_body}>
          {data ? (
            <>
              {data.length !== 0  ? (
                <div className={styles.department_parent}>
                  {data?.map((item) => (
                    <div
                      className={styles.department_child}
                      key={item?.id}
                      onClick={() =>
                        navigate(`/institute-employee/${id},${item.id}/`)
                      }
                    >
                      <p>{item?.departament_name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Нет данных</p>
              )}
            </>
          ) : <div style={{width:'50%', marginLeft: '50%'}}><ScaleLoader/></div>}
        </div>
      </div>
    </Layout>
  );
}
