import Component from "../../Component";
import C_NetworkOverview_Interface from "./C_NetworkOverview_Interface";

export default class C_NetworkOverview extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_B_Network_Interconnect.c_NetworkOverview";
        this._class = "c_NetworkOverview";
        this._name = "c_NetworkOverview";        
    }

    build(){
        const c_NetworkOverview_Interface = new C_NetworkOverview_Interface(this);
        c_NetworkOverview_Interface.build();
    }
}
