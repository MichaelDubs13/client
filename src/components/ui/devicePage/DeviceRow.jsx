import { PiCircleFill } from "react-icons/pi";
import {IconContext} from "react-icons";
import {forwardRef} from 'react';
import { Chip, Icon, Tooltip, TooltipWrapper, useTooltipState,} from "@tesla/design-system-react";

const DeviceRow = forwardRef(({device, checked, updateCheckBoxValue}, ref) => {
    const setRevColor = () => {
        if(device.enable_report){
            return device.rev_updated >= device.rev ? "green" : "white";
        } else{
            return "red";
        }
    }
    const {
        open: openReference,
        handlers: handlersReference,
        wrapperRef: wrapperRefReference,
      } = useTooltipState({ initialOpen: false });
      const {
        open: openOnline,
        handlers: handlersOnline,
        wrapperRef: wrapperOnline,
      } = useTooltipState({ initialOpen: false });
    const setChipColor = () => {
        switch(device.version) {
            case 17:
                return "blue"
            case 18:
                return "orange"
            default:
                return "red";
                
        }
    }
    const handleChange = () => {
        updateCheckBoxValue(!checked, device);
      };
    return (
        <>
                <tr className={`tr-block`}>
                        <td className='td-device'>{device.shop}</td>
                        <td className='td-device'>{device.line}</td>
                        { device.type === "hmi" &&  <td className='td-device'>{device.plc}</td>}
                        <td className='td-device'>{device.name}</td>
                        <td className='td-device-hyperlink'>
                            {
                                device.type === "line" ? 
                                <a href={`/devices/shop/${device.shop_id}/line/${device.id}`}>
                                    {device.server} 
                                </a>
                                :
                                <a href={`/devices/${device.type}/${device.id}`}>
                                    {device.ipAddress} 
                                </a> 
                            }
                        </td>
                        
                        { device.type === "plc" && 
                        <td className='td-device'>
                            <TooltipWrapper
                                {...handlersReference}
                                wrapperRef={wrapperRefReference}
                                inline
                                className="tds-text--regular tds-text--contrast-medium"
                                >
                                    <Chip text={device.rev_updated}  statusColor={setRevColor()}/>
                                <Tooltip open={openReference} align="start">
                                    <p>{device.rev_updated} / {device.rev}</p>
                                    <p>{device.enable_report ? '': 'data parsing disabled'}</p>
                                </Tooltip>
                            </TooltipWrapper>
                                
                        </td> }
                        { device.type === "plc" && <td className='td-device'><Chip text={device.version}  statusColor={setChipColor()} /></td>}
     
                        <td className='td-device'>
                            <TooltipWrapper
                                {...handlersOnline}
                                wrapperRef={wrapperOnline}
                                inline
                                className="tds-text--regular tds-text--contrast-medium"
                                >
                                    <IconContext.Provider value={device.state? { color:"lightgreen", size:25 } : { color:"red", size:25 }}>
                                        <PiCircleFill/>
                                    </IconContext.Provider> 
                                <Tooltip open={openOnline} align="start">
                                    <p>{device.state? "online" : "offline"}</p>
                                </Tooltip>
                            </TooltipWrapper>
                        </td>
                        
                        <td className='td-device'>
                            {
                                device.type === "line" ? 
                                <input id={device.id} ref={ref} type="checkbox" name={device.server} style={{transform:"scale(1.5)"}} value={device.type} checked={checked} onChange={handleChange}/> :
                                <input id={device.id} ref={ref} type="checkbox" name={device.ipAddress} style={{transform:"scale(1.5)"}} value={device.type} checked={checked} onChange={handleChange}/>
                            }
                            
                        </td>
                </tr>
        </>
    );
});

export default DeviceRow;