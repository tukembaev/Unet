
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import Select from 'react-select';

import { useEffect } from "react";
// import { getDirections } from "../../service/FlowService.js";
import { getCriteria , getCriteriaPPS } from "../../../service/PublicationService.js";



const KpiDirectionSelect = ({setDirection , isDirector}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();
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
    <div style={{maxWidth:'400px'}} > 
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

export default KpiDirectionSelect