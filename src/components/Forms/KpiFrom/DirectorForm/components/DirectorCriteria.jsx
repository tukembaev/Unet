

import React, { useState } from "react";


import Select from 'react-select';

import { useEffect } from "react";
import { getCriteria , getCriteriaPPS } from "../../../../../service/PublicationService.js";



const DirectorCriteria = ({setDirection , isDirector}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [info , setInfo] = useState([]);
  const getData = async () => {
    try {
      let response = await getCriteria(data);

      setData(response.data)
  
    } catch (error) {
      console.log(error.response);
    }
    };

    const getInfo = async () => {
      try {
        let response = await getCriteriaPPS(info);
  
        setInfo(response.data)
    
      } catch (error) {
        console.log(error.response);
      }
      };
  


   
    useEffect(() => {
      getInfo();
      }, []);
    useEffect(() => {
    getData();
    }, []);
  
    const handleSelect = (dataEmployees) => {
      setDirection(dataEmployees.id);

      }

  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div style={{ width:"100%" }}> 
    <Select
    closeMenuOnSelect={true}
    required
    options={isDirector ? data : info}
    onChange={handleSelect}
    isSearchable={true}
    autosize={true}
    placeholder="Выбрать критерий"
    noOptionsMessage={() => 'Поиск не дал результатов'}
    isLoading={isLoading}
    />

     
  </div>
  )
}

export default DirectorCriteria