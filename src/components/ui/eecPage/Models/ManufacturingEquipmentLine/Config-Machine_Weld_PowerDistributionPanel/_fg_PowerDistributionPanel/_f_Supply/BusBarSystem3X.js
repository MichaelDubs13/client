import AVT from "./AVT";
import Ground from "./Ground";
import Component from "../../../Component";

export default class BusBarSystem3X extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_Supply._c_3xBusBarSystem";
        this._class = "3xBusBarSystem";
        this._name = "3xBusBarSystem";
    }


    build(){
        const avt = new AVT(this);
        const ground = new Ground(this);
    }
}