import React , {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import {FormInputText, FormLabel,FormInputDropdown  } from '@tesla/design-system-react';


const IssueReasonRow = ({issue, detail, options, values}) => {
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState('');
   
  
    const handleToggleClick = async () => {
      if (!expanded) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    };

    const handleValueChange = async (event) => {
        setValue(event.target.value);
    }

    return (
        <>

                <tr className="tr-checker" style={{display:'flex', justifyContent:'space-between', height:'40px', alignItems:'center', borderRadius:'10px', marginTop:'10px'}} //"tds--highlighted" 
                    onClick={handleToggleClick}>
                    <FormLabel htmlFor="issue" style={{marginLeft:'20px', size:20}}>{issue}</FormLabel>
                    <td>
                        <IconContext.Provider value={{ color:"black", size:20, style:{marginRight:'10px'}}}>
                            {
                                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                            }
                        </IconContext.Provider>
                    </td>
                </tr>
                    {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={10}>
                            <tr>
                                <td>{detail}</td>
                                { options &&
                                    <FormInputDropdown
                                    id="options"
                                    label="options"
                                    options={options}
                                    placeholder={options[0]}
                                    style={{ width:'250px'}}
                                ></FormInputDropdown>
                                }
                                {values &&
                                    <FormInputText
                                        id="value"
                                        placeholder={values}
                                        value={value}
                                        onChange={handleValueChange}
                                        style={{ width:'250px'}}
                                    />

                                }
                            </tr>
                        </td>
                    </tr>
                    )} 
        </>
    );
}

export default IssueReasonRow;