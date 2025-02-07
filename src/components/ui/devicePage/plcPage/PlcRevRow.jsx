import {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import useDeviceStore from "../../../../store/deviceStore";
import { Loader } from '@tesla/design-system-react';



const PlcRevRow = ({rev, plc_id}) => {
    const [expanded, setExpanded] = useState(false)
    const [revisions, setRevisions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchPlcRevDetail = useDeviceStore((state) => state.fetchPlcRevDetail);
    
    const handleToggleClick = async () => {
        if(expanded){
            setExpanded(false);
        }else {
            setIsLoading(true);
            const result = await fetchPlcRevDetail(plc_id, rev.projectRevisionID);
            if(Array.isArray(result)){
                setRevisions(result);
            }else{
                setRevisions([result]);
            }
            setIsLoading(false);
            setExpanded(true);
        }
    }

    return (
        <>
            <tr className={`tr-block`} //"tds--highlighted" 
                onClick={handleToggleClick}>
                    <Loader show={isLoading} contained={true}/>
                    <td>
                        <IconContext.Provider value={{ color:"black", size:20 }}>
                            {
                                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                            }
                        </IconContext.Provider>
                        
                    </td>
                    <td style={{fontSize:20}}>{rev.projectRevisionID}</td>
                    <td style={{fontSize:20}}>{rev.userName}</td>
                    <td style={{fontSize:20}}>{rev.date}</td>
                    <td style={{fontSize:20}}>{rev.comment}</td>
            </tr>
            {expanded && (
                    <tr>
                        <td></td>
                        <td colSpan={6}>
                            {
                                revisions.map( (rev, key) =>{
                                    return (
                                        <tr>
                                            <td>{rev?._attributes?.name}</td>
                                            <td>{rev?._attributes?.change}</td>
                                            <td>{rev?._attributes?.objectType}</td>
                                        </tr>
                                    )
                                })
                            }
                        </td>
                    </tr>
                )
            } 
        </>
    )
}

export default PlcRevRow