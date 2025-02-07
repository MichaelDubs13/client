import Component from "../../../Component";
export default class PanelLayout_Interior extends Component{
    constructor(parent, pdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._c_PanelLayout._c_Interior";
        this._class = `Interior`;
        this._name = `PanelLayout_Interior`;
        this._pdp = pdp;
    }

    get Parameters(){
        return [{name: "PageLocationDesignation", value: this._pdp.location, type: "String"}]
    }
}