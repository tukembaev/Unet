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
import { getMyMembers, getMyTeam } from "../../service/CollectiveService";
import { setMyMembers, setMyTeam } from "../../store/slices/CollectiveSlice";
const EmployeeSelectUserId = ({ selectedEmployee , setSelectedEmployeeLabel ,isMulti}) => {
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
  // const handleSelect = (dataEmployees) => {
  //   selectedEmployee(dataEmployees.id);
  // };
  // const handleSelect = (dataEmployees) => {
  //   isMulti ? selectedEmployee(dataEmployees.id) :    selectedEmployee(dataEmployees.id);
  // };
  const handleSelect = (dataEmployees) => {
    isMulti ? selectedEmployee(dataEmployees.map(employee => employee.value)) : selectedEmployee(dataEmployees.value);
    isMulti ? setSelectedEmployeeLabel(dataEmployees.map(employee => employee.label)) : setSelectedEmployeeLabel(dataEmployees.label);
  };
  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false);
    }
  }, [data]);

  return (
     <div style={{ maxWidth: "400px" , zIndex: 9999 }}>
     
      <Select
         closeMenuOnSelect={true}
         components={animatedComponents}
         options={data[0]}
         onChange={handleSelect}
         isSearchable={true}
         placeholder="Выбрать сотрудника"
         autosize={true}
         isMulti={isMulti ? true : false}
         noOptionsMessage={() => 'Поиск не дал результатов'}
       isLoading={isLoading}
      />
    
  </div>
  );
};

export default EmployeeSelectUserId;