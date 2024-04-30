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
import { setMyTeam } from '../../store/slices/CollectiveSlice';
import { getMyMembers, getMyTeam } from '../../service/CollectiveService';

const EmployeeSelectAllUserId = ({ selectedEmployee , isMulti }) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  
 
  const getData = async () => {
    try {
      let response = await getMyMembers(data);

      dispatch(
        setEmployee({
          employee: response.data,
        })
      );
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getData();

  }, []);
  const employee = useSelector((state) => state.task);

  //Consts & Let
  const data = [employee.employee];
  const animatedComponents = makeAnimated();
  const handleSelect = (dataEmployees) => {
    isMulti ? selectedEmployee(dataEmployees) :    selectedEmployee(dataEmployees.value);


  };

  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false);
    }
  }, [data]);

  return (
     <div style={{ maxWidth: "400px" }}>
     
      <Select
         closeMenuOnSelect={true}
         components={animatedComponents}
         options={data[0]}
         onChange={handleSelect}
         isSearchable={true}
         placeholder="Выбрать сотрудника"
         autosize={true}
         noOptionsMessage={() => 'Поиск не дал результатов'}
       isLoading={isLoading}
       isMulti={isMulti ? true : false}
      />
    
  </div>
  );
};

export default EmployeeSelectAllUserId;