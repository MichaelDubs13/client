import "../../Eec.css";
import { projectStore } from "../../Store/projectStore";
import InputTextItem from "../Util/InputTextItem";
import DropdownItem from "../Util/DropdownItem";


const ManufacturingLineNameAndLocation = () => {
    const setPlant =  projectStore((state) => state.setPlant);
    const setShop =  projectStore((state) => state.setShop);
    const setLine =  projectStore((state) => state.setLine);
    const setinstallation_location =  projectStore((state) => state.setinstallation_location);
    const installation_location_options =  projectStore((state) => state.installation_location_options);

    return (
        
        <>  
            <InputTextItem title={"Tesla GigaFactory Name"} placeHolder={"PLANT"} setModelValue={setPlant} readOnly={false} />
            <InputTextItem title={"Manufacturing Shop Name"} placeHolder={"SHOP"} setModelValue={setShop} readOnly={false} />
            <InputTextItem title={"Manufacturing Line Name"} placeHolder={"LINE"} setModelValue={setLine} readOnly={false} />
            <DropdownItem title={"InstallationLocation"} placeHolder={"UL"} setModelValue={setinstallation_location} 
                            options={installation_location_options}/>
        </>           
    );
};
export default ManufacturingLineNameAndLocation;