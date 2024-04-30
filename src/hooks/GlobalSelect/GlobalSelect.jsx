import React, { useState } from "react";
import Select from "react-select";
import { useEffect } from "react";

const GlobalSelect = ({ data, setValue, placeholder }) => {
  const [isLoading, setLoading] = useState(true);

  const handleSelect = (item) => {
    setValue(item.value);
  };

  useEffect(() => {
    if (data?.length !== 0) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div style={{ maxWidth: "400px" }}>
      <Select
        closeMenuOnSelect={true}
        options={data}
        onChange={handleSelect}
        isSearchable={data ? true : false}
        autosize={true}
        placeholder={placeholder}
        noOptionsMessage={() => "Поиск не дал результатов"}
        isLoading={isLoading}
      />
    </div>
  );
};

export default GlobalSelect;
