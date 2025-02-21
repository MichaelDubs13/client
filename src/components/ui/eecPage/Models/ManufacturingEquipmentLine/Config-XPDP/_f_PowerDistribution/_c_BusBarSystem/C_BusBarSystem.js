import Component from "../../../Component";
import C_BusBar from "./_c_BusBar/C_BusBar";
import C_PwrDrop from "./_c_PwrDrop/C_PwrDrop";
import C_PanelLayout_Exterior from "./_c_PanelLayout_Exterior/C_PanelLayout_Exterior";
import C_PanelLayout_Interior from "./_c_PanelLayout_Interior/C_PanelLayout_Interior";
import C_PanelLayout_EnclosureNameplate_and_ID_tag from "./_c_PanelLayout_EncNmplate_and_ID_tag/C_PanelLayout_EnclosureNameplate_and_ID_tag";


export default class C_BusBarSystem extends Component{
    constructor(parent, xpdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-XFMR_PDP.Mechatronic._fg_XPDP._f_PowerDistribution._c_BusBarSystem";
        this._class = "c_BusBarSystem";
        this._name = "c_BusBarSystem";
        this._xpdp = xpdp;
       // this._numberOfBusbars = getNumberOfBusBar();
        this._numberOfBusbars = 3
    }

    // get Parameters(){
    //     return [{name: "i_xNumberOfBusBars", value: this._numberOfBusbars, type: "Integer"},
    //         ];
    // }
    build(){
        for(let i = 0; i < this._numberOfBusbars; i++){
            const busbar = new C_BusBar(this, i+1);
            busbar.build();
        }

        const c_PwrDrop = new C_PwrDrop(this, this._xpdp);
        c_PwrDrop.build();
        const c_PanelLayout_Exterior = new C_PanelLayout_Exterior(this);
        const c_PanelLayout_Interior = new C_PanelLayout_Interior(this);
        const c_PanelLayout_EnclosureNameplate_and_ID_tag = new C_PanelLayout_EnclosureNameplate_and_ID_tag(this);
    }
}