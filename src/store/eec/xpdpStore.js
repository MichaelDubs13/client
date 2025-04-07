import {create} from "zustand";

const xpdpConfiguration = {
  createBranchCircuit: () => {
    return {
      PwrDrop_Spare: false,
      DropType: "A-external",
      PwrDrop_DescTxt: "",
      dbl_Cable_Length: 0,
      StrBox_DT: "",
      TargetDevice_DT: "",
      TargetDevice_FLA: 0,
      StrBox_DT_FLA: 0,
    }
  },
  createBranchCircuits: () => {
    const branchCircuit = {
      "8A 1ph": [],
      "15A 1ph": [],
      "20A 1ph": [],
      "20A 3ph": []
     }

     return branchCircuit;
  },
  create: () => { 
    return {
      numberOfPwrDrop8A:"",
      numberOfPwrDrop15A:"",
      numberOfPwrDrop20A1p:"",
      numberOfPwrDrop20A3p:"",
      amp:"",
      xf_cable_length:"",
      fla_demand:"",
      fed_from:"",
      location:"",
      notes:"",
      name:"",
      spare8A:"",
      spare15A:"",
      spare20A1p:"",
      spare20A3p:"",
      xf_size:"",
      branchCircuit:xpdpConfiguration.createBranchCircuits(),
    }  
  
  },
}

const xpdpStore = create((set) => ({
    
    xpdps:[],    
    counts : [
        {
          parameter: 'NumberofXPDP_Instances',
          name :'Enter the number of 120/208VAC Power Distribution Panels required for this line:', 
          placeholder: "1", 
          type:"number",
          value:""
        },
      ],
    getPowerDistribution: () =>{
      return [
          {
            //Not required, calculted by EEC
            parameter: 'DTCounter',
            name :'DTCounter', 
            placeholder: ``, 
            type:"text",
            valueType:"String",
            value:`#index`
          },
        ]
      },
      getBranchCircuit: () =>{
        return [
            {
              parameter: 'PwrDrop_Spare',
              name :'PwrDrop_Spare', 
              placeholder: ``, 
              type:"checkbox",
              valueType:"Boolean",
              value:``
            },
            {
              parameter: 'DropType',
              name :'DropType', 
              placeholder: ``, 
              type:"text",
              valueType:"String",
              value:``
            },
            {
              parameter: 'PwrDrop_DescTxt',
              name :'PwrDrop_DescTxt', 
              placeholder: ``, 
              type:"text",
              valueType:"String",
              value:``
            },
            {
              parameter: 'dbl_Cable_Length',
              name: 'Cable length from PDP to target device (m)',
              placeholder: "",
              type: "text",
              valueType: "String",
              value: ""
            },
            {
              parameter: 'StrBox_DT',
              name :'Target device location (i.e., Station number)', 
              placeholder: "00010", 
              type:"text",
              valueType:"String",
              value:``
            },
            {
              parameter: 'TargetDevice_DT',
              name :'Target device tag', 
              placeholder: "RBC01", 
              type:"text",
              valueType:"String",
              value:``
            },
            {
              parameter: 'TargetDevice_FLA',
              name :'Target device FLA (A)', 
              placeholder: "4", 
              type:"text",
              valueType:"String",
              value:``
            },
            {
              parameter: 'StrBox_DT_FLA',
              name :'Enter FLA of this power drop (A) \n(i.e., add up all current consuming devices connected o this power drop)', 
              placeholder: "18", 
              type:"text",
              valueType:"String",
              value:``
            },
          ]
        },

    addXpdp: (numberOfXpdp, data) => {
      set({xpdps:[]});
      for (let i = 0; i < numberOfXpdp; i++) {
        var xpdp = xpdpConfiguration.create();
        set((state) => ({xpdps:[...state.xpdps, xpdp]}));
      }
    },

    addBranchCircuit:()=>{
      return xpdpConfiguration.createBranchCircuit();
    },

}));

export {
  xpdpStore,
  xpdpConfiguration,
}