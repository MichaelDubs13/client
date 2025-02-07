import React , {useState } from 'react';
import useImageStore from '../../../store/imageStore';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";

const ImageRow = ({name}) => {
    const [expanded, setExpanded] = useState(false);
    const image = useImageStore((state) => state.image);
    const fetchHardwareImage = useImageStore((state) => state.fetchHardwareImage);
    const clearImage = useImageStore((state) => state.clearImage);
    
    const handleToggleClick = async () => {
      if (!expanded) {
        await fetchHardwareImage(`${name}`);
        setExpanded(true);
        
      } else {
        setExpanded(false);
        clearImage();
      }
    };

    return (
        <>

                <tr className={`tr-revision`} //"tds--highlighted" 
                    onClick={handleToggleClick}>
                    <td>
                        <IconContext.Provider value={{ color:"black", size:20 }}>
                            {
                                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                            }
                        </IconContext.Provider>
                    </td>
                    <td className='td-revision-title'>Image</td>
                </tr>
                    {expanded ? (
                    <tr>
                        <td colSpan={6}>
                            <tr className='tr-revision'>
                                <img src={image} alt="" />
                            </tr>
                        </td>
                    </tr>
                    ):null
                    } 
        </>
    );
}

export default ImageRow;