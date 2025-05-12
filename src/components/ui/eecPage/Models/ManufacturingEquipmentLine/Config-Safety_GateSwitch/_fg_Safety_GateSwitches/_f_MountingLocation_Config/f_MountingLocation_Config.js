import Component from "../../../Component";
import f_Safety_GateSwitch_Config from "../f_Safety_GateSwitch_Config";

export default class f_MountingLocation_Config extends Component{
    constructor(parent, index, gateGroup) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Safety_GateSwitch.Mechatronic._fg_Safety_GateSwitches._f_MountingLocation_Config";
        this._class = "f_MountingLocation_Config";
        this._name = `f_MountingLocation_Config${index > 1 ? index : ""}`;
        this._gateGroup = gateGroup;
    }

    get Parameters(){
        return [
            {name: "Line", value: this._gateGroup.line, type: "String"},
            {name: "MountingLocation", value: this._gateGroup.location, type: "String"},
            {name: "GateSwitch_Count_Selection", value:this._gateGroup.safetyGateSwitches.length, type: "Integer"},
        ];
    }
    build(){
        for(let i=0;i<this._gateGroup.safetyGateSwitches.length;i++){
            const switchConfig = new f_Safety_GateSwitch_Config(this, i+1, this._gateGroup.safetyGateSwitches[i])
            switchConfig.build();
        }
    }
    
}

