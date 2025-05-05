import "../../Eec.css";
import { pdpOptions } from '../../Store/pdpStore';
import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import PowerDropConfiguration from './PowerDropConfiguration';
import HotPowerConfiguration from './HotPowerConfiguration';
import { DataTable } from '@tesla/design-system-react';
import LineLocationSelection from '../Common/LineLocationSelection';
import LineStationSelection from "../Common/LineStationSelection";

const PdpConfiguration = ({pdp, index}) => {
    const pdpIndex = {pdpIndex:index}
    const handleSetOpt_HotPwrChange = (value)=> {
        if(value){
            pdp.setHotPowerBranchCircuit();
        }
    }
    const handleLocationChange = (value) => {
        pdp.setValue(pdpIndex, "hotPowerPanelLocation", `H${value}`)
    }

    return (
        
        <div>
            <div>
                <DataTable border={4} className='data-table'> 
                    <LineLocationSelection item={pdp} index={pdpIndex} showPlantShop={true} onLocationChange={handleLocationChange}/>
                    <DropdownItem title={"Main disconnect amperage"} item={pdp} property={"amp"} options={pdpOptions.amperageOptions} index={pdpIndex}/>
                    <DropdownItem title={"Enclosure size"} item={pdp} property={"enclosureSize"} options={pdpOptions.enclosureSizeOptions} index={pdpIndex}/>
                    <InputTextItem title={"Enclosure nameplate FLA (e.g., 275 A)"} item={pdp} property={"FLA"} index={pdpIndex}/>
                    <CheckboxItem title={"Power monitor enable"} item={pdp} property={"PwrMonitorEnable"} index={pdpIndex}/>
                    <CheckboxItem title={"Surge protection enable"} item={pdp} property={"Opt_SurgeProtectionDevice"} index={pdpIndex}/>
                    <CheckboxItem title={"Hot Power enable"} item={pdp} property={"Opt_HotPwrEnable"}  index={pdpIndex} onChange={handleSetOpt_HotPwrChange}/>
                </DataTable>
            </div>  

            {pdp.Opt_HotPwrEnable && (
                <>
                    <LineStationSelection 
                        stationTitle={"HotPowerPanel Location"}  stationProperty={"hotPowerPanelLocation"}
                        item={pdp} index={index}/>
                    <HotPowerConfiguration pdp={pdp} pdpIndex={index}/>
                </>
            )}
            <PowerDropConfiguration pdp={pdp} index={index}/>
        </div>
    );
};
export default PdpConfiguration;