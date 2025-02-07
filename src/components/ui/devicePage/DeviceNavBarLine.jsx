import { List, ListItem } from "@tesla/design-system-react";
import {useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import useDeviceStore from "../../../store/deviceStore";
import DeviceNavBarPLC from "./DeviceNavBarPLC";
import { useSearchParams } from 'react-router-dom';

const DeviceNavBarLine = ({type, line, shop, handleNavbarChange}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [expanded, setExpanded] = useState(false)
    const [children, setChildren] = useState([])
    const fetchPLCsPerLine = useDeviceStore((state) => state.fetchPLCsPerLine);
    const fetchHMIsPerLine = useDeviceStore((state) => state.fetchHMIsPerLine);
    const setDevices = useDeviceStore((state) => state.setDevices);
    const setPLC = useDeviceStore((state) => state.setPLC);
    const setLine = useDeviceStore((state) => state.setLine);
    const setShop = useDeviceStore((state) => state.setShop);
    
    useEffect(()=>{
        const fetchInitialData = async ()=>{
            const params = [];
            for(let entry of searchParams.entries()) {
                params.push(entry);
            }
            if(params.length > 0){
                const shop_id = params[0][1]
                const line_id = params[1][1]
                const plc_id = params[2][1]
                if(line_id == line.id){
                    const result = await fetchData(); 
                    setExpanded(true);
                } 
            }
        }
        fetchInitialData();
    }, []);

    const fetchData = async () => {
        setShop(shop.name);
        setLine(line.name);
        setPLC("");

        if(type === "plc")
        {
            const result = await fetchPLCsPerLine(shop.id, line.id);
            setChildren(result);
            setDevices(result);
        } else if (type === "hmi"){
            const plcs = await fetchPLCsPerLine(shop.id, line.id);
            setChildren(plcs);
            const hmis = await fetchHMIsPerLine(shop.id, line.id);
            setDevices(hmis);
        }
    }

    const handleListClick = async () => {
        const searchParams = {
            shop: shop.id,
            line: line.id,
            plc: ''
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
        <ListItem className="li-device" onClick={handleListClick} style={{marginBottom:"10px"}}>
            <span className='tree-node-2nd'>
                <IconContext.Provider value={{ color:"black", size:20 }}>
                {
                    expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
                }
                </IconContext.Provider>
                {line.name}
            </span>                        
        </ListItem>
            
                 
        <List>
            {
                expanded && children.map((child, key) =>{
                    return (
                        <DeviceNavBarPLC type={type} shop={shop} line={line} plc={child} handleNavbarChange={handleNavbarChange} key={"plc"+key}/>
                    )
                })
            }
        </List>
        </>
            
        
    )
}

export default DeviceNavBarLine