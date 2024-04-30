import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";


import Select from 'react-select';

import { useEffect } from "react";
// import { getDirections } from "../../service/FlowService.js";
import { getCriteriaPPS } from "../../../../../service/PublicationService";



const EmployeeFormCreteria = ({setDirection}) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);

    const getData = async () => {
      try {
        let response = await getCriteriaPPS(data);
  
        setData(response.data)
    
      } catch (error) {
        
      }
      };

   
    useEffect(() => {
      getData();
      }, []);
  
    const handleSelect = (dataEmployees) => {
      setDirection(dataEmployees?.id);

      }

  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div style={{width:"100%"}} > 
    <Select
    closeMenuOnSelect={true}
    required
    options={data}
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

export default EmployeeFormCreteria