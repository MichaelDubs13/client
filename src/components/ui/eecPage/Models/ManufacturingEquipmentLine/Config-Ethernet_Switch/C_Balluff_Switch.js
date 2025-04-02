import Component from "../Component";

export default class C_Balluff_Switch extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Ethernet_Switch.Mechatronic._fg_Network_Switches_field_installations._f_Network_SwitchConfig._c_Balluff_Switch";
        this._class = "c_Balluff_Switch";
        this._name = `c_Balluff_Switch`;
        this._location = parent._location;
        this._switch = parent._switch;
        this._switchTitle = `switch${parent._index}`;
    }

    get Parameters(){
        return [
            {name: "Switch_DT", value: this._switch, type: "String"},
            {name: "Switch_Location", value: this._location, type: "String"},
            {name: "BNI0089", value: false, type: "Boolean"}, //false if not balluf
            {name: "Balluff", value: false, type: "Boolean"}, //false if not balluf
            {name: "Local_IP", value: "", type: "String"},
            {name: "Plant_IP", value: "", type: "String"},
            // {name: "Switch_Title", value: this._switchTitle, type: "String"},
        ];
    }

    
}

