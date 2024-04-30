import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getCriteria } from "../../service/PublicationService";
import { getCriteriaPPS } from "../../service/PublicationService";
import Select from 'react-select';


const KpiCreteria = ({role , setDirection}) => {
  // states
 
  const [data, setData] = useState([]);
  const [info, setInfo] = useState([]);
  const [isLoading, setLoading] = useState(true);


  // functions
  const getData = async () => {
    try {
      let response = await getCriteria(data);

      setData(response.data);
    } catch (error) {}
  };

  const getInfo = async () => {
    try {
      let response = await getCriteriaPPS(info);
      setInfo(response.data);
    } catch (error) {}
  };

  useEffect(() =>{
    getData();
    getInfo();
  }, []);

  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false);
    }
  }, [data]);
  
  const handleSelect = (dataEmployees) => {
    setDirection(dataEmployees.id);

    }

  return(
    <div style={{ width:"100%" }}> 
    <Select
    closeMenuOnSelect={true}
    required
    options={role === "Заведующий" ? data : role === "Директор" ? data : info}
    onChange={handleSelect}
    isSearchable={true}
    autosize={true}
    placeholder="Выбрать критерий"
    noOptionsMessage={() => 'Поиск не дал результатов'}
    isLoading={isLoading}
    />

     
  </div>
  )
};

export default KpiCreteria