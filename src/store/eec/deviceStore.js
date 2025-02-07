const deviceConfigurations = {
    getPLC: ()=>{ 
    return [
      {
        parameter: 'Local_IP',
        name :'Local_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'Local_Secondary_IP',
        name :'Local_Secondary_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'PLC_IP',
        name :'PLC_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'Plant_IP',
        name :'Plant_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'b_PLC_ETH',
        name :'b_PLC_ETH', 
        placeholder: ``, 
        type:"checkbox",
        valueType:"Boolean",
        value:``
      },
    ]},
    getKED:()=>{ 
    return [
      {
        parameter: 'Local_IP',
        name :'Local_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'Local_Secondary_IP',
        name :'Local_Secondary_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'PLC_IP',
        name :'PLC_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'Plant_IP',
        name :'Plant_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
    ]},
    getLETH:()=>{ 
    return [
      {
        parameter: 'Local_IP',
        name :'Local_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'Local_Secondary_IP',
        name :'Local_Secondary_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'PLC_IP',
        name :'PLC_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'Plant_IP',
        name :'Plant_IP', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
    ]},
}

const deviceStore = {
    devices:[],
    AddPLC:()=>{
        var device = {name:"PLC", parameters:deviceConfigurations.getPLC()}
        deviceStore.devices = [...deviceStore.devices, device];
    },

    AddKED:()=>{
        var device = {name:"KED", parameters:deviceConfigurations.getKED()}
        deviceStore.devices = [...deviceStore.devices, device];
    },

    AddLETH:()=>{
        var device = {name:"LETH", parameters:deviceConfigurations.getLETH()}
        deviceStore.devices = [...deviceStore.devices, device];
    }
}

export default deviceStore;