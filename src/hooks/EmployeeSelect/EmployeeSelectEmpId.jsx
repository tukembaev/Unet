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
import { setMyMembers, setMyTeam } from '../../store/slices/CollectiveSlice';
import { getMyMembers, getMyTeam } from '../../service/CollectiveService';

const EmployeeSelectUserId = ({ selectedEmployee , isMulti , placeholder = "Выбрать сотрудника"}) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  
  const getData = async () => {
    try {
      let response = await getMyMembers(data);
  
      dispatch(
        setMyMembers({
          members: response.data,
        })
      );
  
    } catch (error) {
      
    }
    };
  
    useEffect(() => {
    getData();

    }, []);
  
  const myTeam = useSelector((state) => state.collective.members);


  const data = [myTeam];
  const animatedComponents = makeAnimated();
  const handleSelect = (dataEmployees) => {
    isMulti ? selectedEmployee(dataEmployees) :    selectedEmployee(dataEmployees.id);


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
         placeholder={placeholder}
         autosize={true}
         noOptionsMessage={() => 'Поиск не дал результатов'}
       isLoading={isLoading}
       isMulti={isMulti ? true : false}
      />
    
  </div>
  );
};

export default EmployeeSelectUserId;