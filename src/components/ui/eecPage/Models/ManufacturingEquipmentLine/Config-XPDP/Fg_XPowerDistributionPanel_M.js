import Component from "../Component";
import Fg_XPowerDistributionPanel from "./Fg_XPowerDistributionPanel";
export default class Fg_XPowerDistributionPanel_M extends Component{
    constructor(parent, xpdps) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._classPath = "";
        this._class = "fg_XPowerDistributionPanel_M.fg_XPowerDistributionPanel_M";
        this._name = "fg_XPowerDistributionPanel_M";
        this._xpdps = xpdps;
    }
    get Parameters(){
        return [{name: "NumberofXPDP_Instances", value: this._xpdps.length, type: "Integer"},
            ];
    }
    build(){
        for(let i = 0; i < this._xpdps.length; i++){
            const xpdp = this._xpdps[i];
            const fg_XPowerDistributionPanel = new Fg_XPowerDistributionPanel(this,i+1, xpdp);
            fg_XPowerDistributionPanel.build();
        }
    }
}