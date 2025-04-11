import Component from "../Component";
import ProjectConfiguration from "../ProjectConfiguration";
import F_Network_SwitchConfig from "./F_Network_SwitchConfig";

export default class Fg_NetworkSwitches_FieldInstallations extends Component{
    constructor(parent, switches) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._class = "fg_NetworkSwitches_FieldInstallations.fg_NetworkSwitches_FieldInstallations";
        this._name = "fg_NetworkSwitches_FieldInstallations";
        this._switches = switches
        this._All_NetworkSwitches = this.getAllSwitchNames();
    }

    getAllSwitchNames(){
        let results = []
        this._switches.forEach(item => {
            results.push(item.switch_location_dt);
        })

        return results;
    }



    get Parameters(){
        return [
            {name: "Switch_Count_Selection", value: this._switches.length, type: "Integer"},
            {name: "FunctionalAssignment", value: ProjectConfiguration.plant, type: "String"},
            {name: "FunctionalDesignation", value: ProjectConfiguration.shop, type: "String"},
            {name: "InstallationSite", value: ProjectConfiguration.line, type: "String"},
            {name: "All_NetworkSwitches", value: this._All_NetworkSwitches, type: "String"},
        ];
    }

    build(){
        for(let i = 0; i < this._switches.length; i++){
            //TODO - find which mcp to pass into the networkConfig
            const item = this._switches[i];
            const networkSwitch = new F_Network_SwitchConfig(this,i+1, item,this._switches.length, item.mcp);
            networkSwitch.build();
        }
    }
}