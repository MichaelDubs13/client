import Component from "../../Component";
import c_Euchner from "./_c_Euchner/c_Euchner";
import f_Multiline_Pages from "./_f_Multiline_Pages/f_Multiline_Pages";

export default class f_Safety_GateSwitch_Config extends Component{
    constructor(parent, index, gate, numberOfGates) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Safety_GateSwitch.Mechatronic._fg_Safety_GateSwitches._f_Safety_GateSwitch_Config";
        this._class = "f_Safety_GateSwitch_Config";
        this._name = `f_Safety_GateSwitch_Config${index > 1 ? index : ""}`;
        this._gate = gate;
        this._numberOfMultilinePages = Math.ceil(numberOfGates/2);
    }

    get Parameters(){
        return [
            {name: "GateSwitch_DT", value: this._gate.deviceTag, type: "String"},
            {name: "GateSwitch_Type", value: this._gate.safetyGateSwitchType, type: "String"},
            {name: "GateSwitch_HandleSide", value: this._gate.safetyGateSwitchHandle, type: "String"},
            {name: "PLC_ID", value: this._gate.plcID, type: "String"},
            {name: "Local_IP", value: this._gate.localIP, type: "String"},
            {name: "CascadingFrom", value: this._gate.gateSwitchCascadingFrom, type: "Boolean"},
            {name: "PowerStation", value: this._gate.powerSourceLocation, type: "String"},
            {name: "PowerDT", value: this._gate.powerSourceDT, type: "String"},
            {name: "EthernetStation", value: this._gate.ethernetSourceLocation, type: "String"},
            {name: "EthernetDT", value: this._gate.ethernetSourceDT, type: "String"},
            {name: "EthernetIn_DevicePort", value: this._gate.ethernetSourceDevicePort, type: "String"},
            {name: "CascadingTo", value: this._gate.safetyGateCascadingTo, type: "Boolean"},
            {name: "CascadingTo_Outside", value: this._gate.safetyGateCascadingToOutside, type: "Boolean"},
        ];
    }
    build(){
        if(this._gate.mfg === "Euchner"){
            const euchner = new c_Euchner(this, this._gate);
            euchner.build();
        }

        //when to create multiline page?
        for(let i=0;i<this._numberOfMultilinePages;i++){
            const multiline_Pages = new f_Multiline_Pages(this, this._gate);
            multiline_Pages.build();
        }
        
    }
    
}

