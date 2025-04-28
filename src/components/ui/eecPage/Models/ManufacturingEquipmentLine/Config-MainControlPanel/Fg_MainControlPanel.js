import Component from "../Component";
import Fg_MainControlPanelComponent from "./Fg_MainControlPanelComponent";


export default class Fg_MainControlPanel extends Component{
    constructor(parent, mcps) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._class = "fg_MainControlPanel.fg_MainControlPanel";
        this._name = "fg_MainControlPanel";
        this._mcps = mcps;
    }

    get Parameters(){
        return [
            {name: "NumberofMCP_Instances", value: this._mcps.length, type: "Integer"},
        ];
    }

    build(){
        
        for(let i = 0; i < this._mcps.length; i++){
            const fg_mainPanel = new Fg_MainControlPanelComponent(this,i+1, this._mcps[i]);
            fg_mainPanel.build();
        }
    }
}
