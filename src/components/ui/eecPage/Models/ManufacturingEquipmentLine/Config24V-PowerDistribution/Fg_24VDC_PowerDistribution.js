import Component from "../Component";
import Fg_24VPowerDistribution from "./Fg_24VPowerDistribution";


export default class Fg_24VDC_PowerDistribution extends Component{
    constructor(parent, branches) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._class = "fg_24VDC_PowerDistribution.fg_24VDC_PowerDistribution";
        this._name = "fg_24VDC_PowerDistribution";
        this._branches = branches;
        this._totalBranches = Object.keys(branches).length
    }

    get Parameters(){
        return [
            {name: "i_NumberOfCascading_24VPSUs", value: this._totalBranches, type: "Integer"},
        ];
    }

    build(){
      
        var i = 0;
        Object.keys(this._branches).forEach(key => {
            const fg_24V_PowerDistribution = new Fg_24VPowerDistribution(this, i+1, this._branches[key])
            fg_24V_PowerDistribution.build();
            i = i +1;
        });
    }
}
