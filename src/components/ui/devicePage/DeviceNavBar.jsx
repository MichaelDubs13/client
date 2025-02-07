import { Card, List } from "@tesla/design-system-react";
import React, { useEffect } from 'react';
import useDeviceStore from '../../../store/deviceStore';
import DeviceNavBarShop from "./DeviceNavBarShop";


const DeviceNavBar = ({type, handleNavbarChange}) => {
    const shops = useDeviceStore((state) => state.shops);
    const fetchShops = useDeviceStore((state) => state.fetchShops);

    useEffect(()=>{
        fetchShops();
    }, []);

    return (
        <>
            <div className="side-bar-devices">
                <List variant='borders' style={{width:"300px"}}>
                    {
                        shops.map((shop, key) => {
                        return(
                            <DeviceNavBarShop type={type} item={shop} handleNavbarChange={handleNavbarChange} key ={"shop"+key}/>
                        )
                        }) 
                    }
                </List>
            </div>
        </>
    )
}

export default DeviceNavBar