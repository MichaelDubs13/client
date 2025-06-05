import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { circularReplacer } from "./util";

const customerOptions = {
    teslaProjectRevStatusOptions: [
        {value: "60", label: "60"},
        {value: "70", label: "70"},
        {value: "90", label: "90"},
        {value: "110", label: "110"},
        {value: "130", label: "130"},
        {value: "200", label: "200"},
        {value: "220", label: "220"},
        {value: "250", label: "250"},
        {value: "270", label: "270"},
        {value: "280", label: "280"},
        {value: "290", label: "290"},
        {value: "300", label: "300"},
    ],
    teslaProjectVoltageOptions: [
        {value: "###Enter Data - Voltage", label: "###Enter Data - Voltage"},
        {value: "400VAC", label: "400VAC"},
        {value: "480VAC", label: "480VAC"},
    ],
    teslaProjectVoltageFreqOptions: [
        {value: "###Enter Data - Frequency", label: "###Enter Data - Frequency"},
        {value: "50 Hz", label: "50 Hz"},
        {value: "60 Hz", label: "60 Hz"},
        {value: "50/60 Hz", label: "50/50 Hz"},
    ],
}

const customerStore = create(
    persist((set,get) => ({
        property:{
            TeslaProjectSharePointLink:"###Copy and Paste the SharePoint link here...",
            ProjectDescription_10011:"###Enter Data - Project Description",
            ProjectType_10031:"###Enter Data - Installation/Machine", 
            TeslaProjectRevStatus:"60",
            TeslaProjectRevNo:"00",
            TeslaProjectDWGno:"###Enter Data - Drawing No.",
            TeslaProjectApprovedDate:"###Enter Data - Approved Date",
            ManufacturingDate_10042:"###Enter Data - Manufacturing Date",
            TeslaProjectVoltage:"###Enter Data - Voltage",
            TeslaProjectVoltageFreq:"###Enter Data - Frequency",
            TeslaProjectFullLoadCurrent:"###Enter Data - Full Load Current",
            TeslaProjectSCCR:"###Enter Data - Short Circuit Current Rating",
            ControlVoltage_10041:"###Enter Data - Control_Voltage",
            TeslaProjectPLCsystem:"###Enter Data - PLC System",
            TeslaProjectBusSystem:"###Enter Data - Bus System/Comm Protocol",
            CustomerFullName_10115:"Tesla, Inc.",
            CustomerDescription_10117:"###Enter Data - Plant Name",
            CustomerStreet_10105:"###Enter Data - Plant Street",
            CustomerZipCode_10107:"###Enter Data - Plant Zip Code/City",
            CustomerCountry_10109:"###Enter Data - Plant Country",
            CustomerPhone_10110:"###Enter Data - Plant Phone No.",
            CustomerEmail_10112:"###Enter Data - Plant Email or Website",
            CreatorName1_10232:"###Enter Data - Supplier Project Engineer",
            CreatorName2_10233:"###Enter Data - Supplier Project Manager",
            Creatorname3_10234:"###Enter Data - Supplier Project Approval",
            CreatorFullName_10245:"###Enter Data - Supplier Name",
            CreatorStreet_10235:"###Enter Data - Supplier Street",
            CreatoryZipCode_10237:"###Enter Data - Supplier Zip Code/City",
            CreatorCountry_10239:"###Enter Data - Supplier Country",
            CreatorPhone_10240:"###Enter Data - Supplier Phone No.",
            CreatorEmail_10242:"###Enter Data - Supplier Email or Website",
            b_EnableSendMail: true, // EEC variable name: Enable_Send_Mail
            userEmailAddress: "", // EEC variable name: User_Email_Address
        },
    
        setValue(value, key){
            set((state) => {
                const newProperty = {...state.property}
                newProperty[key] = value;
                return {property: newProperty};
        })},

        setProperty(value){
            set((state)=>{
                return {property: value};
            })
        }
        
    }),
    {
        name: 'customer-state',
        storage: createJSONStorage(() => localStorage),
        serialize: (state) => {
        return JSON.stringify(state, circularReplacer())
        },        
    }
));

export {
    customerStore,
    customerOptions
}