import Component from "../Component";

export default class C_Balluff_Switch extends Component{
    constructor(parent, networkSwitch) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Ethernet_Switch.Mechatronic._fg_Network_Switches_field_installations._f_Network_SwitchConfig._c_Balluff_Switch";
        this._class = "c_Balluff_Switch";
        this._name = `c_Balluff_Switch`;
        this._networkSwitch = networkSwitch;
        this._switchTitle = `switch${parent._index}`;
    }


    get Parameters(){
        return [
            {name: "Switch_DT", value: this._networkSwitch.switchDT, type: "String"},
            {name: "Switch_Location", value: this._networkSwitch.location, type: "String"},
            {name: "BNI0089", value: this._networkSwitch.isBNI0089, type: "Boolean"}, //false if not balluf
            {name: "Balluff", value: this._networkSwitch.isBalluff, type: "Boolean"}, //false if not balluf
            {name: "Local_IP", value: this._networkSwitch.localIP, type: "String"},
            {name: "Plant_IP", value: this._networkSwitch.plantIP, type: "String"},
        ];
    }

    
}

