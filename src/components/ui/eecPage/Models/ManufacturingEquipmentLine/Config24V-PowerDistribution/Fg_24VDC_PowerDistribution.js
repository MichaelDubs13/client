import Component from "../Component";
import Fg_24VPowerDistribution from "./Fg_24VPowerDistribution";


export default class Fg_24VDC_PowerDistribution extends Component{
    constructor(parent, psus) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._class = "fg_24VDC_PowerDistribution.fg_24VDC_PowerDistribution";
        this._name = "fg_24VDC_PowerDistribution";
        this._psus = psus;
        this._totalBranches = this.getTotalBranch();
    }

    getTotalBranch() {
        console.log(this._psus);
        let totalBranch = 0;
        this._psus.forEach(psu => {
            if(psu.inputBranch > totalBranch){
                totalBranch = psu.inputBranch;
            }
        })

        return totalBranch;
    }

    get Parameters(){
        return [
            {name: "i_NumberOfCascading_24VPSUs", value: this._totalBranches, type: "Integer"},
        ];
    }

    build(){
        for(let i=0; i < this._totalBranches; i++){
            let psus = this._psus.filter(psu => psu.inputBranch === (i+1))
            const fg_24V_PowerDistribution = new Fg_24VPowerDistribution(this, i+1, psus)
            fg_24V_PowerDistribution.build();
        }
    }
}
