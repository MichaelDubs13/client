import Component from "../../../Component";
import f_ExtensionSlot_Config from "../_f_ExtensionSlot_Config/f_ExtensionSlot_Config";
import c_Siemens from "./_c_Siemens/c_Siemens";

export default class f_HMI_Config extends Component{
    constructor(parent,index,hmi) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-HMI.Mechatronic._fg_HMIs._f_HMI_Config";
        this._class = `f_HMI_Config`;
        this._name = `f_HMI_Config${index > 1 ? index : ""}`;
        this._hmi = hmi;
        this._plc_id = hmi.mcp.plc_id ? hmi.mcp.plc_id : "";
    }

    get Parameters(){
        return [
            {name: "HMI_Location", value: this._hmi.target_device_location, type: "String"},
            {name: "HMI_DT", value: this._hmi.device_dt, type: "String"},
            {name: "Local_IP", value: this._hmi.localip, type: "String"},
            {name: "Plant_IP", value: this._hmi.plant_ip, type: "String"},
            {name: "PLC_ID", value: this._plc_id, type: "String"},
            {name: "HMI_PWRIn_Station", value: this._hmi.source24VDC_location, type: "String"},
            {name: "HMI_PWRIn_DT", value: this._hmi.source24VDC_dt, type: "String"},
            {name: "HMI_CascadingFrom", value: false, type: "Boolean"}, //if the network direct is another HMI then true, else false
            {name: "HMI_ETHIn_Station", value: this._hmi.local_network_source_location, type: "String"},
            {name: "HMI_ETHIn_DT", value: this._hmi.local_network_source_dt, type: "String"},
            {name: "HMI_ETHIn_DevicePort", value: this._hmi.local_switch_port, type: "String"},
            {name: "HMI_CascadingTo", value: false, type: "Boolean"}, //if upstream network is a HMI then true, else false
            {name: "HMI_CascadingTo_Outside", value: false, type: "Boolean"},
            {name: "HMI_ScreenSize", value: this._hmi.screen_size, type: "String"},
            {name: "Mounting_Selection", value: this._hmi.mounting, type: "String"},
            {name: "Version_Selection", value: this._hmi.version, type: "String"},
            {name: "RFID_Side", value: this._hmi.rfid_side, type: "String"},
        ];
    }
    build(){
        if(this._hmi.mfg === "Siemens"){
            const siemens = new c_Siemens(this, this._hmi);
            siemens.build();
        }

        for(let i=0;i<8;i++){
            const hmiConfig = new f_ExtensionSlot_Config(this,i+1, this._hmi)
            hmiConfig.build();
        }
    }
    
}

