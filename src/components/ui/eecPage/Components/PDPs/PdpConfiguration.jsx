import { pdpOptions, pdpStore } from '../../Store/pdpStore';
import { projectStore } from '../../Store/projectStore';
import InputTextItem from '../Util/InputTextItem';
import DropdownItem from '../Util/DropdownItem';
import CheckboxItem from '../Util/CheckboxItem';
import PowerDropConfiguration from './PowerDropConfiguration';
import HotPowerConfiguration from './HotPowerConfiguration';
import { DataTable } from '@tesla/design-system-react';
import "../../Eec.css";

const PdpConfiguration = ({pdp, index}) => {
    const plant = projectStore((state) => state.plant);
    const shop = projectStore((state) => state.shop);
    const line = projectStore((state) => state.line);
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
                    <InputTextItem title={"Plant name"} placeHolder={plant} readOnly={true} />
                    <InputTextItem title={"Shop name"} placeHolder={shop} readOnly={true} />
                    <InputTextItem title={"Manufacturing Line name (e.g., UBM1, DOR1)"} placeHolder={line} readOnly={true}/>
                    <InputTextItem title={"Location designation (e.g., MPDP01, WPDP01)"} placeHolder={pdp.location} setModelValue={setPdpValue} index={pdpIndex} property={"location"}/>
                    <DropdownItem title={"Main disconnect amperage"} placeHolder={pdp.amp} setModelValue={setPdpValue} options={pdpOptions.amperageOptions} index={pdpIndex} property={"amp"}/>
                    <DropdownItem title={"Enclosure size"} placeHolder={pdp.enclosureSize} setModelValue={setPdpValue} options={pdpOptions.enclosureSizeOptions} index={pdpIndex} property={"enclosureSize"}/>
                    <InputTextItem title={"Enclosure nameplate FLA"} placeHolder={pdp.FLA} setModelValue={setPdpValue} index={pdpIndex} property={"FLA"}/>
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