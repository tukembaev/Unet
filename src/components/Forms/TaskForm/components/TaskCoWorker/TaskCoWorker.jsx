import React, { useEffect } from "react";
import styles from "./TaskCoWorker.module.scss";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { directionsOrgTech } from "./../../../../../constants/DropDownTypes";

function TaskCoWorker({ dataCoWorker , setCoWorker }) {
  //UseState
  const [isShown, setIsShown] = useState(false);
  const [isLoading , setIsLoading] = useState(true)
  //Functions
  const animatedComponents = makeAnimated();
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };
  const handleSelect = (dataCoWorker) => {
    setCoWorker(dataCoWorker);
  };
  useEffect(() => {
    if (dataCoWorker[0]?.length !== 0) {
      setIsLoading(false);
    }
  }, [dataCoWorker]);

    return (
      <div className={styles.inline}>
    <div className={styles.task_responsible}>
      <p onClick={handleClick}>Cоисполнитель</p>
      {isShown && (
        <Select
          closeMenuOnSelect={true}
          components={animatedComponents}
          isMulti
          options={dataCoWorker[0]}
          onChange={handleSelect}
          isSearchable={true}
          placeholder="Выбрать соисполнительных"
          autosize={true}
          noOptionsMessage={() => 'Поиск не дал результатов'}
        isLoading={isLoading}
        />
        // onChange={event => setCoWorker([{...dataCoWorker,member_type:"Соисполнитель"}])}
      )}
    </div>
    </div>
  );
}

export default React.memo(TaskCoWorker);