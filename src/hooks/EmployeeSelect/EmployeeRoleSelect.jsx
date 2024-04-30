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
const EmployeeRoleSelect = ({ isStatement,  setSelectedRole , isMulti}) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  

  const data = [
    {
        "id": 1,
        "label": "Ответственный",
     
        "value": 1
    },
    {
        "id": 2,
        "label": "Наблюдатель",

        "value": 2
    },
    {
        "id": 3,
        "label": "Соисполнитель",

        "value": 3
    },
    {
        "id": 4,
        "label": "Поручитель",

        "value": 4
    }
] ;

const dataStatements = [
  {
      "id": 4,
      "label": "Заявитель",
   
      "value": 4
  },
  {
      "id": 1,
      "label": "Адрессат",
   
      "value": 1
  },


] ;
  const animatedComponents = makeAnimated();
  // const handleSelect = (dataEmployees) => {
  //   setSelectedRole(dataEmployees.label);
  // };
  const handleSelect = (dataEmployees) => {
    isMulti ? setSelectedRole(dataEmployees.map(employee => employee.label)) : setSelectedRole(dataEmployees.label);
  };
  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false);
    }
  }, [data]);

  return (
     <div style={{ maxWidth: "300px" , zIndex: 9998 }}>
     
      <Select
         closeMenuOnSelect={true}
         components={animatedComponents}
         options={isStatement ? dataStatements : data}
         onChange={handleSelect}
         isSearchable={true}
         placeholder="Выбрать роль"
         autosize={true}
         isMulti={isMulti ? true : false}
         noOptionsMessage={() => 'Поиск не дал результатов'}
       isLoading={isLoading}
       
      />
    
  </div>
  );
};

export default EmployeeRoleSelect;