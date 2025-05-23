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

  // useEffect(() => {
  //   console.log("table rerender")
  // }, [renderInput]);


  const onChange = (value) => {
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
      {
        renderInput({
          value,
          inpRef,
          onChange,
          onFocus:handleOnFocus,
        })
      }
    </div>
  );
}


export default EditableCell;