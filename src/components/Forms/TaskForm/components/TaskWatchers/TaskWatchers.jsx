import React, { useEffect } from "react";
import styles from "./TaskWatchers.module.scss";
import styles2 from "./TaskAddChat.module.scss";
import close from "./../../../../../assets/icons/mini_close.svg";
import cx from "classnames";
import { useState } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { directionsOrgTech } from './../../../../../constants/DropDownTypes';



function TaskWatchers({dataWatchers , setWatchers , isForChat }) {
  const animatedComponents = makeAnimated();
  const [isShown, setIsShown] = useState(false);
  const [isLoading , setIsLoading] = useState(true)
  const handleClick = event => {
    setIsShown(current => !current);
  };

  const handleSelect = (dataWatchers) => {
    setWatchers(dataWatchers);
  }
  useEffect(() => {
    if (dataWatchers[0]?.length !== 0) {
      setIsLoading(false);
    }
  }, [dataWatchers]);
  return  (
    <div className={isForChat ? styles2.inline : styles.inline }>
      {isForChat === true ? 
      <div className={isForChat ? styles2.task_watchers : styles.task_watchers}>
      
      <p onClick={handleClick}>Выбрать</p>
    
      <Select
      closeMenuOnSelect={true}
      components={animatedComponents}
    
      options={dataWatchers[0]}
      onChange={handleSelect}
      isSearchable={true}
      autosize={true}
      placeholder="Открыть список"
      noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
      />
    
      
    </div> :
      <div className={styles.task_watchers}>
      
      <p onClick={handleClick}>Наблюдатель</p>
      {isShown && (
      <Select
      closeMenuOnSelect={true}
      components={animatedComponents}
      isMulti
      options={dataWatchers[0]}
      onChange={handleSelect}
      isSearchable={true}
      autosize={true}
      placeholder="Выбрать наблюдателей"
      noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
      />
  
       )} 
    </div>
    } 
  
    </div>
  );
}
export default React.memo(TaskWatchers);

