import Component from "../../Component";
import Fg_PowerDistributionPanel from "./Fg_PowerDistributionPanel";
export default class Fg_M_W_PowerDistributionPanel extends Component{
    constructor(parent, pdps) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._classPath = "";
        this._class = "fg_M_W_PowerDistributionPanel.fg_M_W_PowerDistributionPanel";
        this._name = "fg_M_W_PowerDistributionPanel";
        this._pdps = pdps;
    }

    build(){
        for(let i = 0; i < this._pdps.length; i++){
            const pdp = this._pdps[i];
            const fg_PowerDistributionPanel = new Fg_PowerDistributionPanel(this,i+1, pdp);
            fg_PowerDistributionPanel.build();
        }
    }
}