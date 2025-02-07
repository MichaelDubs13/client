import {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import { TBody, DataTable } from '@tesla/design-system-react';



const ItemRow = ({items, header, fontSize}) => {
    const [expanded, setExpanded] = useState(false)
    const itemFontSize = fontSize * 3 / 4;
    const handleToggleClick = async () => {
        if(expanded){
            setExpanded(false);
        }else {
            setExpanded(true);
        }
    }

    return (
        <>
            <tr className={`tr-block`} //"tds--highlighted" 
                onClick={handleToggleClick}>
                    <td style={{verticalAlign:'middle'}}>
                        <IconContext.Provider value={{ color:"black", size:fontSize }}>
                            {
                                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                            }
                        </IconContext.Provider>
                        
                    </td>
                    {
                        <td style={{fontSize:fontSize, verticalAlign:'middle'}}>{header}</td>
                    }
                    
            </tr>
            {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={6}>
                            <DataTable border={4}>
                            <TBody>
                            {
                                items.map( (item, key) =>{
                                    return (
                                        <tr>
                                            {
                                                Object.keys(item).map(key => {
                                                    return(
                                                        <td style={{fontSize:itemFontSize, verticalAlign:'middle'}}>{item[key]}</td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                            }
                            </TBody>
                            </DataTable>
                        </td>
                    </tr>
                )
            } 
        </>
    )
}

export default ItemRow