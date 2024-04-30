import React , {lazy , Suspense} from "react";
import { useState, useEffect } from "react";
import { getCategoryDirector } from "../../service/PublicationService";
import { getCategoryKpiPPS } from "../../service/PublicationService";
import { getCategoryManager } from "../../service/PublicationService";
import Select from "react-select";

export default function KpiCategory({ id, setSemester, role }) {
  // states
  let data = [];
  const [isDirector, setIsDirector] = useState([]);
  const [isHeadOf , setIsHeadOf] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectKey, setSelectKey] = useState(0); // Добавляем состояние для ключа

  // functions
  const fetchData = async () =>{
    try{
      if(role === "Директор"){
        let response = await getCategoryDirector(id , data);
        setIsDirector(response.data);
      }else if(role === "Заведующий"){
        let response = await getCategoryManager(id , data);
        setIsHeadOf(response.data)
      }else{
        let response = await getCategoryKpiPPS(id , data);
        setEmployee(response.data)
      }
    } catch (error){
      
    }
  }

  useEffect(() => {
    fetchData();
    setSelectKey((prevKey) => prevKey + 1);
  }, [id , role]);

  const handleSelect = (dataEmployees) => {
    setSemester(dataEmployees.id);
  };

  useEffect(() => {
    if (data[0]?.length !== 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div style={{ width: "100%" }}>
      <Select
        key={selectKey}
        closeMenuOnSelect={true}
        options={
          role === "Заведующий" ?
            isHeadOf
            : role === "Директор"
            ? isDirector
            : employee
        }
        onChange={handleSelect}
        isSearchable={true}
        autosize={true}
        placeholder="Выбрать категорию"
        noOptionsMessage={() => "Поиск не дал результатов"}
        isLoading={isLoading}
      />

    </div>
  );
}
