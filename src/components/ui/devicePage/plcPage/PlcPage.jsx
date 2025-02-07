import { useParams } from "react-router-dom";
import useDeviceStore from "../../../../store/deviceStore";
import React, { useState,  useEffect } from "react";
import ViewLabelForm from "./ViewLabelForm";
import PrivateRoute from "../../../auth/privateRoute";
import ModalDownloadPlcForm from "./ModalDownloadPlcForm";
import ModalUpdatePlcSettingsForm from "./ModalUpdatePlcSettingsForm";
import { TabList, Link, Card, ButtonGroup} from "@tesla/design-system-react";
import ChangeLogTab from "./ChangeLogTab";
import HardwaresTab from "./HardwaresTab";
import CallsTab from "./CallsTab";
import LibraryTab from "./LibraryTab";
import StaticAnalyzerTab from "./StaticAnalyzerTab";
import CommentTab from "./CommentTab";
import DocumentationTab from "./DocumentationTab";

const PlcPage = () => {  
    const fetchPlcRev = useDeviceStore((state) => state.fetchPlcRev);
    const fetchPLC = useDeviceStore((state) => state.fetchPLC);
    const device = useDeviceStore((state)=>state.device);
    
    const [activeTab, setActiveTab] = useState('tab-1');
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const webPortalLink = device && `http://${device.ipAddress}`;
    const scadaLink = device && `${device.scada}`;
    const splunkLink = device && `https://splunk.teslamotors.com/en-US/app/search/plc_mos?form.line_token=*&form.plcip_token=${device.ipAddress}&form.transactions_token=*&form.thingname_token=*&form.flowstepname_token=*&form.time_token.earliest=%40d&form.time_token.latest=now`
   
    const tabs = [
        {
          id: 'tab-1',
          label: 'Change Log',
          style:{fontSize:"18px"}
        },
        {
          id: 'tab-2',
          label: 'Hardwares',
          style:{fontSize:"18px"}
        },
        {
            id: 'tab-3',
            label: 'Blocks',
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-4',
            label: 'Library',
            style:{fontSize:"18px"}
        },
        {
            id: 'tab-5',
            label: 'Static Analyzer',
            style:{fontSize:"18px"}
        },
        {
            id:'tab-6',
            label:'Documentation',
            style:{fontSize:"18px"}
        },
        {
            id:'tab-7',
            label:'Comments',
            style:{fontSize:"18px"}
        }
      ];
    useEffect(()=>{
        const fetchData = async (id) =>{
            await fetchPLC(id);
            await fetchPlcRev(id);
            setIsLoading(false)
        }

        fetchData(id);
    }, []);


    const renderSwitch = (param) => {
        switch(param) {
            case 'tab-1':
                return <ChangeLogTab id={id} isLoading={isLoading}/>
            case 'tab-2':
                return <HardwaresTab id={id}/>
            case 'tab-3':
                return <CallsTab id={id}/>
            case 'tab-4':
                return <LibraryTab id={id}/>
            case 'tab-5':
                return <StaticAnalyzerTab plc={device.name}/>
            case 'tab-6':
                return <DocumentationTab id={id}/>
            case 'tab-7':
                return <CommentTab id={id}/>
            default:
                return <ChangeLogTab id={id}/>
        }
      }

    return (
   
        <>
            {
                device &&
                <div>
                    <h2>{device.ipAddress}</h2>
                    <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', width:'100%', alignItems:'flex-start' }}>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <Card variant="outline" density="dense">
                                    <div className="device-info">
                                        <h5 className="device-info-key">Line: </h5>
                                        <h5 className="device-info-text">{device.line}</h5>
                                    </div>
                                    <div className="device-info">
                                        <h5 className="device-info-key">Shop: </h5>
                                        <h5 className="device-info-text">{device.shop}</h5>
                                    </div>
                                    <div className="device-info">
                                        <h5 className="device-info-key">Name: </h5>
                                        <h5 className="device-info-text">{device.name}</h5>
                                    </div>
                                    <div className="device-info">
                                        <h5 className="device-info-key">TIA Version: </h5>
                                        <h5 className="device-info-text">{device.version}</h5>
                                    </div>
                                    <div className="device-info">
                                        <h5 className="device-info-key">PLC Type: </h5>
                                        <h5 className="device-info-text">{device.plctype}</h5>
                                    </div>
                                    <div className="device-info">
                                        <h5 className="device-info-key">Splunk Logs: </h5>
                                        <h5 className="device-info-text"><Link href={splunkLink} target="_blank" rel="noopener noreferrer">FX Http Logs</Link></h5>
                                    </div>
                                    <div className="device-info">
                                        <h5 className="device-info-key">Web Portal: </h5>
                                        <h5 className="device-info-text"><Link href={webPortalLink} target="_blank" rel="noopener noreferrer">PLC Web Server</Link></h5>
                                    </div>
                                    <div className="device-info">
                                        <h5 className="device-info-key">Scada: </h5>
                                        {
                                            device.scada == 'unknown' ?
                                            <h5 className="device-info-text">unknown</h5> :
                                            <h5 className="device-info-text"><Link href={scadaLink} target="_blank" rel="noopener noreferrer">Scada Link</Link></h5>
                                        }
                                        
                                    </div>
                                    <div className="device-info">
                                        <h5 className="device-info-key">Multiuser Server: </h5>
                                        <h5 className="device-info-text">{device.serverName}</h5>
                                    </div>
                                    <div className="device-info">
                                        <h5 className="device-info-key">Last Updated Rev: </h5>
                                        <h5 className="device-info-text">{device.rev_updated}</h5>
                                    </div>
                                    <div className="device-info">
                                        <h5 className="device-info-key">Last Pinged: </h5>
                                        <h5 className="device-info-text">{device.last_pinged}</h5>
                                    </div>
                                </Card>
                                <PrivateRoute >
                                    <h2>Tools:</h2>
                                    <div style={{display:'flex', flexDirection:'row', padding:'5px', margin:'5px', gap:'20px'}}>
                                        <ModalDownloadPlcForm device={device}/>
                                        <ModalUpdatePlcSettingsForm id={id} plc={device}/>
                                    </div>
                                    <ViewLabelForm id={id}/>
                                </PrivateRoute>
                            </div>
                            <img src="/PLC_1518F.jpg" style={{transform: 'scale(0.6)', verticalAlign:'top'}}/>
                        </div>
                </div>
            }
            <div>
                
            </div>
            <div style={{marginBottom:"25px", display:"flex", marginTop:"15px"}}>
                {/* <ModalCheckProject/>   */}
                {/* <ModalViewLabels getIDs={getIDs}/> */}
            </div>
            <div>
                    <TabList
                        animated
                        onTabChange={(e) => setActiveTab(e.currentTarget.id)}
                        selected={activeTab}
                        tabs={tabs}
                        variant="underline"
                        />
                    {
                        renderSwitch(activeTab)
                    }
            </div>
        </>
    )
}

export default PlcPage;