import React , {useState } from 'react';
import { useNavigate } from "react-router-dom";

const DeviceRow = ({device}) => {
    let navigate = useNavigate(); 
    const handleToggleClick = () =>{ 
        let path = `/devices/plc/${device.plc_id}`; 
        navigate(path);
    }

    return (
        <>

            <tr onClick={handleToggleClick}>
                <td>{device?.plc}</td>
                <td>{device?.line}</td>
                <td>{device?.name}</td>
                <td>{device?.gsd}</td>
                <td>{device?.ipAddress}</td>
            </tr>
        </>
    );
}

export default DeviceRow;