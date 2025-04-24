import LineStationSelection from '../Common/LineStationSelection';
import { safetyGateOptions, safetyGateStore } from '../../Store/safetyGateStore';
import SetItemsNumberInputBox from '../Common/SetItemsNumberInputBox';
import SafetyGateConfigurations from './SafetyGateConfigurations';
import { DataTable } from '@tesla/design-system-react';
import "../../Eec.css";

const SafetyGateInstances = ({safetyGate, index}) => {
    const setNumberOfSafetyGateSwitches = safetyGateStore((state) => state.setNumberOfSafetyGateSwitches);
    const safetyGateIndex = {safetyGateIndex:index}

    return (
        
        <div>
            <div>
                <DataTable border={4} style={{ backgroundColor:"white", overflow:'hidden'}}> 
                     <LineStationSelection 
                        stationTitle={"Safety Gate Switches Location (i.e., Station number) (e.g., 00010)"}  stationProperty={"location"}
                        lineTitle={"Manufacturing Line name (e.g., UBM1, DOR1)"}
                        item={safetyGate} index={safetyGateIndex}/>
                    <SetItemsNumberInputBox title={"Enter the total number of Safety Gate Switches within this LOCATION (i.e., Station number)"} 
                        items={safetyGate.safetyGateSwitches} addItems={setNumberOfSafetyGateSwitches} index={index}/>           
                    {/* Render all safety gate switches */}
                    <SafetyGateConfigurations safetyGate={safetyGate} safetyGateIndex={index}/>
                    
                </DataTable>
            </div>  

           
        </div>
    );
};
export default SafetyGateInstances;