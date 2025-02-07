import { List, ListItem } from "@tesla/design-system-react";
import {useState } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import useDeviceStore from "../../../store/deviceStore";


const DeviceNavBarPLC = ({type, line, shop, plc, handleNavbarChange, key}) => {
    const [expanded, setExpanded] = useState(false)
    const [children, setChildren] = useState([])
    const fetchHMIsPerPLC = useDeviceStore((state) => state.fetchHMIsPerPLC);
    const setDevices = useDeviceStore((state) => state.setDevices);
    const setPLC = useDeviceStore((state) => state.setPLC);
    const setLine = useDeviceStore((state) => state.setLine);
    const setShop = useDeviceStore((state) => state.setShop);
    
    const fetchData = async () => {
        setShop(shop.name);
        setLine(line.name);
        setPLC(plc.name);

        if(type === "hmi")
        {
            const result = await fetchHMIsPerPLC(shop.id, line.id, plc.id);
            setChildren(result);
            setDevices(result);
        }
    }

    const handleListClick = async () => {
        const searchParams = {
            shop: shop.id,
            line: line.id,
            plc: plc.id
          }

        if(expanded){
            handleNavbarChange(searchParams);
            const result = await fetchData();
            setExpanded(false);
        }else {
            handleNavbarChange(searchParams);
            const result = await fetchData();
             setExpanded(true);
        }
    }

    return (
        <>
            <ListItem onClick={handleListClick}>
                <span className='tree-node-3rd'>
                <IconContext.Provider value={{ color:"black", size:15 }}>
                {
                    expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                }
                </IconContext.Provider>
                {plc.name}
                </span>                        
            </ListItem>
            
            <List>
                {
                    expanded && children.map((child, key) =>{
                        return (
                            <ListItem> 
                                <span className='tree-node-4th'>{child.name}</span>
                            </ListItem>
                        )
                    })
                }
            </List>
        </>
        
    )
}

export default DeviceNavBarPLC