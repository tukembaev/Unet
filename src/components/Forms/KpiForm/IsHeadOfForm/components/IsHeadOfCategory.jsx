import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";

import { useEffect } from "react";
import { getCategoryKpiPPS , getCategoryManager } from "../../../../../service/PublicationService";

// import { getSemesters } from "../../service/FlowService";

const IsHeadOfCategory = ({ id, setSemester, isHeadof }) => {
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectKey, setSelectKey] = useState(0); // Добавляем состояние для ключа

  const getData = async () => {
    try {
      let response = await getCategoryManager(id, data);
      setData(response.data);
    } catch (error) {
      
    }
  };

  const getInfo = async () => {
    try {
      let response = await getCategoryKpiPPS(id, info);
      setInfo(response.data);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    if (id !== "") {
      getInfo();
      getData();
      setSelectKey(prevKey => prevKey + 1);
    }
  }, [id]);

  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false);
    }
  }, [data]);

  const handleSelect = (dataEmployees) => {
    setSemester(dataEmployees.id);
  };

  return (
    <div  style={{ width:"100%" }}>
      <Select
        key={selectKey}
        closeMenuOnSelect={true}
        options={isHeadof ? data : info}
        onChange={handleSelect}
        isSearchable={true}
        autosize={true}
        placeholder="Выбрать категорию"
        noOptionsMessage={() => "Поиск не дал результатов"}
        isLoading={isLoading}
      />
    </div>
  );
};

export default IsHeadOfCategory;