import { pdpOptions, pdpStore } from '../../Store/pdpStore';
import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import PowerDropConfiguration from './PowerDropConfiguration';
import HotPowerConfiguration from './HotPowerConfiguration';
import { DataTable } from '@tesla/design-system-react';
import "../../Eec.css";
import LineLocationSelection from '../Common/LineLocationSelection';

const PdpConfiguration = ({pdp, index}) => {
    const setPdpValue = pdpStore((state) => state.setPdpValue);
    const setHotPowerBranchCircuit = pdpStore((state) => state.setHotPowerBranchCircuit);
    const pdpIndex = {pdpIndex:index}
    const handleSetOpt_HotPwrChange = (value)=> {
        if(value){
            setHotPowerBranchCircuit(index);
        }
    }


    return (
        
        <div>
            <div>
                <DataTable border={4} style={{ backgroundColor:"white", overflow:'hidden'}}> 
                    <LineLocationSelection item={pdp} index={pdpIndex} setModelValue={setPdpValue} showPlantShop={true}/>
                    <DropdownItem title={"Main disconnect amperage"} placeHolder={pdp.amp} setModelValue={setPdpValue} options={pdpOptions.amperageOptions} index={pdpIndex} property={"amp"}/>
                    <DropdownItem title={"Enclosure size"} placeHolder={pdp.enclosureSize} setModelValue={setPdpValue} options={pdpOptions.enclosureSizeOptions} index={pdpIndex} property={"enclosureSize"}/>
                    <InputTextItem title={"Enclosure nameplate FLA (e.g., 275 A)"} placeHolder={pdp.FLA} setModelValue={setPdpValue} index={pdpIndex} property={"FLA"}/>
                    <CheckboxItem title={"Power monitor enable"} placeHolder={pdp.PwrMonitorEnable} setModelValue={setPdpValue} index={pdpIndex} property={"PwrMonitorEnable"}/>
                    <CheckboxItem title={"Surge protection enable"} placeHolder={pdp.Opt_SurgeProtectionDevice} setModelValue={setPdpValue} index={pdpIndex} property={"Opt_SurgeProtectionDevice"}/>
                    <CheckboxItem title={"Hot Power enable"} placeHolder={pdp.Opt_HotPwrEnable} setModelValue={setPdpValue} index={pdpIndex} property={"Opt_HotPwrEnable"} onChange={handleSetOpt_HotPwrChange}/>
                </DataTable>
            </div>  

            {/* Input fields for each hot power drop */}
            {/* Render all hot power drops */}
            {pdp.Opt_HotPwrEnable && (
                <>
                    <HotPowerConfiguration pdp={pdp} pdpIndex={index}/>
                </>
            )}
            <PowerDropConfiguration pdp={pdp} index={index}/>
        </div>
    );
};
export default PdpConfiguration;