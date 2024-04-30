import React, { useEffect, useState } from "react";
import styles from "./KpiContent.module.scss";
import { Layout } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getCriteriaHas } from "../../../../service/PublicationService";
import { setKpiTitle } from "../../../../store/slices/PublicationSlice";
import KpiCategory from "./components/KpiCategory/KpiCategory";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

export default function KpiContent({ data , setRender , setNotify, cantChange}) {
  //states
  const FilteredData = data?.reduce((acc, item) => {
    const newItem = JSON.parse(JSON.stringify(item));
    if (newItem.category) {
      newItem.category = newItem.category.filter((categoryItem) => {
        if (categoryItem.kpi) {
          return categoryItem.kpi.length > 0; 
        }
        return false; 
      });
    }
    if (newItem.category.length > 0) {
      acc.push(newItem); 
    }
    return acc;
  }, []);
  // functions
  return (
    <React.Fragment>
      <div>
        {FilteredData?.length !== 0 ? (
          <>
            {FilteredData?.map((item) => (
              <div className={styles.kpi__item} key={item?.id}>
                <div className={styles.item__header}>
                  <span>{item?.title}</span>
                  <p> Баллы за категорию: {item?.score}</p>
                </div>
                <div className={styles.item__body}>
                  <KpiCategory
                            key={item?.id}
                            data={item?.category}
                            setRender={setRender}
                            setNotify={setNotify}
                            cantChange = {cantChange}
                          />
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className={styles.no_publick}>У вас нет публикаций</p>
        )}
      </div>
    </React.Fragment>
  );
}
