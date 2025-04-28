import React, { useEffect, useState,useRef, useMemo } from "react";
import "./styles.css";

const EditableCell=({
  getValue,
  row: { index },
  column: { id },
  table,
  renderInput,
})=> {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const inpRef = useRef(null);
  const key = `${index}-${id}`;

  useEffect(() => {
    if (table.focusedCell === key) {
      inpRef.current?.focus();
    } else {
      inpRef.current?.blur();
    }
  });

  const onValueChange = (value) => {
    setValue(value);
    console.log(value);
    table.options.meta?.updateCellData(index, id, value);
  };

  const onChange = (value) => {
    console.log(value);
    setValue(value);
    table.options.meta?.updateCellData(index, id, value);
  };

  const handleOnFocus = ()=>{
    table.focusedCell = key;
  }
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);
  return (
    <div
      // onDoubleClick={onDoubleClick}
      // className="qz__data-table__editable-cell--editing"
      // tabIndex={0}
    >
      {renderInput({
        value,
        inpRef,
        onChange,
        onFocus:handleOnFocus,
        onValueChange,
      })}
    </div>
  );
}


export default EditableCell;