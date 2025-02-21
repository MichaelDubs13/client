import Component from "./Component";
import ProjectConfiguration from "./ProjectConfiguration";

export default class ManufacturingEquipmentLINE extends Component{
    constructor() {
        super();
        this._isProjectPath = true;
        this._projectPath = "MasterConfiguration.Mechatronic._line_ManufacturingEquipmentLINE";
        this._class = "ManufacturingEquipmentLINE";
        this._name = "ManufacturingEquipmentLINE";
    }

    get Parameters(){
        return [{name: "Plant", value: ProjectConfiguration.plant, type: "String"},
            {name: "Shop", value: ProjectConfiguration.shop, type: "String"},
            {name: "Line", value: ProjectConfiguration.line, type: "String"},
            {name: "InstallationLocation", value: ProjectConfiguration.installation_location, type: "String"},
            {name: "FunctionalAssignment_(PLANT)", value: ProjectConfiguration.plant, type: "String"},
            {name: "FunctionDesignation_(SHOP)", value: ProjectConfiguration.shop, type: "String"},
            {name: "InstallationSite_(LINE)", value:  ProjectConfiguration.line, type: "String"},
            {name: "CreateReports", value: false, type: "Boolean"},
        ];
    }
}