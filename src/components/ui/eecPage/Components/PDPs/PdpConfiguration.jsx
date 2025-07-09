import "../../Eec.css";
import { pdpOptions } from '../../Store/pdpStore';
import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import PowerDropConfiguration from './PowerDropConfiguration';
import HotPowerConfiguration from './HotPowerConfiguration';
import { DataTable, FormItem, FormLabel } from '@tesla/design-system-react';
import LineLocationSelection from '../Common/LineLocationSelection';
import LineStationSelection from "../Common/LineStationSelection";
import { getTrailingNumbers } from "../../Store/util";
import { useState } from "react";

const PdpConfiguration = ({pdp, index}) => {
    const pdpIndex = {pdpIndex:index}
    const handleSetOpt_HotPwrChange = (value)=> {
        if(value){
            pdp.setHotPowerBranchCircuit();
            var trailingNumbers = getTrailingNumbers(pdp.location);
            pdp.setValue(pdpIndex, "hotPowerPanelLocation", `HPDP${trailingNumbers}`)
        }
    }
    const handleLocationChange = (value) => {
        var trailingNumbers = getTrailingNumbers(value);
        pdp.setValue(pdpIndex, "hotPowerPanelLocation", `HPDP${trailingNumbers}`)
    }

    const totalSpace = pdp.enclosureSize === "800x1400x500(WHD)" ? 1320 : 2417;
    const availableSpace = totalSpace - pdp.getSpaceUsed();
    
    return (
        
        <div>
            <div>
                <DataTable border={4} className='data-table'> 
                    <LineLocationSelection item={pdp} index={pdpIndex} showPlantShop={true} onLocationChange={handleLocationChange}/>
                    <DropdownItem title={"Main disconnect amperage"} item={pdp} property={"amp"} options={pdpOptions.amperageOptions} index={pdpIndex}/>
                    <DropdownItem title={"Enclosure size"} item={pdp} property={"enclosureSize"} options={pdpOptions.enclosureSizeOptions} index={pdpIndex}/>
                    <InputTextItem title={"Enclosure nameplate FLA (e.g., 275)"} item={pdp} property={"FLA"} index={pdpIndex}/>
                    <CheckboxItem title={"Power monitor enable"} item={pdp} property={"PwrMonitorEnable"} index={pdpIndex}/>
                    <CheckboxItem title={"Surge protection enable"} item={pdp} property={"Opt_SurgeProtectionDevice"} index={pdpIndex}/>
                    <CheckboxItem title={"Hot Power enable"} item={pdp} property={"Opt_HotPwrEnable"}  index={pdpIndex} onChange={handleSetOpt_HotPwrChange}/>
                    <div style={{display:'flex'}}>
                        <FormItem className='form-item-device'>
                            <FormLabel className="form-label-device">Available Busbar space (remaining space/total space)</FormLabel>
                            <InputTextItem valueStyle={availableSpace < 0 ?  {color:'red'} : null} placeHolder={`${availableSpace}/${totalSpace}mm`} readOnly={true}/>
                            {availableSpace < 0 && <p style={{color:'red', marginLeft:'50px'}}> The available space as been exceeded. Reduce the number of drops or create another PDP.</p>}
                        </FormItem>
                    </div>
                </DataTable>
            </div>  

            {pdp.Opt_HotPwrEnable && (
                <>
                    <LineStationSelection 
                        title={"HotPowerPanel mounted in (e.g., ++LINE+LOCATION)"}  stationProperty={"hotPowerPanelLocation"}
                        item={pdp} index={pdpIndex}/>
                    <HotPowerConfiguration pdp={pdp} pdpIndex={index}/>
                </>
            )}
            <PowerDropConfiguration pdp={pdp} index={index}/>
        </div>
    );
};
export default PdpConfiguration;