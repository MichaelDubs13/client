import {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import ItemRow from './ItemRow';
import {DataTable, TBody} from "@tesla/design-system-react";



const ProductRow = ({product}) => {
    const [expanded, setExpanded] = useState(false)
    
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
                        <IconContext.Provider value={{ color:"black", size:30 }}>
                            {
                                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                            }
                        </IconContext.Provider>
                        
                    </td>
                    <td style={{fontSize:30, verticalAlign:'middle'}}>{product.ProductName}</td>
                    <td style={{fontSize:30, verticalAlign:'middle'}}>{product.Version}</td>
            </tr>
            {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={6}>
                            <DataTable border={4}>
                                <TBody>
                                    <ItemRow items={product.Features} fontSize={30} header={"Features"}/>
                                    <ItemRow items={product.SupportPackages} fontSize={30} header={"SupportPackages"}/>
                                    <ItemRow items={product.InstalledGSDs} fontSize={30} header={"InstalledGSDs"}/>
                                </TBody>
                            </DataTable>
                        </td>
                    </tr>
                )
            } 
        </>
    )
}

export default ProductRow