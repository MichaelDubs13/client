import { xpdpStore,xpdpOptions } from "../../Store/xpdpStore";
import DropdownItem from "../Util/DropdownItem";
import InputTextItem from "../Util/InputTextItem";
import PowerDropConfiguration from "./PowerDropConfiguration";
import LineLocationSelection from "../Common/LineLocationSelection";
import StationSelection from "../Common/StationSelection";
import "../../Eec.css";

const XpdpConfiguration = ({xpdp, xpdpIndex}) => {
    const index = {pdpIndex:xpdpIndex}
    const setXPdpValue = xpdpStore((state) => state.setXPdpValue);

    return (
        
        <div>
            <div>
                <LineLocationSelection item={xpdp} index={index} setModelValue={setXPdpValue} showPlantShop={true}/>
                <StationSelection title={"Location designation in which the Transformer is physically located: (i.e., Station number) (e.g., 00010)"} item={xpdp} setModelValue={setXPdpValue} index={index} property={"xfmrLocation"}/>    
                <InputTextItem title={"Enter the cable length from the Transformer to the XPDP maind disconnect (m):"} placeHolder={xpdp.xf_cable_length} setModelValue={setXPdpValue} index={index} property={"xf_cable_length"}/>
                <DropdownItem title={"Transformer size:"} placeHolder={xpdp.xf_size} options={xpdpOptions.xfmrSizeOptions} setModelValue={setXPdpValue} index={index} property={"xf_size"}/>
                <InputTextItem title={"Enter the FLA of the Enclosure (A): (This value will be shown on the Enclosure Nameplate)"} placeHolder={xpdp.amp} setModelValue={setXPdpValue} index={index} property={"amp"}/>
            </div>  
            <PowerDropConfiguration xpdp={xpdp} index={xpdpIndex}/>
        </div>
    );
};
export default XpdpConfiguration;