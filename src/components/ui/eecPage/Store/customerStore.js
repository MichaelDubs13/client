import {create} from "zustand";

const customerStore = create((set) => ({
    
    property:{
        TeslaProjectSharePointLink:"",
        ProjectDescription_10011:"",
        ProjectType_10031:"", 
        TeslaProjectRevStatus:"",
        TeslaProjectRevNo:"",
        TeslaProjectDWGno:"",
        TeslaProjectApprovedDate:"",
        ManufacturingDate_10042:"",
        TeslaProjectVoltage:"",
        TeslaProjectVoltageFreq:"",
        TeslaProjectFullLoadCurrent:"",
        TeslaProjectSCCR:"",
        ControlVoltage_10041:"",
        TeslaProjectPLCsystem:"",
        TeslaProjectBusSystem:"",
        CustomerFullName_10115:"",
        CustomerDescription_10117:"",
        CustomerStreet_10105:"",
        CustomerZipCode_10107:"",
        CustomerCountry_10109:"",
        CustomerPhone_10110:"",
        CustomerEmail_10112:"",
        CreatorName1_10232:"",
        CreatorName2_10233:"",
        Creatorname3_10234:"",
        CreatorFullName_10245:"",
        CreatorStreet_10235:"",
        CreatoryZipCode_10237:"",
        CreatorCountry_10239:"",
    },
    
    setValue(value, key){
        set((state) => {
            const newProperty = {...state.property}
            newProperty[key] = value;
            return {property: {newProperty}};
        })
    }
}));

export {
    customerStore,
}