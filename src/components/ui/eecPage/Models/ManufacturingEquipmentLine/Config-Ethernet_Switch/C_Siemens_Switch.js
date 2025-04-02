import Component from "../Component";

export default class C_Siemens_Switch extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Ethernet_Switch.Mechatronic._fg_Network_Switches_field_installations._f_Network_SwitchConfig._c_Siemens_Switch";
        this._class = "c_Siemens_Switch";
        this._name = `c_Siemens_Switch`;
        this._location = parent._location;
        this._switch = parent._switch;
        this._switchTitle = `switch${parent._index}`;
    }

    get Parameters(){
        return [
            {name: "6GK5208_0HA00_2AS6", value: "", type: "Boolean"},
            {name: "6GK5216_0HA00_2AS6", value: "", type: "Boolean"},
            // {name: "Siemens", value: "", type: "Boolean"},
            {name: "Switch_DT", value: this._switch, type: "String"},
            {name: "Switch_Location", value: this._location, type: "String"},
            // {name: "DeviceType_Spare", value: false, type: "Boolean"},
            {name: "PWR1_IN_IntPt_DT", value: "", type: "String"}, //Power to the switch
            {name: "Local_IP", value: "", type: "String"},
            {name: "Plant_IP", value: "", type: "String"},
            // {name: "Switch_Title", value: this._switchTitle, type: "String"},
        ];
    }

    
}

