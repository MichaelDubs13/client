import { List, ListItem } from "@tesla/design-system-react";
import {useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowDown,  } from "react-icons/io";
import {IconContext} from "react-icons";
import useDeviceStore from "../../../store/deviceStore";
import DeviceNavBarLine from "./DeviceNavBarLine";
import { useSearchParams } from 'react-router-dom';

const DeviceNavBarShop = ({type, item, handleNavbarChange}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [expanded, setExpanded] = useState(false)
    const [children, setChildren] = useState([])
    const fetchLines = useDeviceStore((state) => state.fetchLines);
    const fetchPLCsPerShop = useDeviceStore((state) => state.fetchPLCsPerShop);
    const fetchHMIsPerShop = useDeviceStore((state) => state.fetchHMIsPerShop);
    const setPLC = useDeviceStore((state) => state.setPLC);
    const setLine = useDeviceStore((state) => state.setLine);
    const setShop = useDeviceStore((state) => state.setShop);
    const setDevices = useDeviceStore((state) => state.setDevices);

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
                if(shop_id == item.id){
                    let result = await fetchLines(item.id);
                    setChildren(result);
                    setExpanded(true);
                    
                    if(!line_id){
                        result = await fetchData();
                    }
                } 
            }
        }
        fetchInitialData();
    }, []);

    const fetchData = async () => {
        setShop(item.name);
        setLine("");
        setPLC("");
        if(type === "plc"){
            const plcs = await fetchPLCsPerShop(item.id);
            setDevices(plcs);
        } else if(type ==="hmi"){
            const hmis = await fetchHMIsPerShop(item.id);
            setDevices(hmis);
        }
    }
    const handleListClick = async () => {
        const searchParams = {
            shop: item.id,
            line: '',
            plc: ''
          }
        
        if(expanded){
            let result = await fetchLines(item.id);
            setChildren(result);
            handleNavbarChange(searchParams);
            result = await fetchData();
            setExpanded(false);
            
        }else {
            let result = await fetchLines(item.id);
            setChildren(result);
            handleNavbarChange(searchParams);
            result = await fetchData();
            setExpanded(true);
        }
    }

    return (
        <>
        <ListItem className="li-device" onClick={handleListClick}>
            <span>
            <IconContext.Provider value={{ color:"black", size:20 }}>
            {
                expanded?<IoIosArrowDown/>:<IoIosArrowForward/>
            }
            </IconContext.Provider>
            {item.name}
            </span>                        
        </ListItem>
        
        <List>
                {
                    expanded && children.map((child, key) =>{
                        return (
                            <DeviceNavBarLine type={type} shop={item} line={child} handleNavbarChange={handleNavbarChange} key={"line"+key}/>
                        )
                    })
                }
        </List>
        
        </>
    )
}

export default DeviceNavBarShop