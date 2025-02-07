import {create} from "zustand";

const pdpCondiguration = {
  getConfiguration: (data) => { 
    return [
      /* {
        //I beleive we can remove this all together
        parameter: 'frmUI_PDPInstanceName',
        name :'PDP Instance Name', 
        placeholder: `Power Distribution Panel +${data.installationLocation} Parameters`, 
        type:"text",
        valueType:"String",
        value:`Power Distribution Panel +${data.installationLocation} Parameters`
      },
      {
        //I beleive we can remove this all together
        parameter: 'InstallationLocation',
        name :"", 
        placeholder: "", 
        type:"text",
        valueType:"String",
        value:data.installationLocation
      }, */
      {
          parameter: 'Plant',
          name : 'Tesla Gigafactory name', 
          placeholder: `${data.plant}`, 
          type:"text",
          valueType:"String",
          value: data.plant,
          uneditable: true
        },
        {
          parameter: 'Shop',
          name : 'Manufacturing Shop name', 
          placeholder: "", 
          type:"text",
          valueType:"String",
          value:data.shop,
          uneditable: true
        },
        {
          parameter: 'Line',
          name : 'Manufacturing Line name', 
          placeholder: "", 
          type:"text",
          valueType:"String",
          value:data.line
        },
        {
          parameter: 'Location',
          name : 'Enter the PDP name (e.g., MPDP01 or WPDP01)', 
          placeholder: "MPDP01", 
          type:"text",
          valueType:"String",
          value:"",//data.Location
        },
        {
          parameter: 'Amperage',
          name :'Amperage', 
          placeholder: "200A", 
          type:"dropdown",
          options:["200A","400A","600A"],
          valueType:"String",
          value:""
        },
        {
          parameter: 'EnclosureSize',
          name :'Enclosure size', 
          placeholder: "1000x1800x500(WHD)", 
          type:"dropdown",
          options: ["800x1400x500(WHD)","1000x1800x500(WHD)"],
          valueType:"String",
          value:"1000x1800x500(WHD)"
        },
        {
          parameter: 'NumberofPowerDrops_10A',
          name :'NumberofPowerDrops_10A', 
          placeholder: "0", 
          type:"text",
          valueType:"Integer",
          value:""
        },
        {
          parameter: 'NumberofPowerDrops_20A',
          name :'NumberofPowerDrops_20A', 
          placeholder: "0", 
          type:"text",
          valueType:"Integer",
          value:""
        },
        {
          parameter: 'NumberofPowerDrops_30A',
          name :'NumberofPowerDrops_30A', 
          placeholder: "0", 
          type:"text",
          valueType:"Integer",
          value:""
        },
        {
          parameter: 'NumberofPowerDrops_40A',
          name :'NumberofPowerDrops_40A', 
          placeholder: "0", 
          type:"text",
          valueType:"Integer",
          value:""
        },
        {
          parameter: 'NumberofPowerDrops_60A',
          name :'NumberofPowerDrops_60A', 
          placeholder: "0", 
          type:"text",
          valueType:"Integer",
          value:""
        },
        {
          parameter: 'NumberofPowerDrops_70A',
          name :'NumberofPowerDrops_70A', 
          placeholder: "0", 
          type:"text",
          valueType:"Integer",
          value:""
        },
        {
          parameter: 'NumberofPowerDrops_100A',
          name :'NumberofPowerDrops_100A', 
          placeholder: "0", 
          type:"text",
          valueType:"Integer",
          value:""
        },
        {
          parameter: 'NumberofPowerDrops_250A',
          name :'NumberofPowerDrops_250A', 
          placeholder: "0", 
          type:"text",
          valueType:"Integer",
          value:""
        },
        {
          //Need to make this read-only on the UI as it is should be the sum of all power drops
          parameter: 'NumberOfPowerDrops',
          name :'NumberOfPowerDrops', 
          placeholder: "0", 
          type:"text",
          valueType:"Integer",
          value: "",//find(data => data.parameter === "NumberofPowerDrops_10A").value
          uneditable: true
        },
        /* Delete this from the UI as it is not needed, it is handled by EEC
        {
          parameter: 'NumberofPowerDrops_FAKE',
          name :'NumberofPowerDrops_FAKE', 
          placeholder: "0", 
          type:"text",
          valueType:"Integer",
          value:""
        }, */
        /* Delete this from the UI as it is not needed, it is handled by EEC
        {
          parameter: 'TotalBusbarWidth',
          name :'', 
          placeholder: "", 
          type:"",
          valueType:"String",
          value:"1989"
        }, */
        /* Delete this from the UI as it is not needed, it is handled by EEC
        {
          parameter: 'frmUI_BusbarLength',
          name :'', 
          placeholder: "", 
          type:"",
          valueType:"Integer",
          value:"2034"
        }, */
        /* Delete this from the UI as it is not needed, it is handled by EEC
        {
          parameter: 'frmUI_OptPwrMonitorLength',
          name :'', 
          placeholder: "", 
          type:"",
          valueType:"Integer",
          value:"90"
        }, */
        /* Delete this from the UI as it is not needed, it is handled by EEC
        {
          parameter: 'frmUI_OptSPDLength',
          name :'', 
          placeholder: "", 
          type:"",
          valueType:"Integer",
          value:"55"
        }, */
        /* Delete this from the UI as it is not needed, it is handled by EEC
        {
          parameter: 'frmUI_OptHotPwrLength',
          name :'', 
          placeholder: "", 
          type:"",
          valueType:"Integer",
          value:"45"
        }, */
        {
          //This is a warning to the End User that they have entered too many power drops.
          //To resolve they would need to increase the size of the enclosure or
          //create another PDP and move some of the power drops to the new PDP.
          parameter: 'frmUI_BusbarLengthExceeded',
          name :'', 
          placeholder: "", 
          type:"checkbox",
          valueType:"Boolean",
          value:"false",
          //validation: //need to add syntax to identify the condition of the validation
        },
        {
          //This value is controlled by the "EnclosureSize" parameter value
          //if EnclosureSize = "800x1400x500(WHD)" then 3 else 4 endif
          parameter: 'NumberOfBusBars',
          name :'', 
          placeholder: "", 
          type:"",
          valueType:"Integer",
          value:"4"
        },
        {
          parameter: 'PwrMonitorEnable',
          name :'PwrMonitorEnable', 
          placeholder: "", 
          type:"checkbox",
          valueType:"Boolean",
          value:false
        },
        {
          parameter: 'Opt_SurgeProtectionDevice',
          name :'Opt_SurgeProtectionDevice', 
          placeholder: "", 
          type:"checkbox",
          valueType:"Boolean",
          value:false
        },
        {
          parameter: 'Opt_HotPwrEnable',
          name :'Opt_HotPwrEnable', 
          placeholder: "true", 
          type:"checkbox",
          valueType:"Boolean",
          value:false
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp1_Spare" = "Device"
          parameter: 'HotPwrDrop1Type',
          name :'HotPwrDrop1Type', 
          placeholder: "Spare", 
          type:"dropdown",
          options:["Device", "Spare"],
          valueType:"String",
          value:"Spare"
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp1_Spare" = "Device"
          parameter: 'HotPwrDrp1_Target_Location',
          name :'HotPwrDrp1_Target_Location', 
          placeholder: "", 
          type:"text",
          valueType:"String",
          value:"00010"
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp1_Spare" = "Device"
          parameter: 'HotPwrDrp1_Target_DT',
          name :'HotPwrDrp1_Target_DT', 
          placeholder: "", 
          type:"text",
          valueType:"String",
          value:"00010"
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp1_Spare" = "Device"
          parameter: 'HotPwrDrp1_Target_Desc',
          name :'HotPwrDrp1_Target_Desc', 
          placeholder: "", 
          type:"text",
          valueType:"String",
          value:"Hot Power 24VDC Power Supply"
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp2_Spare" = "Device"
          parameter: 'HotPwrDrop2Type',
          name :'HotPwrDrop2Type', 
          placeholder: "Spare", 
          type:"dropdown",
          options:["Device", "Spare"],
          valueType:"String",
          value:"Spare"
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp2_Spare" = "Device"
          parameter: 'HotPwrDrp2_Target_Location',
          name :'HotPwrDrp2_Target_Location', 
          placeholder: "", 
          type:"text",
          valueType:"String",
          value:"00010"
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp2_Spare" = "Device"
          parameter: 'HotPwrDrp2_Target_DT',
          name :'HotPwrDrp2_Target_DT', 
          placeholder: "", 
          type:"text",
          valueType:"String",
          value:"00010"
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp2_Spare" = "Device"
          parameter: 'HotPwrDrp2_Target_Desc',
          name :'HotPwrDrp2_Target_Desc', 
          placeholder: "", 
          type:"text",
          valueType:"String",
          value:"Hot Power 24VDC Power Supply"
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp3_Spare" = "Device"
          parameter: 'HotPwrDrop3Type',
          name :'HotPwrDrop3Type', 
          placeholder: "Spare", 
          type:"dropdown",
          options:["Device", "Spare"],
          valueType:"String",
          value:"Spare"
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp3_Spare" = "Device"
          parameter: 'HotPwrDrp3_Target_Location',
          name :'HotPwrDrp3_Target_Location', 
          placeholder: "", 
          type:"text",
          valueType:"String",
          value:"00010"
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp3_Spare" = "Device"
          parameter: 'HotPwrDrp3_Target_DT',
          name :'HotPwrDrp3_Target_DT', 
          placeholder: "", 
          type:"text",
          valueType:"String",
          value:"00010"
        },
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true && parameter "frmUI_HotPwrDrp3_Spare" = "Device"
          parameter: 'HotPwrDrp3_Target_Desc',
          name :'HotPwrDrp3_Target_Desc', 
          placeholder: "", 
          type:"text",
          valueType:"String",
          value:"Hot Power 24VDC Power Supply"
        },
        /* //This is deleted as it is not necessary 
        {
          parameter: 'frmUI_HotPwrDrp1_Spare',
          name :'HotPwrDrp1_Spare', 
          placeholder: "", 
          type:"checkbox",
          valueType:"Boolean",
          value:false
        }, */
        /* //This is deleted as it is not necessary 
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true
          parameter: 'frmUI_HotPwrDrp2_Spare',
          name :'HotPwrDrp2_Spare', 
          placeholder: "", 
          type:"checkbox",
          valueType:"Boolean",
          value:true
        }, */
        /* //This is deleted as it is not necessary 
        {
          //Only visible if parameter "Opt_HotPwrEnable" = true
          parameter: 'frmUI_HotPwrDrp3_Spare',
          name :'HotPwrDrp3_Spare', 
          placeholder: "", 
          type:"checkbox",
          valueType:"Boolean",
          value:true
        }, */
        /* //This is deleted as the value should be reteived from 
           //var installationLocation = ItemStore.lineGroupItems.find(item => item.parameter === "InstallationLocation").value
        {
          parameter: 'frmUI_InstLoc_EU',
          name :'InstLoc_EU', 
          placeholder: "", 
          type:"checkbox",
          valueType:"Boolean",
          value:false
        }, */
    ]},
}

const pdpStore = create((set) => ({
    
    pdps:[],    
    counts : [
        {
          parameter: 'NumberofPDP_Instances',
          name :'Enter the number of Power Distribution Panels required for this line:', 
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
          {
            //Not required, calculted by EEC
            parameter: 'DropsOnThisBusBar',
            name :'DropsOnThisBusBar', 
            placeholder: ``, 
            type:"text",
            valueType:"Integer",
            value:``
          },
          {
            //Not required, calculted by EEC
            parameter: 'DropsOnThisBusBarIRL',
            name :'DropsOnThisBusBarIRL', 
            placeholder: ``, 
            type:"text",
            valueType:"Integer",
            value:``
          },
          {
            //Not required, calculted by EEC
            parameter: 'BB_DT',
            name :'BB_DT', 
            placeholder: ``, 
            type:"text",
            valueType:"String",
            value:`BB_#index`
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
            /* {
              //Not required, calculted by EEC
              parameter: 'DTCounter',
              name :'DTCounter', 
              placeholder: ``, 
              type:"text",
              valueType:"String",
              value:`#index`
            },
            {
              //Not required, calculted by EEC
              parameter: 'WidthUsed',
              name :'WidthUsed', 
              placeholder: ``, 
              type:"text",
              valueType:"String",
              value:``
            },
            {
              //Not required, calculted by EEC
              parameter: 'PlacedOnBusbar',
              name :'PlacedOnBusbar', 
              placeholder: ``, 
              type:"text",
              valueType:"Integer",
              value:``
            },
            {
              //Not required, calculted by EEC
              parameter: 'BranchCircuitPlugCounter',
              name :'BranchCircuitPlugCounter', 
              placeholder: ``, 
              type:"text",
              valueType:"String",
              value:``
            },
            {
              //Not required, calculted by EEC
              parameter: 'PowerDropWidth',
              name :'PowerDropWidth', 
              placeholder: ``, 
              type:"text",
              valueType:"Integer",
              value:``
            },
            {
              //Not required, calculted by EEC
              parameter: 'ProtectionType',
              name :'ProtectionType', 
              placeholder: ``, 
              type:"text",
              valueType:"String",
              value:``
            },
            {
              //Not required, calculted by EEC
              parameter: 'frmUI_PwrDrop_visible',
              name :'frmUI_PwrDrop_visible', 
              placeholder: ``, 
              type:"checkbox",
              valueType:"Boolean",
              value:`true`
            },
            {
              //Not required, calculted by EEC
              parameter: 'frmUI_PwrDropName',
              name :'frmUI_PwrDropName', 
              placeholder: ``, 
              type:"text",
              valueType:"String",
              value:``
            }, */
          ]
        },

    addPdp: (numberOfPdp, data) => {
      set({pdps:[]});
      for (let i = 0; i < numberOfPdp; i++) {
        var group = { heading: `Power Distribution Panel ${i+1}`, items: pdpCondiguration.getConfiguration(data), busbars:[] }
        set((state) => ({pdps:[...state.pdps, group]}));
      }
    },

}));

export default pdpStore