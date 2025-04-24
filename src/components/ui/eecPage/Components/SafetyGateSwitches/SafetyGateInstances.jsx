import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import { safetyGateOptions, safetyGateStore } from '../../Store/safetyGateStore';
import SafetyGateConfigurations from './SafetyGateConfigurations';
import { DataTable } from '@tesla/design-system-react';
import DeviceSelection from '../Common/DeviceSelection';
import { lpdConfiguration, lpdStore } from '../../Store/lpdStore';
import "../../Eec.css";

const SafetyGateInstances = ({safetyGate, index}) => {
    const setSafetyGateValue = safetyGateStore((state) => state.setSafetyGateValue);
    const setNumberOfSafetyGateSwitches = safetyGateStore((state) => state.setNumberOfSafetyGateSwitches);
    const lpds = lpdStore((state)=> state.lpds);
    const safetyGateIndex = {safetyGateIndex:index}
    const setSafetyGateSwitches = (value) =>{
        setNumberOfSafetyGateSwitches(index, value);   
    }

    // not sure if I need this function??????????
    /* const handleDeviceChange = (value) => {
        if(safetyGate.location && value){
            const drop = lpdConfiguration.getDrop(lpds, safetyGate.location, value)
            if(drop){                
                setSafetyGateValue(safetyGateIndex, "powerSourceDT", drop.data.parent.psu_dt);
                setSafetyGateValue(safetyGateIndex, "powerSourceLocation", drop.data.parent.psu_location);
                drop.setDataValue("targetDevice", safetyGate.data.id)
            }
        }
    } */

    return (
        
        <div>
            <div>
                <DataTable border={4} style={{ backgroundColor:"white", overflow:'hidden'}}> 
                    <DeviceSelection item={safetyGate} index={safetyGateIndex}
                        stationTitle={"Safety Gate Switches Location (i.e., Station number) (e.g., 00010)"} stationProperty={"location"}/> 
                    
                    
                    <InputTextItem title={"Enter the total number of Safety Gate Switches within this LOCATION (i.e., Station number)"} item={safetyGate} property={"safetyGateSwitches"} onChange={setSafetyGateSwitches} index={safetyGateIndex}/>
     
                    {/* Render all safety gate switches */}
                    <SafetyGateConfigurations safetyGate={safetyGate} safetyGateIndex={index}/>
                    
                </DataTable>
            </div>  

           
        </div>
    );
};
export default SafetyGateInstances;