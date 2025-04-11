import Component from "../../../Component";
import f_HMI_Config from "./f_HMI_Config";


export default class Fg_HMIs extends Component{
    constructor(parent, hmis) {
        super(parent);
        this.parent = parent;
        this._isProjectPath = true;
        this._class = "fg_HMIs.fg_HMIs";
        this._name = "fg_HMIs";
        this._hmis = hmis;
        
    }

    get Parameters(){
        return [
            {name: "HMI_Count_Selection", value:this._hmis.length, type: "Integer"},
        ];
    }

    build(){
      
        for(let i=0;i<this._hmis.length;i++){
            const hmiConfig = new f_HMI_Config(this,i+1, this._hmis[i])
            hmiConfig.build();
        }
    }
}
