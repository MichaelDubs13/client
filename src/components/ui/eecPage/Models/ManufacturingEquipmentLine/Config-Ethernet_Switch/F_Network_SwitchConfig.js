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
        this._totalSwitchCount = totalSwitchCount;
        const switchName = networkSwitch.switch_location_dt.split('-');
        this._location = switchName[0];
        this._switch = switchName[1];
        this._portCount = networkSwitch.portCount;
        this._alarmOutput = networkSwitch.alarmOutput != "N";
        this._consoleOutput = networkSwitch.consoleOutput != "N";
        this._8_ports = networkSwitch.portCount === 8 ? 8: 0;
        this._8or16_ports = networkSwitch.portCount === 16 ? 16: 0;
        this._8or16or24_ports = networkSwitch.portCount === 24? 24: 0;
        this._PWR1_IN_IntPt_DT = networkSwitch.psu_location_dt;
        this._Connected_Switches = networkSwitch.inSwitch ? true : false;
    }

    get Parameters(){
        return [
            {name: "PWR_IN_Location", value: this._networkSwitch.psu_location, type: "String"}, //for Balluf
            {name: "PWR_IN_DT", value: this._networkSwitch.psu_dt, type: "String"}, //for Balluf
            {name: "PWR1_IN_Location", value: "Undefined", type: "String"}, //for Siemens
            {name: "PWR1_IN_DT", value: "Undefined", type: "String"}, //for Siemens
            // {name: "PWR2_IN_Location", value: "Undefined", type: "String"},
            // {name: "PWR2_IN_DT", value: "Undefined", type: "String"},
            {name: "Switch_Location", value: this._location, type: "String"},
            {name: "Local_IP", value: this._networkSwitch.localIp, type: "String"},
            // {name: "Plant_IP", value: "Undefined", type: "String"},
            {name: "Network_Type_Selection", value: "Local", type: "String"},
            {name: "Switch_DT", value: this._switch, type: "String"},
            {name: "Switch_Type_Selection", value: "Managed", type: "String"}, //if siemens then managed if its balluf then unmanaged
            {name: "Ethernet_Speed_Selection", value: "Gigabit", type: "String"},
            {name: "Alarm_DT", value: "Undefined", type: "String"}, //for Siemens 
            {name: "Alarm_Output_Selection", value: this._alarmOutput, type: "Boolean"}, //Reserved for plant networkSwitch
            {name: "Console_DT", value: "Undefined", type: "String"}, //for siemens
            {name: "Console_Output_Selection", value: this._consoleOutput, type: "Boolean"}, //Reserved for plant networkSwitch
            // {name: "Cable_Length_Selection", value: "Undefined", type: "String"},
            // {name: "8_ports", value: this._8_ports, type: "Integer"},
            // {name: "8or16_ports", value: this._8or16_ports, type: "Integer"},
            // {name: "8or16or24_ports", value: this._8or16or24_ports, type: "Integer"},
         
        ];
    }

    build(){
        const c_Balluff_Switch = new C_Balluff_Switch(this);
        const c_Siemens_Switch = new C_Siemens_Switch(this);
        for(let i=0; i<this._portCount; i++){
            var device = this._networkSwitch.devices.find(device => device.local_switch_port === i+1)
            const dropConfig = new f_Device_DropConfig(this, i+1, this._networkSwitch, device);
        }

    }

    
}

