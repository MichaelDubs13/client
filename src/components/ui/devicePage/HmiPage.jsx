import { useParams } from "react-router-dom";
import useDeviceStore from "../../../store/deviceStore";
import React, {  useEffect } from "react";
import HmiLogRow from "./HmiLogRow";
import HmiRow from "./HmiRow";
import ModalViewHmiSettings from "./ModalViewHmiSettings";
import PrivateRoute from "../../auth/privateRoute";
import fileDataService from "../../../services/fileDataService";
import { Button } from "@tesla/design-system-react";

const HmiPage = () => {
    
    const fetchHMI = useDeviceStore((state) => state.fetchHMI);
    const fetchHmiLogs = useDeviceStore((state) => state.fetchHmiLogs);
    const device = useDeviceStore((state)=>state.device)
    const deviceLogs = useDeviceStore((state)=>state.deviceLogs)
    const { id } = useParams();

    useEffect(()=>{
        fetchHMI(id);
    }, []);


    useEffect(()=>{
        fetchHmiLogs(id);
    }, []);

    const handleDownloadSettingsFile = () =>{
        fileDataService.getHmiSettings(id);
    } 

    return (
   
        <>
            {
                device &&
                    <div style={{marginBottom:'30px', width:'1800px'}}>
                        <h2>{device.ipAddress}</h2>
                        <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', width:'100%', alignItems:'flex-start' }}>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <div className="device-info">
                                    <h5 className="device-info-key">Line: </h5>
                                    <h5 className="device-info-text">{device.line}</h5>
                                </div>
                                <div className="device-info">
                                    <h5 className="device-info-key">Shop: </h5>
                                    <h5 className="device-info-text">{device.shop}</h5>
                                </div>
                                <div className="device-info">
                                    <h5 className="device-info-key">PLC: </h5>
                                    <h5 className="device-info-text">{device.plc}</h5>
                                </div>
                                <div className="device-info">
                                    <h5 className="device-info-key">Name: </h5>
                                    <h5 className="device-info-text">{device.name}</h5>
                                </div>
                                <div className="device-info">
                                    <h5 className="device-info-key">Last Pinged: </h5>
                                    <h5 className="device-info-text">{device.last_pinged}</h5>
                                </div>
                                <div style={{display:'flex',justifyContent:'space-between', alignItems: 'center', width:'350px'}}>
                                    <h5 style={{verticalAlign:'middle', marginBottom:'20px'}}>Settings: </h5>
                                        <Button variant="secondary" 
                                        style={{width:'150px'}} onClick={handleDownloadSettingsFile}>Download</Button>
                                </div>
                            </div>
                            <img src="/HMI_IPC477.png" style={{transform: 'scale(0.6)', verticalAlign:'top'}}/>

                        </div>
                        <PrivateRoute >
                            <ModalViewHmiSettings id={id}/>           
                        </PrivateRoute>
                    </div>
            }
            {
                <HmiRow 
                    list={
                    deviceLogs?.map( (log, key) =>{
                        return(
                            <HmiLogRow hmi_id={id} log_id={log}/>
                        )})
                    }
                    title="Logs"
                    isExpanded={false}
                />
            }
        </>
    )
}

export default HmiPage;