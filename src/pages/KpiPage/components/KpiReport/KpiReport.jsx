import React from "react";
import styles from "./KpiReport.module.scss";
import { Layout } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getKpiReport } from "../../../../service/PublicationService";
import { setKpiReport } from "../../../../store/slices/PublicationSlice";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const KpiReport = () => {
  // states

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Divider>Общий отчет</Divider>
      <div className={styles.departments}>
        <button onClick={() => navigate(`/kpi-division/`)}>Отделы</button>
        <button onClick={() => navigate(`/kpi-institute/`)}>Институты</button>
        {/* <button onClick={() => navigate(`/kpi-center/`)}>Центры</button> */}
        <button style={{width: 'fit-content'}} onClick={() => navigate(`/all-employee/`)}>Все сотрудники</button>
      </div>
    </>
  );
};

export default KpiReport;
