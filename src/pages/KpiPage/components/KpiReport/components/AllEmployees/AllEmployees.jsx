import React from "react";
import styles from "../DivisionEmployee/DivisionEmployee.module.scss";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../../../../../../components";
import { getAllEmployee, getKpiDivisions, getKpiReport } from "../../../../../../service/PublicationService";
import { setKpiReport } from "../../../../../../store/slices/PublicationSlice";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { ScaleLoader } from "react-spinners";
import { Pagination } from "@material-ui/lab";
import { useCallback } from "react";

export default function AllEmployees() {
    // states
    const [searchEmployee , setSearchEmployee] = useState("");
    let [data, setData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [render, setRender] = useState(false);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSeacrhParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  // getReport
  
  const getEmployee = async () => {
    try {
      let response = await getAllEmployee(searchEmployee,currentPage,data);

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
    getEmployee();
    setRender(false);
  }, [render,currentPage,searchEmployee]);

  useEffect(() => {
    setSeacrhParams({
      page: currentPage,
      search: searchEmployee,
    });
  }, [currentPage, selectedCategory]);

  const handleChange = (e, p) => {
    setCurrentPage(p);
  };

  const pages = Math.floor(data?.count / 300);
  const handleSearch = useCallback((event) => {
    setSearchEmployee(event.target.value);
    setCurrentPage(1)
  }, []);


  return (
    <Layout>
      <div className={styles.employee_wrapper}>
        <Divider>Все сотрудники</Divider>

        <div className={styles.employees_header}>

        <div className={styles.employees_close}>
          <button onClick={() => navigate('/kpi/')}>Закрыть</button>
        </div>

        <div className={styles.employee_pagination}>
        <Pagination
            sx={{
              backgroundColor: "white",
              display: "flex",
              justifyContent: "center",
              margin: "16px 0",
              "& .MuiPaginationItem-root": {
                borderRadius: "50%",
                border: "1px solid #ccc",
                margin: "0 4px",
                color: "#000",
                "&.Mui-selected": {
                  backgroundColor: "#ccc",
                },
                "&:hover": {
                  backgroundColor: "#eee",
                },
              },
              "& .MuiPaginationItem-text": {
                fontSize: "14px",
              },
            }}
            count={pages + 1}
            page={currentPage}
            onChange={handleChange}
          />
        </div>
        <div className={styles.employee_search}>
                <input
                className={styles.search}
                 placeholder="Поиск сотрудников"
                type="text"
                value={searchEmployee}
                onChange={handleSearch}
                />

        </div>
        </div>
        {/* <div className={styles.employee_body}> */}
        <div>
        
                  
          {data? (<>
              {data?.results?.length !== 0 ? (
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
                  {data?.results?.map((item) => (
                    
                    <div style={{display: 'flex', borderBottom: '1px solid #eee' , cursor:"pointer"}}
                    onClick={() => navigate(`/kpi-employee/${item.user_id}`)}
                    >
                      
                    <div className={styles.employee_child}
                    key={item?.user_id}
                    >
                      <img src={item?.photo} alt="" />
                      <p style={{width: '200px'}}>{item?.label}</p>
                    </div>
                    <div style={{display: 'flex'}}>

                    <div style={{paddingLeft: '10px'}} className={styles.body__item}>
                            <p>{item?.criteria_1}</p>
                          </div>
                          <div style={{paddingLeft: '10px'}} className={styles.body__item}>
                            <p>{item?.criteria_2}</p>
                          </div>
                          <div style={{paddingLeft: '10px'}} className={styles.body__item}>
                            <p>{item?.criteria_3}</p>
                          </div>
                          <div style={{paddingLeft: '10px'}} className={styles.body__item}>
                            <p>{item?.criteria_4}</p>
                          </div>
                          <div style={{paddingLeft: '10px'}} className={styles.body__item}>
                            <p>{item?.criteria_5}</p>
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
            </>) :  <div style={{width:'50%', marginLeft: '45%'}}><ScaleLoader color = 'grey' /></div>}
            
        
        </div>
      </div>
    </Layout>
  );
}
