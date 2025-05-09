import React, { useState, useEffect } from "react";
import Select, { components } from "react-select";

const Input = (props) => <components.Input {...props} isHidden={false} />;

const EditableSelect =({options, selected, placeHolder, inpRef, onChange, onCreateOption})=> {
  const [value, setValue] = useState(selected);
  const [inputValue, setInputValue] = useState(placeHolder);
  const [allOptions, setAllOptions] = useState(options);

    useEffect(() => {
        setAllOptions(options);
    }, [options]);

  const onInputChange = (inputValue, { action }) => {
    if (action === "input-change") {
      setInputValue(inputValue);
    }
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        var newOption = {label:inputValue, value:inputValue};
        var newOptions = [...options, newOption];
        setAllOptions(newOptions);
        setValue(newOption);
        setInputValue(inputValue);
        onCreateOption(inputValue);
      }
  }

  const handleChange = (option) => {
    setValue(option);
    setInputValue(option ? option.label : "");
    onChange(option)
  };
  const customFilter = () => true;
  return (
    <div style={{ fontFamily: "sans-serif", textAlign: "center" }}>
      <Select
        ref={inpRef}
        options={allOptions}
        isClearable={true}
        value={value}
        inputValue={inputValue}
        onKeyDown={onKeyDown}
        onInputChange={onInputChange}
        
        onChange={handleChange}
        filterOption={customFilter}
        controlShouldRenderValue={false}
        components={{
          Input
        }}
      />
    </div>
  );
}

export default EditableSelect;