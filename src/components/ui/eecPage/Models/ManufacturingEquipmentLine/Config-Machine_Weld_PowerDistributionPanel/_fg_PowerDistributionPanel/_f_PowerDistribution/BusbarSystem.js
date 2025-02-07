import Component from "../../../Component";
import PanelLayout_EnclosureNameplate_and_ID_tag from "./PanelLayout_EnclosureNameplate_and_ID_tag";
import PanelLayout_Exterior from "./PanelLayout_Exterior";
import PanelLayout_Interior from "./PanelLayout_Interior";
import PwrDrop from "./PwrDrop";
export default class BusbarSystem extends Component{
    constructor(parent, pdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem";
        this._class = `BusBarSystem`;
        this._name = `BusBarSystem`;
        this._pdp = pdp;
    }

    build(){

        //TODO-add busbars

        const pwrDrop = new PwrDrop(this, this._pdp);
        pwrDrop.build();

        const panelExterior = new PanelLayout_Exterior(this);
        const panelInterior = new PanelLayout_Interior(this, this._pdp);
        const panelEnclosureNamePlate = new PanelLayout_EnclosureNameplate_and_ID_tag(this);
    }
}