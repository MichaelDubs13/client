import { xpdpOptions } from "../../Store/xpdpStore";
import DropdownItem from "../Util/DropdownItem";
import InputTextItem from "../Util/InputTextItem";
import PowerDropConfiguration from "./PowerDropConfiguration";
import LineLocationSelection from "../Common/LineLocationSelection";
import LineStationSelection from "../Common/LineStationSelection";
import "../../Eec.css";
import { isNumberValidation } from "../Util/Validations";

const XpdpConfiguration = ({xpdp, xpdpIndex}) => {
    const index = {pdpIndex:xpdpIndex}
    return (
        
        <div>
            <div>
                <LineLocationSelection item={xpdp} index={index} showPlantShop={true}/>
                <LineStationSelection title={"Location designation in which the Transformer is physically located in (e.g., ++LINE+LOCATION)"} 
                    item={xpdp} index={index} stationProperty={"xfmrLocation"}/>    
                <InputTextItem title={"Enter the cable length from the Transformer to the XPDP maind disconnect (m):"} 
                            item={xpdp} index={index} property={"xf_cable_length"} validation={isNumberValidation}/>
                <DropdownItem title={"Transformer size:"} item={xpdp} property={"xf_size"}
                    options={xpdpOptions.xfmrSizeOptions} index={index} />
                <InputTextItem title={"Enter the FLA of the Enclosure (A): (This value will be shown on the Enclosure Nameplate)"} 
                        item={xpdp} index={index} property={"amp"} validation={isNumberValidation}/>
            </div>  
            <PowerDropConfiguration xpdp={xpdp} index={xpdpIndex}/>
        </div>
    );
};
export default XpdpConfiguration;