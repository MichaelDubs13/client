import Component from "../Component";
import f_MountingLocation_Config from "./_fg_Safety_GateSwitches/_f_MountingLocation_Config/f_MountingLocation_Config";


export default class Fg_Safety_GateSwitches extends Component{
    constructor(parent, gateGroups) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._class = "fg_Safety_GateSwitches.fg_Safety_GateSwitches";
        this._name = "fg_Safety_GateSwitches";
        this._gateGroups = gateGroups.filter(group => group.location != "undefined")
        console.log(this._gateGroups)
    }

    get Parameters(){
        return [
            {name: "MountingLocation_Count_Selection", value:this._gateGroups.length, type: "Integer"},
        ];
    }

    build(){
      
        for(let i=0;i<this._gateGroups.length;i++){
            const mountingLocationConfig = new f_MountingLocation_Config(this,i+1, this._gateGroups[i]);
            mountingLocationConfig.build();
        }
    }
}
