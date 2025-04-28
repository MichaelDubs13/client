import Component from "../Component";
import Fg_24VPowerDistribution from "./Fg_24VPowerDistribution";


export default class Fg_24VDC_PowerDistribution extends Component{
    constructor(parent, lpds) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._class = "fg_24VDC_PowerDistribution.fg_24VDC_PowerDistribution";
        this._name = "fg_24VDC_PowerDistribution";
        this._lpds = lpds;
        
    }

    get Parameters(){
        return [
            {name: "i_NumberOfCascading_24VPSUs", value:this._lpds.length, type: "Integer"},
        ];
    }

    build(){
      
        for(let i=0;i<this._lpds.length;i++){
            const fg_24V_PowerDistribution = new Fg_24VPowerDistribution(this, i+1, this._lpds[i])
            fg_24V_PowerDistribution.build();
        }
    }
}
