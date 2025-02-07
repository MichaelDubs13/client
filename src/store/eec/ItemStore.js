import { dateToIsoDateString } from "@tesla/design-system-react";

const ItemStore = {
  lineGroupItems: [
    //Manufacturing Line Requiements > Manufacturing Line Location and Name
        {
          parameter: 'FunctionalAssignment_(PLANT)',
          name :'Tesla GigaFactory Name', 
          placeholder: "PLANT", 
          type:"text",
          valueType:"String",
          value:""
        },
        {
          parameter: 'FunctionDesignation_(SHOP)',
          name :'Manufacturing Shop Name', 
          placeholder: "SHOP", 
          type:"text",
          valueType:"String",
          value:""
        },
        {
          parameter: 'InstallationSite_(LINE)',
          name :'Manufacturing Line Name', 
          placeholder: "LINE", 
          type:"text",
          valueType:"String",
          value:""
        },
        {
          parameter: 'LocationDesignation',
          name: '',
          placeholder: "",
          type: "",
          valueType: "String",
          value: ""
        },
        {
          parameter: 'DocumentType',
          name :'', 
          placeholder: "", 
          type:"",
          valueType:"String",
          value:""
        },
        {
          parameter: 'InstallationLocation',
          name :'Installation Location', 
          placeholder: "UL", 
          type:"dropdown",
          options: ["UL", "EU"],
          valueType:"String",
          value:"UL"
        },
        {
          parameter: 'CreateReports',
          name :'', 
          placeholder: "", 
          type:"",
          valueType:"Boolean",
          value:"false"
        },
        //{
        //  parameter: 'Script',
        //  name :'', 
        //  placeholder: "", 
        //  type:"",
        //  valueType:"String",
        //  value:"Undefined"
        //},
        
        {
          //the following is an example item with a dependency
          dependency: 
          {
            parameter: 'make visible the following parameter',
            value: 'if "UL" then display else hide',
          },

          parameter: 'MichaelsTest_EECparameter',
          name :'Enter data here for EEC', 
          placeholder: "Example text shown in light gray in the input field", 
          type:"text",
          valueType:"String",
          value:"set the default value and it will go to EEC"
        },
      ],
   secondGroupItems : [
    //Project properties > General Project Properties
        {
          parameter: 'TeslaProjectSharePointLink',
          name :'Tesla SharePoint Project Links', 
          placeholder: "###Copy and Paste the SharePoint link here...", 
          type:"text",
          value:""
        },
        {
          parameter: 'ProjectDescription_10011',
          name :'Project Descriptions', 
          placeholder: "###Enter Data - Project Description",
          type:"text" ,
          value:""
        },
        {
          parameter: 'ProjectType_10031',
          name :'Project Type', 
          placeholder: "###Enter Data - Installation/Machine", 
          type:"text",
          value:""
        },
        {
          parameter: 'TeslaProjectRevStatus',
          name :'Revision Status', 
          placeholder: "60", 
          type:"text",
          value:"60"
        },
        {
          parameter: 'TeslaProjectRevNo',
          name: 'Revision number',
          placeholder: "00",
          type: "text",
          value: "00"
        },
        {
          parameter: 'TeslaProjectDWGno',
          name: 'Drawing number',
          placeholder: "###Enter Data - Drawing No.",
          type: "text",
          value: ""
        },
        {
          parameter: 'TeslaProjectApprovedDate',
          name: 'Approved date',
          placeholder: "###Enter Data - Approved Data",
          type: "text",
          value: ""
        },
        {
          parameter: 'ManufacturingDate_10042',
          name: 'Manufacturing data',
          placeholder: "###Enter Data - Manufacturing Date",
          type: "text",
          value: ""
        }
      ],
   ProjPropTechincalPropGroupItems : [
    //Project Properties > Project Technical Properties
        {
          parameter: 'TeslaProjectVoltage',
          name: 'Voltage',
          placeholder: "###Enter Data - Voltage",
          type: "dropdown",
          options: ["###Enter Data - Voltage","400VAC","480VAC"],
          valueType: "String",
          value: ""
        },
        {
          parameter: 'TeslaProjectVoltageFreq',
          name: 'Voltage frequency',
          placeholder: "###Enter Data - Frequency",
          type: "dropdown",
          options: ["###Enter Data - Frequency","50Hz","60Hz","50/60Hz"],
          valueType: "String",
          value: ""
        },
        {
          parameter: 'TeslaProjectFullLoadCurrent',
          name: 'Full load current (FLA)',
          placeholder: "###Enter Data - Full Load Current",
          type: "text",
          value: ""
        },
        {
          parameter: 'TeslaProjectSCCR',
          name: 'Short Circuit Current Rating (SCCR)',
          placeholder: "###Enter Data - Short Circuit Current Rating",
          type: "text",
          value: ""
        },
        {
          parameter: 'ControlVoltage_10041',
          name: 'Control voltage',
          placeholder: "###Enter Data - Control Voltage",
          type: "text",
          value: "",
        },
        {
          parameter: 'TeslaProjectPLCsystem',
          name: 'PLC System',
          placeholder: "###Enter Data - PLC System",
          type: "text",
          value: ""
        },
        {
          parameter: 'TeslaProjectBusSystem',
          name: 'Bus System',
          placeholder: "###Enter Data - Bus System/Comm Protocol",
          type: "text",
          value: ""
        }
      ],
   thirdGroupItems : [
    //Project Properties > Project Customer Properties
        {
          parameter: 'CustomerFullName_10115',
          name :'Customer - Full Name', 
          placeholder: "Tesla, Inc.", 
          type:"text",
          value:"Tesla, Inc."
        },
        {
          parameter: 'CustomerDescription_10117',
          name :'Customer - Description', 
          placeholder: "###Enter Data - Plant Name", 
          type:"text",
          value:""
        },
        {
          parameter: 'CustomerStreet_10105',
          name :'Customer - Street', 
          placeholder: "###Enter Data - Plant Street", 
          type:"text",
          value:""
        },
        {
          parameter: 'CustomerZipCode_10107',
          name :'Customer - Zip Code(City)', 
          placeholder: "###Enter Data - Plant Zip Code/City", 
          type:"text",
          value:""
        },
        {
          parameter: 'CustomerCountry_10109',
          name: 'Customer - Country',
          placeholder: "###Enter Data - Plant Country",
          type: "text",
          value: ""
        },
        {
          parameter: 'CustomerPhone_10110',
          name: 'Customer - Phone',
          placeholder: "###Enter Data - Customer Phone No.",
          type: "text",
          value: ""
        },
        {
          parameter: 'CustomerEmail_10112',
          name: 'Customer - E-mail',
          placeholder: "###Enter Data - Plant Email or Website",
          type: "text",
          value: ""
        }
      ],
   fourthGroupItems : [
    //Project Properties > Project Creator Properties
        {
          parameter: 'CreatorName1_10232',
          name :'Creator - Project Engineer Name', 
          placeholder: "###Enter Data - Supplier Project Engineer", 
          type:"text",
          value:""
        },
        {
          parameter: 'CreatorName2_10233',
          name :'Creator - Project Manager Name', 
          placeholder: "###Enter Data - Supplier Project Manager", 
          type:"text",
          value:""
        },
        {
          parameter: 'Creatorname3_10234',
          name :'Creator - Project Approver Name', 
          placeholder: "###Enter Data - Supplier Project Approval", 
          type:"text",
          value:""
        },
        {
          parameter: 'CreatorFullName_10245',
          name :'Creator - Full Name', 
          placeholder: "###Enter Data - Supplier Name", 
          type:"text",
          value:""
        },
        {
          parameter: 'CreatorStreet_10235',
          name :'Creator - Street', 
          placeholder: "###Enter Data - Supplier Street", 
          type:"text",
          value:""
        },
        {
          parameter: 'CreatoryZipCode_10237',
          name :'Creator - Zip code(City)', 
          placeholder: "###Enter Data - Supplier Zip Code/City", 
          type:"text",
          value:""
        },
        {
          parameter: 'CreatorCountry_10239',
          name :'Creator - Country', 
          placeholder: "###Enter Data - Supplier Country", 
          type:"text",
          value:""
        },
        {
          parameter: 'CreatorPhone_10240',
          name :'Creator - Phone', 
          placeholder: "###Enter Data - Supplier Phone No.", 
          type:"text",
          value:""
        },
        {
          parameter: 'CreatorEmail_10242',
          name :'Creator - E-mail', 
          placeholder: "###Enter Data - Supplier Email or Website", 
          type:"text",
          value:""
        },
    
      ],
}

export default ItemStore;