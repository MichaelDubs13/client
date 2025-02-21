import Component from "../../Component";
import C_K_PE1_Busbar from "../_c_K_PE1_Busbar/C_K_PE1_Busbar";
export default class F_K_Grounding extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP.f_K_Grounding";
        this._class = "f_K_Grounding";
        this._name = "f_K_Grounding";
    }

    build(){
        const c_k_PE1_Busbar = new C_K_PE1_Busbar(this);
    }
}