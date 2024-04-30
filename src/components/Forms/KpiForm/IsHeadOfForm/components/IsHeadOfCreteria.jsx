import React, { useState } from "react";


import Select from 'react-select';

import { useEffect } from "react";
// import { getDirections } from "../../service/FlowService.js";
import { getCriteria , getCriteriaPPS } from "../../../../../service/PublicationService.js";



const IsHeadOfCreteria = ({setDirection , isHeadof}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [info , setInfo] = useState([]);
  const getData = async () => {
    try {
      let response = await getCriteria(data);

      setData(response.data)
  
    } catch (error) {
      
    }
    };

    const getInfo = async () => {
      try {
        let response = await getCriteriaPPS(info);
  
        setInfo(response.data)
    
      } catch (error) {
        
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
    <div  style={{ width:"100%" }} > 
    <Select
    closeMenuOnSelect={true}
    required
    options={isHeadof ? data : info}
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

export default IsHeadOfCreteria