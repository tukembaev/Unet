
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import Select from 'react-select';

import { useEffect } from "react";
import { getMyTeam } from "../../service/CollectiveService";
import { setMyTeam } from "../../store/slices/CollectiveSlice";
import { getSemesters } from "../../service/FlowService";


const FlowSemesterSelect = ({id , setSemester}) => {
  
  const [data ,setData] = useState([])
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
    try {
      let response = await getSemesters(id ,data);
       setData(response.data)
    } catch (error) {
      
    }
    };
  
    useEffect(() => {
      if(id !== ''){
        getData();
      }


    }, [id]);
  
    const handleSelect = (dataEmployees) => {
      setSemester(dataEmployees.id);
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
    options={data}
    onChange={handleSelect}
    isSearchable={true}
    autosize={true}
    placeholder="Выбрать семестр"
    noOptionsMessage={() => 'Поиск не дал результатов'}
    isLoading={isLoading}
    />

     
  </div>
  )
}

export default FlowSemesterSelect