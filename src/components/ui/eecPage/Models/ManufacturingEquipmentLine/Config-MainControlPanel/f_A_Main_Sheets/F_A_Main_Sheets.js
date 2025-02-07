import ProjectConfiguration from "../../ProjectConfiguration";
import Component from "../../Component";
import C_EnclosureLayout from "./C_EnclosureLayout";
import C_EnclosureLabels from "./C_EnclosureLabels";
import C_PowerAndHeatLoad from "./C_PowerAndHeatLoad";


export default class F_A_Main_Sheets extends Component{
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-MainControlPanel.Mechatronic.fg_MainControlPanel.f_A_Main_Sheets";
        this._class = "f_A_Main_Sheets";
        this._name = "f_A_Main_Sheets";
        
    }

    build(){
        const enclosureLayout = new C_EnclosureLayout(this);
        const enclosureLabels = new C_EnclosureLabels(this);
        enclosureLabels.build();
        const powerAndHeadLoad = new C_PowerAndHeatLoad(this);
    }
}
