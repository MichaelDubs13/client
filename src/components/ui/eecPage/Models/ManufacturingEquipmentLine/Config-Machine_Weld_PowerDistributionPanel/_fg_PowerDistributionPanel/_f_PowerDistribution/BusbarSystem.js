import Component from "../../../Component";
import PanelLayout_EnclosureNameplate_and_ID_tag from "./PanelLayout_EnclosureNameplate_and_ID_tag";
import PanelLayout_Exterior from "./PanelLayout_Exterior";
import PanelLayout_Interior from "./PanelLayout_Interior";
import PwrDrop from "./PwrDrop";
import BusBar from "./BusBar";

export default class BusbarSystem extends Component{
    constructor(parent, pdp) {
        super(parent);
        this.parent = parent;
        this._classPath = "Config-Machine_Weld_PowerDistributionPanel.Mechatronic._fg_PowerDistributionPanel._f_PowerDistribution._c_BusBarSystem";
        this._class = `BusBarSystem`;
        this._name = `BusBarSystem`;
        this._pdp = pdp;
        this._numberOfBusbars = this.getNumberOfBusBar();
    }

    getNumberOfBusBar(){
        if(this._pdp.enclosureSize == "800x1400x500(WHD)"){
            return 3;
        } else {
            return 4;
        }
    }

    getParameters(){
        return [
            // {name: "DTCounter", value: "00", type: "String"},
            // {name: "NumberOfBusBars", value: this._numberOfBusbars, type: "Integer"},
            ];
    }

    build(){

        for(let i = 0; i < this._numberOfBusbars; i++){
            const busbar = new BusBar(this, i+1);
        }

        const pwrDrop = new PwrDrop(this, this._pdp);
        pwrDrop.build();

        const panelExterior = new PanelLayout_Exterior(this);
        const panelInterior = new PanelLayout_Interior(this, this._pdp);
        const panelEnclosureNamePlate = new PanelLayout_EnclosureNameplate_and_ID_tag(this);
    }
}