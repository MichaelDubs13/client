import Component from "../Component";


export default class _F_PSU extends Component{
    constructor(parent, psus) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config24V-PowerDistribution.Mechatronic._f_PSU";
        this._class = "_f_PSU";
        this._name = "_f_PSU";
        this.psus = psus;
    }

    build(){
 
    }
}
