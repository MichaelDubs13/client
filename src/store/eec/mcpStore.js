import {create} from "zustand";

const mcpStore = {
  configurations: 
    [
      {
        parameter: 'PLC_ID',
        name :'PLC_ID', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'Location',
        name :'Location', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'PowerFeed_Location_PSU',
        name :'PowerFeed_Location_PSU', 
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
      {
        parameter: 'Pwr1_IntPt1_DT',
        name :'Pwr1_IntPt1_DT', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'Pwr2_IntPt2_DT',
        name :'Pwr2_IntPt2_DT', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'MCP_Location',
        name :'MCP_Location', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
      {
        parameter: 'Local_IP_UPS',
        name :'Local_IP_UPS', 
        placeholder: ``, 
        type:"text",
        valueType:"String",
        value:``
      },
    ],
}

export default mcpStore