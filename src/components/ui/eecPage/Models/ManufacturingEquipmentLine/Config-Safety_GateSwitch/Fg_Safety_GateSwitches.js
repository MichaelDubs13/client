import Component from "../Component";
import f_MountingLocation_Config from "./_fg_Safety_GateSwitches/_f_MountingLocation_Config/f_MountingLocation_Config";


export default class Fg_Safety_GateSwitches extends Component{
    constructor(parent, gates) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._class = "fg_Safety_GateSwitches.fg_Safety_GateSwitches";
        this._name = "fg_Safety_GateSwitches";
        let gateGroups = Object.groupBy(gates, ({ target_device_location }) => target_device_location)
        this._gateGroups = Object.keys(gateGroups).map(key => {
            return {gates:gateGroups[key], target_device_location:key}
        });
        this._gateGroups = this._gateGroups.filter(group => group.target_device_location != "undefined")
        console.log(this._gateGroups)
    }

    get Parameters(){
        return [
            {name: "MountingLocation_Count_Selection", value:this._gateGroups.length, type: "Integer"},
        ];
    }

    build(){
      
        for(let i=0;i<this._gateGroups.length;i++){
            const mountingLocationConfig = new f_MountingLocation_Config(this,i+1, this._gateGroups[i].gates, this._gateGroups[i].target_device_location);
            mountingLocationConfig.build();
        }
    }
}
