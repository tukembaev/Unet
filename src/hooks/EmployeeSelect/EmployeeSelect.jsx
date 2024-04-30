
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import Select from 'react-select';
import { getEmployee } from "../../service/TaskService";
import { setEmployee } from "../../store/slices/TaskSlice";
import { useEffect } from "react";
import { getMyMembers, getMyTeam } from "../../service/CollectiveService";
import { setMyMembers, setMyTeam } from "../../store/slices/CollectiveSlice";


const EmployeeSelect = ({selectedEmployee}) => {

  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch()
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
    const handleSelect = (dataEmployees) => {
      selectedEmployee(dataEmployees.id);
     
      }

  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false);
    }
  }, [data]);
  return (
    <div style={{maxWidth:'400px'}} > 
    <Select
    closeMenuOnSelect={true}

    options={data[0]}
    onChange={handleSelect}
    isSearchable={true}
    autosize={true}
    placeholder="Выбрать сотрудника"
    noOptionsMessage={() => 'Поиск не дал результатов'}
    isLoading={isLoading}
    />

     
  </div>
  )
}

export default EmployeeSelect