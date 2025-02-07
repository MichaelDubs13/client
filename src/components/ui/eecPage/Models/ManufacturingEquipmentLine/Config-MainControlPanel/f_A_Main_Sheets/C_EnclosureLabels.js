import C_EnclosureNameplate from "./C_EnclosureNameplate";
import C_ISOLabel from "./C_ISOLabel";
import Component from "../../Component";


export default class C_EnclosureLabels extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_A_Main_Sheets.c_EnclosureLabels";
        this._class = "c_EnclosureLabels";
        this._name = "c_EnclosureLabels";
        
    }

    build(){
        const enclosureNamePlate = new C_EnclosureNameplate(this);
        const isoLabel = new C_ISOLabel(this);
    }
}
