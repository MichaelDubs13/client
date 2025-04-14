import { xpdpStore,xpdpOptions } from "../../Store/xpdpStore";
import DropdownItem from "../Util/DropdownItem";
import InputTextItem from "../Util/InputTextItem";
import PowerDropConfiguration from "./PowerDropConfiguration";
import { projectStore } from "../../Store/projectStore";
import "../../Eec.css";

const XpdpConfiguration = ({xpdp, xpdpIndex}) => {
    const plant = projectStore((state) => state.plant);
    const shop = projectStore((state) => state.shop);
    const line = projectStore((state) => state.line);
    const index = {pdpIndex:xpdpIndex}
    const setXPdpValue = xpdpStore((state) => state.setXPdpValue);
    

    return (
        
        <div>
            <div>
                <InputTextItem title={"Plant name"} placeHolder={plant} readOnly={true} />
                <InputTextItem title={"Shop name"} placeHolder={shop} readOnly={true} />
                <InputTextItem title={"Manufacturing Line name (e.g., UBM1, DOR1)"} placeHolder={line} readOnly={true}/>
                <InputTextItem title={"Location designation (e.g., MPDP01, WPDP01)"} placeHolder={xpdp.location} setModelValue={setXPdpValue} index={index} property={"location"}/>
                <InputTextItem title={"Location designation in which the Transformer is physically located: (i.e., Station number) (e.g., 00010)"} placeHolder={xpdp.xfmrLocation} setModelValue={setXPdpValue} index={index} property={"xfmrLocation"}/>
                <InputTextItem title={"Enter the cable length from the Transformer to the XPDP maind disconnect (m):"} placeHolder={xpdp.xf_cable_length} setModelValue={setXPdpValue} index={index} property={"xf_cable_length"}/>
                <DropdownItem title={"Transformer size:"} placeHolder={xpdp.xf_size} options={xpdpOptions.xfmrSizeOptions} setModelValue={setXPdpValue} index={index} property={"xf_size"}/>
                <InputTextItem title={"Enter the FLA of the Enclosure (A): (This value will be shown on the Enclosure Nameplate)"} placeHolder={xpdp.amp} setModelValue={setXPdpValue} index={index} property={"amp"}/>
            </div>  
            <PowerDropConfiguration xpdp={xpdp} index={xpdpIndex}/>
        </div>
    );
};
export default XpdpConfiguration;