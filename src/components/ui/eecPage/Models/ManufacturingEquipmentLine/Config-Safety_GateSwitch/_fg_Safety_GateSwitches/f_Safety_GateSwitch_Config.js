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
        this._plc_id = gate.mcp.plc_id ? gate.mcp.plc_id : "";
    }

    get Parameters(){
        return [
            {name: "GateSwitch_DT", value: this._gate.device_dt, type: "String"},
            {name: "GateSwitch_Type", value: this._gate.communication_type, type: "String"},
            {name: "GateSwitch_HandleSide", value: this._gate.handleside, type: "String"},
            {name: "PLC_ID", value: this._plc_id, type: "String"},
            {name: "Local_IP", value: this._gate.localip, type: "String"},
            {name: "CascadingFrom", value: false, type: "Boolean"},
            {name: "PowerStation", value: this._gate.source24VDC_location, type: "String"},
            {name: "PowerDT", value: this._gate.source24VDC_dt, type: "String"},
            {name: "EthernetStation", value: this._gate.local_network_source_location, type: "String"},
            {name: "EthernetDT", value: this._gate.local_network_source_dt, type: "String"},
            {name: "EthernetIn_DevicePort", value: this._gate.local_switch_port, type: "String"},
            {name: "CascadingTo", value: false, type: "Boolean"},
            {name: "CascadingTo_Outside", value: false, type: "Boolean"},
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

