import React, { useState } from "react";
import useDeviceStore from "../../../store/deviceStore";
import { FormInputDropdown } from '@tesla/design-system-react';

const TemplateMastercopyRow = ({hardware, gsds}) => {
    // const filteredGsds = removeDuplicates(mastercopyGsds).filter(i=>i.parsedName===hardware.parsedName).sort().reverse();
    const filteredGsds = gsds.filter(i=>i.parsedName===hardware.parsedName).sort().reverse();
  
    const GetBackGroundColor = () =>{
        if(filteredGsds.length > 0 && filteredGsds[0].name === hardware?.name){
            return {backgroundColor:"lightgreen"}
        } else if( filteredGsds.length=== 0){
            return {backgroundColor:"lightgreen"}
        }

         return {};
    }
    const removeDuplicates = (inpArr) => {
        return inpArr.filter((obj1, i, arr) => 
          arr.findIndex(obj2 => (obj2.name === obj1.name)) === i
        )
    }

    return (
        <>
            <tr className={`tr-block`}>
                <td className='td-block' style={GetBackGroundColor()}>{hardware?.mastercopy}</td>
                <td className='td-block'>{hardware?.parsedName}</td>
                <td className='td-block'>{hardware?.version}</td>
                <td className='td-block'>{hardware?.time}</td>
                <td className='td-block'>{hardware?.revision}</td>
                <td>
                    <FormInputDropdown
                            className='hmi-form-input'
                            id="mastercopyname"
                            label="mastercopyname"
                            onOptionSelect={()=>{}}
                            options={filteredGsds?.map((item) => item.name)}
                            placeholder={hardware?.name}
                            style={{ marginBottom: "5px"}}
                    ></FormInputDropdown>
                </td>
            </tr>
</>
    )
}

export default TemplateMastercopyRow;