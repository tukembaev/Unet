import React, { useEffect } from "react";
import styles from "./TaskResponsible.module.scss";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { directionsOrgTech } from "./../../../../../constants/DropDownTypes";

function TaskResponsible({ isMilti, dataResponsible, setResponsible ,text}) {
  //UseState
  const [isShown, setIsShown] = useState(false);
  const [isLoading , setIsLoading] = useState(true)
  //Functions
  const animatedComponents = makeAnimated();

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  const handleSelect = (dataResponsible) => {
    setResponsible(dataResponsible);
  };
  useEffect(() => {
    if (dataResponsible[0]?.length !== 0) {
      setIsLoading(false);
    }
  }, [dataResponsible]);

  return (
    <div className={styles.inline}>
      {isMilti === true ? (
        <div className={styles.task_responsible}>
          <p onClick={handleClick}>{text}(Обязательное поле)</p>
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={dataResponsible[0]}
            isMulti
            onChange={handleSelect}
            autosize={true}
            isSearchable={true}
            placeholder="Выбрать ответственного"
            noOptionsMessage={() => 'Поиск не дал результатов'}
            required={true}
            isLoading={isLoading}
          />{" "}
        </div>
      ) : (
        <div className={styles.task_responsible}>
          <p onClick={handleClick}>{text}(Обязательное поле)</p>
          <Select
            closeMenuOnSelect={true}
            components={animatedComponents}
            options={dataResponsible[0]}
            onChange={handleSelect}
            autosize={true}
            isSearchable={true}
            placeholder="Выбрать ответственного"
            noOptionsMessage={() => 'Поиск не дал результатов'}
            required={true}
            isLoading={isLoading}
          />{" "}
        </div>
      )}
    </div>
  );
}
export default React.memo(TaskResponsible);
