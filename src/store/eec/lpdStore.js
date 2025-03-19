import {create} from "zustand";

const lpdConfiguration = {
  
  // Change this to reflect the 24VDC power distribution configuration
  create: () => { 
    return {
        psu_supply_voltage:"",
        
  }
  }
}
const lpdStore = create((set) => ({
  counts : [
    {
      parameter: 'NumberofLPD_Instances',
      name :'Consider cascading 24VDC power supplies as a group. Enter the number of cascading groups required for this project:',
      placeholder: "1",
      type:"number",
      value:""
    },
  ],
    lpds:[],    
    addLpd: (numberOfLpd, data) => {
      set({lpds:[]});
      for (let i = 0; i < numberOfLpd; i++) {
        var lpd = lpdConfiguration.create();
        set((state) => ({lpds:[...state.lpds, lpd]}));
      }
    },

}));

export default lpdStore
/* 
const lpdInstance  = {
    getInsance: (data) => { 
        return [
          {
            parameter: 'Shop',
            name :'Shop', 
            placeholder: `${data.shop}`, 
            type:"text",
            valueType:"String",
            value:`${data.shop}`
          },
          {
            parameter: 'Line',
            name :'Line', 
            placeholder: `${data.line}`, 
            type:"text",
            valueType:"String",
            value:`${data.line}`
          },
          {
            parameter: 'Location',
            name :'Location', 
            placeholder: `LOCATION`, 
            type:"text",
            valueType:"String",
            value:`LOCATION`
          },
          {
            parameter: 'Plant',
            name :'Plant', 
            placeholder: `${data.plant}`, 
            type:"text",
            valueType:"String",
            value:`${data.plant}`
          },
          {
            parameter: 'LocalDisconnectRequired',
            name :'LocalDisconnectRequired', 
            placeholder: false, 
            type:"checkbox",
            valueType:"Boolean",
            value:false
          },
          {
            parameter: 'Turck_NumberOfPSU',
            name :'Turck_NumberOfPSU', 
            placeholder: "0", 
            type:"text",
            valueType:"Integer",
            value:"0"
          },
          {
            parameter: 'Puls_NumberOfPSU',
            name :'Puls_NumberOfPSU', 
            placeholder: "0", 
            type:"text",
            valueType:"Integer",
            value:"0"
          },
          {
            parameter: 'Siemens_NumberOfPSU',
            name :'Siemens_NumberOfPSU', 
            placeholder: "0", 
            type:"text",
            valueType:"Integer",
            value:"0"
          },
          {
            parameter: 'Balluf_BAE00FL_BAE00ET_NumberOfPSU',
            name :'Balluf_BAE00FL_BAE00ET_NumberOfPSU', 
            placeholder: "0", 
            type:"text",
            valueType:"Integer",
            value:"0"
          },
          {
            parameter: 'Balluff_CLS2_BAE0133_NumberOfPSU',
            name :'Balluff_CLS2_BAE0133_NumberOfPSU', 
            placeholder: "0", 
            type:"text",
            valueType:"Integer",
            value:"0"
          },
          {
            parameter: 'LocationDesignation',
            name :'LocationDesignation', 
            placeholder: `${data.installationLocation}`, 
            type:"text",
            valueType:"String",
            value:`${data.installationLocation}`
          },
          {
            parameter: 'DeviceTag',
            name :'DeviceTag', 
            placeholder: ``, 
            type:"text",
            valueType:"String",
            value:``
          },
          {
            parameter: 'PSU_Selection_120',
            name :'PSU_Selection_120', 
            placeholder: ``, 
            type:"text",
            valueType:"String",
            value:``
          },
          {
            parameter: '_PSUSupplyVoltage_',
            name :'_PSUSupplyVoltage_', 
            placeholder: ``, 
            type:"text",
            valueType:"String",
            value:``
          },
          {
            parameter: 'b_PSU_Selection_Balluff_BAE00ET',
            name :'b_PSU_Selection_Balluff_BAE00ET', 
            placeholder: false, 
            type:"checkbox",
            valueType:"Boolean",
            value:false
          },
          {
            parameter: 'b_PSU_Selection_BAE00FL',
            name :'b_PSU_Selection_BAE00FL',  
            placeholder: false, 
            type:"checkbox",
            valueType:"Boolean",
            value:false
          },
          {
            parameter: 'b_PSU_Selection_BAE0133',
            name :'b_PSU_Selection_BAE0133', 
            placeholder: false, 
            type:"checkbox",
            valueType:"Boolean",
            value:false
          },
          {
            parameter: 'b_PSU_Selection_Puls',
            name :'b_PSU_Selection_Puls', 
            placeholder: false, 
            type:"checkbox",
            valueType:"Boolean",
            value:false
          },
          {
            parameter: 'b_PSU_Selection_Turck',
            name :'b_PSU_Selection_Turck', 
            placeholder: false, 
            type:"checkbox",
            valueType:"Boolean",
            value:false
          },
          {
            parameter: 'b_PSU_Selection_Siemens',
            name :'b_PSU_Selection_Siemens', 
            placeholder: false, 
            type:"checkbox",
            valueType:"Boolean",
            value:false
          },
          {
            parameter: 's_PSU_Selection_120_240',
            name :'s_PSU_Selection_120_240', 
            placeholder: "", 
            type:"text",
            valueType:"String",
            value:""
          },
          {
            parameter: 'b_PSU_Selection_480_',
            name :'b_PSU_Selection_480_', 
            placeholder: false, 
            type:"checkbox",
            valueType:"Boolean",
            value:false
          },
          {
            parameter: 'b_PSU_Selection_120_',
            name :'b_PSU_Selection_120_', 
            placeholder: false, 
            type:"checkbox",
            valueType:"Boolean",
            value:false
          },
          {
            parameter: 'b_PSU_Selection_400_',
            name :'b_PSU_Selection_400_', 
            placeholder: false, 
            type:"checkbox",
            valueType:"Boolean",
            value:false
          },
          {
            parameter: 'b_PSU_Selection_240_',
            name :'b_PSU_Selection_240_', 
            placeholder: false, 
            type:"checkbox",
            valueType:"Boolean",
            value:false
          },
        ]
    }
}
const lpdStore = create((set) => ({

        lpds:[],    
        counts : [
            {
            name :'Enter the number of 24VDC Power distributions required for this line:', 
            placeholder: "1", 
            type:"number",
            value:""
            },
        ],

        addLpd: (numberOflpd, data) => {
            set({lpds:[]});
            for (let i = 0; i < numberOflpd; i++) {
                var group = { heading: `24VDC Power Distribution ${i+1}`, items: lpdInstance.getInstance(data) }
                set((state) => ({lpds:[...state.lpds, group]}));
            }
        },

    })
)

export default lpdStore; */