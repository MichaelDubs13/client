import { useRef, useState } from "react";
import Item from'./Item';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";


function ListGroup({item, groupIndex, children}){
    const [expanded, setExpanded] = useState(true);

    const handleToggleClick = async () => {
        if (!expanded) {
          setExpanded(true);
          
        } else {
          setExpanded(false);
        }
      };
  

    return (
    <>

        
            <div className="div-inline" style={{marginTop:"10px", marginBottom:"10px"}}>
                <IconContext.Provider value={{ color:"black", size:20 }}>
                {
                    expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                }
                </IconContext.Provider>
                <button style={{fontSize:22, fontWeight:"bolder"}} 
                    onClick={handleToggleClick}>
                    {item.heading}
                </button>

            </div>
            
                    {
                        expanded &&
                        <div>
                            {item.items.filter(item => item.type).map((component, index)=>(
                                <Item item={component} index={groupIndex} group={item.items}/>
                            ))}
                            {children}     
                        </div>
                    }
        
    </>
    );  
}

export default ListGroup;