import "../../Eec.css";
import { projectStore } from "../../Store/projectStore";
import InputTextItem from "../Util/InputTextItem";
import DropdownItem from "../Util/DropdownItem";
import { lineStore } from "../../Store/lineStore";


const ManufacturingLineNameAndLocation = () => {
    const setPlant =  projectStore((state) => state.setPlant);
    const setShop =  projectStore((state) => state.setShop);
    const setLine =  projectStore((state) => state.setLine);
    const setinstallation_location =  projectStore((state) => state.setinstallation_location);
    const installation_location_options =  projectStore((state) => state.installation_location_options);
    const getLineOptions = lineStore((state) => state.getLineOptions)
    const plant = projectStore.getState().plant;
    const shop = projectStore.getState().shop;
    const line = projectStore.getState().line;
    const installation_location = projectStore.getState().installation_location;

    
    return (
        
        <>  
            <InputTextItem title={"Tesla GigaFactory Name"} placeHolder={plant} setModelValue={setPlant} readOnly={false} />
            <InputTextItem title={"Manufacturing Shop Name"} placeHolder={shop} setModelValue={setShop} readOnly={false} />
            <InputTextItem title={"Manufacturing Line Name"} placeHolder={line} setModelValue={setLine} onChange={getLineOptions}/>
            <DropdownItem title={"InstallationLocation"} placeHolder={installation_location} setModelValue={setinstallation_location} options={installation_location_options}/>
        </>           
    );
};
export default ManufacturingLineNameAndLocation;