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
    }

    get Parameters(){
        return [
            {name: "HMI_Line", value: this._hmi.line, type: "String"},
            {name: "HMI_Location", value: this._hmi.location, type: "String"},
            {name: "HMI_DT", value: this._hmi.deviceTag, type: "String"},
            {name: "Local_IP", value: this._hmi.localIP, type: "String"},
            {name: "Plant_IP", value: this._hmi.plantIP, type: "String"},
            {name: "PLC_ID", value: this._hmi.plcID, type: "String"},
            {name: "HMI_PwrIn_Line", value: this._hmi.powerSourceLine, type: "String"},
            {name: "HMI_PWRIn_Station", value: this._hmi.powerSourceLocation, type: "String"},
            {name: "HMI_PWRIn_DT", value: this._hmi.powerSourceDT, type: "String"},
            {name: "HMI_CascadingFrom", value: this._hmi.ethernetCascadingFrom, type: "Boolean"}, //if the network direct is another HMI then true, else false
            {name: "HMI_NetworkIn_Line", value: this._hmi.ethernetSourceLine, type: "String"},
            {name: "HMI_ETHIn_Station", value: this._hmi.ethernetSourceLocation, type: "String"},
            {name: "HMI_ETHIn_DT", value: this._hmi.ethernetSourceDT, type: "String"},
            {name: "HMI_ETHIn_DevicePort", value: this._hmi.ethernetSourceDevicePort, type: "String"},
            {name: "HMI_CascadingTo", value: this._hmi.ethernetCascadingTo, type: "Boolean"}, //if upstream network is a HMI then true, else false
            {name: "HMI_CascadingTo_Outside", value: this._hmi.ethernetCascadingToOutside, type: "Boolean"},
            {name: "HMI_ScreenSize", value: this._hmi.hmiScreenSize, type: "String"},
            {name: "Mounting_Selection", value: this._hmi.mountingType, type: "String"},
            {name: "Version_Selection", value: this._hmi.hmiVersion, type: "String"},
            {name: "RFID_Side", value: this._hmi.rfidPosition, type: "String"},
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

