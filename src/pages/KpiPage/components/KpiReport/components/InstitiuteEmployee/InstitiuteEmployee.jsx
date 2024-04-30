import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../../components";
import { getKpiDepartment, getKpiInsititutions, getKpiReport } from "../../../../../../service/PublicationService";
import { setKpiReport } from "../../../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import styles from "./InstitiuteEmployee.module.scss";
import { ScaleLoader } from "react-spinners";
import { useCallback } from "react";

export default function InstitiuteEmployee() {
  // states
  let [data,setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const departament_id = id.split(',')
  const [render, setRender] = useState(false);
  const [searchEmployee , setSearchEmployee] = useState("");
  // getReport
  const getInstitute = async () => {
    try {
      let response = await getKpiDepartment(+departament_id[0],data);
      setData(response.data?.filter((elem) => elem.id == departament_id[1]))

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


  const handleSearch = useCallback((event) => {
    setSearchEmployee(event.target.value);
  }, []);

  // const employee = data?.filter((item) => item?.id == id);
  const filterEmployees = data[0]?.employees?.filter((employee) => employee?.label?.toLowerCase()?.includes(searchEmployee.toLowerCase()));

  return (
    <Layout>
      <div className={styles.employee_wrapper}>
        <Divider>Все сотрудники</Divider>
        <div className={styles.employees_close}>
          <button onClick={() => navigate(-1)}>Закрыть</button>
          <input
           placeholder="Поиск сотрудников"
          type="text"
          value={searchEmployee}
          onChange={handleSearch}
          />
        </div>
        <div className={styles.employee_body}>
        {data?.length !== 0 ? (<>
              {data[0]?.employees?.length !== 0 ? (
                <div style={{overflowX: 'auto'}}  className={styles.employee_parent}>
                    <div style={{display: 'flex', borderBottom: '1px solid #eee'}}>
                  <div style={{display: 'flex'}}>
                      <div className={styles.head__name}>
                        <p>Все </p>
                      </div>
                      <div className={styles.body__item}>
                        <p>B-1</p>
                      </div>
                      <div className={styles.body__item}>
                        <p>B-2</p>
                      </div>
                      <div className={styles.body__item}>
                        <p>B-3</p>
                      </div>
                      <div className={styles.body__item}>
                        <p>B-4</p>
                      </div>
                      <div className={styles.body__item}>
                        <p>B-5</p>
                      </div>
                      <div className={styles.body__item}>
                        <p>Общий балл</p>
                      </div>
                    </div>
                    </div>
                  {filterEmployees?.map((item) => (
                    
                    <div style={{display: 'flex', borderBottom: '1px solid #eee' , cursor:"pointer"}}
                    onClick={() => navigate(`/kpi-employee/${item.user_id}`)}
                    >
                      
                    <div className={styles.employee_child} key={item?.user_id}>
                      <img src={item?.photo} alt="" />
                      <p style={{width: '200px'}}>{item?.label}</p>
                    </div>
                    <div style={{display: 'flex'}}>

                    <div className={styles.body__item}>
                            <p style={{paddingLeft: '35px'}}>{item?.criteria_1}</p>
                          </div>
                          <div className={styles.body__item}>
                            <p style={{paddingLeft: '35px'}}>{item?.criteria_2}</p>
                          </div>
                          <div className={styles.body__item}>
                            <p style={{paddingLeft: '35px'}}>{item?.criteria_3}</p>
                          </div>
                          <div className={styles.body__item}>
                            <p style={{paddingLeft: '35px'}}>{item?.criteria_4}</p>
                          </div>
                          <div className={styles.body__item}>
                            <p style={{paddingLeft: '35px'}}>{item?.criteria_5}</p>
                          </div>
                          <div style={{paddingLeft: '55px', paddingTop: '17px'}} className={styles.body__item}>
                            <span style={{display: 'flex', alignItems: 'center', }}>

                            <p style={{padding: '0', color: 'red'}}>{item?.potential_points} </p> / <p style={{padding: '0', color: 'green'}}> {item?.score}</p>
                            </span>
                          </div>

                    </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Нет данных</p>
              )}
            </>) :  <div style={{width:'50%', marginLeft: '50%'}}><ScaleLoader/></div>}
        </div>
      </div>
    </Layout>
  );
}
