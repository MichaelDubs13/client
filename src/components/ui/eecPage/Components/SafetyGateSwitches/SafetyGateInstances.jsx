import LineStationSelection from '../Common/LineStationSelection';
import { safetyGateStore } from '../../Store/safetyGateStore';
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
                <LineStationSelection 
                    title={"Safety Gate Switches mounted in (e.g., ++LINE+LOCATION)"}  stationProperty={"location"}
                    lineTitle={"Manufacturing Line name (e.g., UBM1, DOR1)"}
                    item={safetyGate} index={safetyGateIndex}/>
                <SetItemsNumberInputBox title={"Enter the total number of Safety Gate Switches within this LOCATION (i.e., Station number)"} 
                    items={safetyGate.safetyGateSwitches} addItems={setNumberOfSafetyGateSwitches} index={index}/>           
                {/* Render all safety gate switches */}
                <SafetyGateConfigurations safetyGate={safetyGate} safetyGateIndex={index}/>
            </div>  

           
        </div>
    );
};
export default SafetyGateInstances;