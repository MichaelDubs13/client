import React, { useState, useEffect, useRef } from "react";
import Select, { components } from "react-select";

const Input = (props) => <components.Input {...props} isHidden={false} />;

const EditableSelect =({options, selected, placeHolder, onChange, onCreateOption, capitalizeValues})=> {
  const [value, setValue] = useState(selected);
  const [inputValue, setInputValue] = useState(placeHolder);
  const [allOptions, setAllOptions] = useState(options);
  const selectRef = useRef(null);

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
        var value = inputValue;
        if(capitalizeValues){
          value = value.toUpperCase();
        }
        var newOption = {label:value, value:value};
        var newOptions = [...options, newOption];        
        setAllOptions(newOptions);
        setValue(newOption);
        setInputValue(value);
        onCreateOption(value);
        selectRef.current.blur();
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
        ref={selectRef}
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