import "../../Eec.css";
import { projectStore } from "../../Store/projectStore";
import InputTextItem from "../Util/InputTextItem";
import DropdownItem from "../Util/DropdownItem";
import { lineConfiguration, lineStore } from "../../Store/lineStore";
import { customerStore } from "../../Store/customerStore";
import { Heading } from "@tesla/design-system-react";
import { isValidLineName } from "../Util/Validations";


const ManufacturingLineNameAndLocation = () => {
    const setPlant =  projectStore((state) => state.setPlant);
    const setShop =  projectStore((state) => state.setShop);
    const setLine =  projectStore((state) => state.setLine);
    const setinstallation_location =  projectStore((state) => state.setinstallation_location);
    const installation_location_options =  projectStore((state) => state.installation_location_options);
    const setValue = customerStore((state) => state.setValue);
    
    const getLineOptions = lineStore((state) => state.getLineOptions)
    const plant = projectStore.getState().plant;
    const shop = projectStore.getState().shop;
    const line = projectStore.getState().line;
    const installation_location = projectStore.getState().installation_location;
    
    const handleLineChange = (value)=>{
        lineConfiguration.setLines(line, value);
        getLineOptions();
    }
    const handleInstallationLocationChange = (value) => {
        if(value === "UL"){
            setValue("480VAC", "TeslaProjectVoltage")
            setValue("60 Hz", "TeslaProjectVoltageFreq")
        } else {
            setValue("400VAC", "TeslaProjectVoltage")
            setValue("50 Hz", "TeslaProjectVoltageFreq")
        }
    }
    return (
        
        <>  
            <Heading is="h4">Project Property</Heading>
            <InputTextItem title={"Tesla GigaFactory Name"} placeHolder={plant} setModelValue={setPlant} readOnly={false} capitalizeValues={true} validation={isValidLineName} />
            <InputTextItem title={"Manufacturing Shop Name"} placeHolder={shop} setModelValue={setShop} readOnly={false} capitalizeValues={true} validation={isValidLineName}/>
            <InputTextItem title={"Manufacturing Line Name"} placeHolder={line} setModelValue={setLine} capitalizeValues={true} onTypingFinished={handleLineChange} validation={isValidLineName}/>
            <DropdownItem title={"InstallationLocation"} placeHolder={installation_location} setModelValue={setinstallation_location} 
                options={installation_location_options} onChange={handleInstallationLocationChange}/>
        </>           
    );
};
export default ManufacturingLineNameAndLocation;