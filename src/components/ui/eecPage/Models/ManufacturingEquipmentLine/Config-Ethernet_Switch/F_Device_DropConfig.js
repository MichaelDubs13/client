import Component from "../Component";

export default class f_Device_DropConfig extends Component{
    constructor(parent, index, networkSwitch, device) {
        super(parent);
        this.parent = parent;
        this._index = index;
        this._classPath = "Config-Ethernet_Switch.Mechatronic._fg_Network_Switches_field_installations._f_Device_DropConfig";
        this._class = "f_Device_DropConfig";
        this._name = `f_Device_DropConfig${index > 1 ? index : ""}`;
        this._networkSwitch = networkSwitch;
        this._device = device;
        this._switchTitle = `switch${parent._index}`;
        this._location = parent._location;
        this._switch = parent._switch;
        this._switch_full_dt = `${this._location}-${this._switch}`;
        this._network_selection_type = device?.localIp ? "Local" : "";
    }

    get Parameters(){
        return [
            {name: "Switch_SinglelinePage", value: "", type: "Integer"},
            {name: "Index_Switch_onSingleline", value: "", type: "Integer"},
            {name: "Switch_Side", value: "", type: "String"},
            {name: "Switch_Location", value: this._location, type: "String"},
            {name: "Switch_Title", value: this._switchTitle, type: "String"},
            {name: "Index_ConnectedSwitch", value: "", type: "Integer"},
            {name: "Index_UnmanagedConnection", value: "", type: "Integer"},
            {name: "Index_UnmanagedSwitch", value: "", type: "Integer"},
            {name: "Index_ConnectedDevice", value: "", type: "Integer"},
            {name: "Index_SelectedDevice", value: "", type: "Integer"},
            {name: "NetworkSwitch_DT_full", value: this._switch_full_dt, type: "String"},
            {name: "Device_DT_full", value: "", type: "String"},
            {name: "NetworkSwitch_List", value: "", type: "List"},
            {name: "Unmanaged_Connection", value: "", type: "Boolean"},
            {name: "DeviceType_IDFNetworkDrop", value: "", type: "Boolean"},
            {name: "Interruption_InOrOut", value: "", type: "String"},
            {name: "Device_Type_Selection", value: "", type: "String"},
            {name: "Switch_Type_Selection", value: "", type: "String"},
            {name: "Device_DT", value: this._device?.target_device_dt, type: "String"},
            {name: "NotPLC_Connection_DT", value: this._device?.target_device_dt, type: "String"},
            {name: "Target_Location", value: this._device?.target_device_location, type: "String"},
            {name: "Device_Location", value: this._device?.target_device_location, type: "String"},
            {name: "DeviceType_Spare", value: "", type: "Boolean"},
            {name: "Drop_Title", value: "", type: "String"},
            {name: "Device_Count", value: "", type: "String"},
            {name: "s_Port_FuncText_8ports", value: "", type: "String"},
            {name: "s_Port_FuncText_16ports", value: "", type: "String"},
            {name: "s_Port_FuncText_24ports", value: "", type: "String"},
            {name: "Cable_Length_Selection", value: "", type: "String"},
            {name: "Network_Type_Selection", value: "", type: "String"},
            {name: "NetworkSwitch_DT", value: this._device?.target_device_location_dt, type: "String"},
            {name: "Switch_Cascading", value: "", type: "Boolean"},
            {name: "Connected_Switches", value: "", type: "Boolean"},
            {name: "Switch_DT", value: this._switch, type: "String"},
        ];
    }

    
}

