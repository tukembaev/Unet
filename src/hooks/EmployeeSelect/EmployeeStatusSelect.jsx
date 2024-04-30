import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "react-select";
import { getEmployee } from "../../service/TaskService";
import { setEmployee } from "../../store/slices/TaskSlice";
import { useEffect } from "react";
import { getUserId } from "../../service/AuthService";
import { setEmployeeUserId } from "../../store/slices/UserSlice";
import { BarLoader, ClipLoader, PropagateLoader } from "react-spinners";
import makeAnimated from "react-select/animated";
const EmployeeStatusSelect = ({ setSelectedStatus , isMulti}) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  

  const data = [
    {
        "id": 4,
        "label": "Все",
     
        "value": 4
    },
    {
        "id": 1,
        "label": "Ждет выполнения",
     
        "value": 1
    },
    {
        "id": 2,
        "label": "В процессе выполнения",
        "value": 2
    },
    {
        "id": 3,
        "label": "Завершенные",

        "value": 3
    },
  
] ;
  const animatedComponents = makeAnimated();
  // const handleSelect = (dataEmployees) => {
  //   setSelectedStatus(dataEmployees.label);
  // };
  // const handleSelect = (dataEmployees) => {
  //   isMulti ? setSelectedStatus(dataEmployees.label) :    setSelectedStatus(dataEmployees.label);
  // };
  const handleSelect = (dataEmployees) => {
setSelectedStatus(dataEmployees.label);
  };
  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false);
    }
  }, [data]);
 
  return (
     <div style={{ minWidth: "200px" ,maxWidth:'300px' ,zIndex:'9995'}}>
     
      <Select
         closeMenuOnSelect={true}
         components={animatedComponents}
         options={data}
         onChange={handleSelect}
         isSearchable={true}
         placeholder="Выбрать статус"
         autosize={true}
         noOptionsMessage={() => 'Поиск не дал результатов'}
     
       isLoading={isLoading}
      />
    
  </div>
  );
};

export default EmployeeStatusSelect;