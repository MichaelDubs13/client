import Component from "../Component";

export default class C_Siemens_Switch extends Component{
    constructor(parent, networkSwitch) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Ethernet_Switch.Mechatronic._fg_Network_Switches_field_installations._f_Network_SwitchConfig._c_Siemens_Switch";
        this._class = "c_Siemens_Switch";
        this._name = `c_Siemens_Switch`;
        this._networkSwitch = networkSwitch;
        this._switchTitle = `switch${parent._index}`;
    }


    get Parameters(){
        return [
            {name: "6GK5208_0HA00_2AS6", value: this._networkSwitch.is6GK5208_0HA00_2AS6, type: "Boolean"},
            {name: "6GK5216_0HA00_2AS6", value: this._networkSwitch.is6GK5216_0HA00_2AS6, type: "Boolean"},
            {name: "Switch_DT", value: this._networkSwitch.switch_dt, type: "String"},
            {name: "Switch_Location", value: this._networkSwitch.switch_location, type: "String"},
            {name: "PWR1_IN_IntPt_DT", value: this._networkSwitch.pwr1_in_dt, type: "String"}, //Power to the switch
            {name: "Local_IP", value: this._networkSwitch.localIp, type: "String"},
            {name: "Plant_IP", value: this._networkSwitch.plantIp, type: "String"},
        ];
    }

    
}

