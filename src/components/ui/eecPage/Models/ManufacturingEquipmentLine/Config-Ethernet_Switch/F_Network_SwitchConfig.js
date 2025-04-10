import Component from "../Component";
import C_Balluff_Switch from "./C_Balluff_Switch";
import C_Siemens_Switch from "./C_Siemens_Switch";
import c_Siemens_Switch from "./C_Siemens_Switch";
import f_Device_DropConfig from "./F_Device_DropConfig";

export default class F_Network_SwitchConfig extends Component{
    constructor(parent, index, networkSwitch, totalSwitchCount, mcp) {
        super(parent);
        this.parent = parent;
        this._index = index;
        this._classPath = "Config-Ethernet_Switch.Mechatronic._fg_Network_Switches_field_installations._f_Network_SwitchConfig";
        this._class = "f_Network_SwitchConfig";
        this._name = `f_Network_SwitchConfig${index > 1 ? index : ""}`;
        this._networkSwitch = networkSwitch
        this._mcp = mcp;
    }

    get Parameters(){
        return [
            {name: "PWR_IN_Location", value: this._networkSwitch.pwr_in_location, type: "String"}, //for Balluf
            {name: "PWR_IN_DT", value: this._networkSwitch.pwr_in_dt, type: "String"}, //for Balluf
            {name: "PWR1_IN_Location", value: this._networkSwitch.pwr1_in_location, type: "String"}, //for Siemens
            {name: "PWR1_IN_DT", value: this._networkSwitch.pwr1_in_dt, type: "String"}, //for Siemens
            {name: "Switch_Location", value: this._networkSwitch.switch_location, type: "String"},
            {name: "Local_IP", value: this._networkSwitch.localIp, type: "String"},
            {name: "Network_Type_Selection", value: this._networkSwitch.networkType, type: "String"},
            {name: "Switch_DT", value: this._networkSwitch.switch_dt, type: "String"},
            {name: "Switch_Type_Selection", value: this._networkSwitch.managedtype, type: "String"}, //if siemens then managed if its balluf then unmanaged
            {name: "Ethernet_Speed_Selection", value: "Gigabit", type: "String"},
            {name: "Alarm_DT", value: this._networkSwitch.alarmTag, type: "String"}, //for Siemens 
            {name: "Alarm_Output_Selection", value: this._networkSwitch.alarmOutput, type: "Boolean"}, //Reserved for plant networkSwitch
            {name: "Console_DT", value: this._networkSwitch.consoleTag, type: "String"}, //for siemens
            {name: "Console_Output_Selection", value: this._networkSwitch.consoleOutput, type: "Boolean"}, //Reserved for plant networkSwitch
            {name: "8_ports", value: this._networkSwitch.portCount, type: "Integer"},
            {name: "8or16_ports", value: this._networkSwitch.portCount, type: "Integer"},
            {name: "8or16or24_ports", value: this._networkSwitch.portCount, type: "Integer"},
            //Parameters that might need to be added later
            // {name: "Plant_IP", value: "Undefined", type: "String"},
            // {name: "PWR2_IN_Location", value: "Undefined", type: "String"},
            // {name: "PWR2_IN_DT", value: "Undefined", type: "String"},
            // {name: "Cable_Length_Selection", value: "Undefined", type: "String"},
            // {name: "8_ports", value: this._8_ports, type: "Integer"},
            // {name: "8or16_ports", value: this._8or16_ports, type: "Integer"},
            // {name: "8or16or24_ports", value: this._8or16or24_ports, type: "Integer"},
         
        ];
    }

    build(){
        const c_Balluff_Switch = new C_Balluff_Switch(this, this._networkSwitch);
        const c_Siemens_Switch = new C_Siemens_Switch(this, this._networkSwitch);
        for(let i=0; i<this._networkSwitch.portCount; i++){
            var device = this._networkSwitch.devices.find(device => device.local_switch_port === i+1)
            const dropConfig = new f_Device_DropConfig(this, i+1, this._networkSwitch, device);
        }

    }

    
}

