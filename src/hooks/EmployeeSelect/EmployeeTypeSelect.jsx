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
const EmployeeTypeSelect = ({ setSelectedType , isMulti}) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  

  const data = [
    {
        "id": 4,
        "label": "Рапорт",
     
        "value": 4
    },
    {
        "id": 1,
        "label": "Заявление",
        "value": 1
    },
 
  
] ;



  const animatedComponents = makeAnimated();
  // const handleSelect = (dataEmployees) => {
  //   setSelectedType(dataEmployees.label);
  // };
  // const handleSelect = (dataEmployees) => {
  //   isMulti ? setSelectedType(dataEmployees.label) :    setSelectedType(dataEmployees.label);
  // };
  const handleSelect = (dataEmployees) => {
    isMulti ? setSelectedType(dataEmployees.map(employee => employee.label)) : setSelectedType(dataEmployees.label);
  };
  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false);
    }
  }, [data]);
 
  return (
     <div style={{ minWidth: "200px" ,maxWidth:'300px' ,zIndex:'9996'}}>
     
      <Select
         closeMenuOnSelect={true}
         components={animatedComponents}
         options={data}
         onChange={handleSelect}
         isSearchable={true}
         placeholder="Выбрать тип"
         autosize={true}
         noOptionsMessage={() => 'Поиск не дал результатов'}
         isMulti={isMulti ? true : false}
         isLoading={isLoading}
      />
    
  </div>
  );
};

export default EmployeeTypeSelect;