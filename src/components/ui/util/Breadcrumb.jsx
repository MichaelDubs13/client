import { NavItem, FormInputDropdown} from "@tesla/design-system-react";
import React, { forwardRef, useEffect, useState } from 'react';
import { iconChevron90 } from '@tesla/design-system-icons';
import { Icon } from '@tesla/design-system-react'

const Breadcrumb = forwardRef(({itemValue, itemOptions, index, handleOptionSelect}, ref) => {
    const [value, setValue] = useState(itemValue);
    useEffect(()=>{
        setValue(itemValue)
    }, [itemValue]);
    
    // const [options, setOptions] = useState(itemOptions);
    const handleOptionSelected = (event) => {
        handleOptionSelect(event.value, index);
        setValue(event.value);
    }

    return (
        <div style={{display:"flex"}} ref={ref}>
            <FormInputDropdown 
            id={index}
            style={{marginRight:'20px', marginLeft:'20px', fontSize:'20px' }}
            variant="inline"
            onOptionSelect={handleOptionSelected}
            options={itemOptions}
            selected={value}
            />
            <Icon data={iconChevron90} />
        </div>
    )
})

export default Breadcrumb
