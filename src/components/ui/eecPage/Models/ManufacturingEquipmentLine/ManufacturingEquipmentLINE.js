import Component from "./Component";
import ProjectConfiguration from "./ProjectConfiguration";

export default class ManufacturingEquipmentLINE extends Component{
    constructor(customer) {
        super();
        this._isProjectPath = true;
        this._projectPath = "MasterConfiguration.Mechatronic._line_ManufacturingEquipmentLINE";
        this._class = "ManufacturingEquipmentLINE";
        this._name = "ManufacturingEquipmentLINE";
        this._customer = customer;
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
            {name: "TeslaProjectSharePointLink", value:  this._customer.TeslaProjectSharePointLink, type: "String"},
            {name: "ProjectDescription_10011", value:  this._customer.ProjectDescription_10011, type: "String"},
            {name: "ProjectType_10031", value:  this._customer.ProjectType_10031, type: "String"},
            {name: "TeslaProjectRevStatus", value:   this._customer.TeslaProjectRevStatus, type: "String"},
            {name: "TeslaProjectRevNo", value:  this._customer.TeslaProjectRevNo, type: "String"},
            {name: "TeslaProjectDWGno", value:  this._customer.TeslaProjectDWGno, type: "String"},
            {name: "TeslaProjectApprovedDate", value:  this._customer.TeslaProjectApprovedDate, type: "String"},
            {name: "ManufacturingDate_10042", value:  this._customer.ManufacturingDate_10042, type: "String"},
            {name: "TeslaProjectVoltage", value:   this._customer.TeslaProjectVoltage, type: "String"},
            {name: "TeslaProjectVoltageFreq", value:  this._customer.TeslaProjectVoltageFreq, type: "String"},
            {name: "TeslaProjectFullLoadCurrent", value:  this._customer.TeslaProjectFullLoadCurrent, type: "String"},
            {name: "TeslaProjectSCCR", value:  this._customer.TeslaProjectSCCR, type: "String"},
            {name: "ControlVoltage_10041", value:  this._customer.ControlVoltage_10041, type: "String"},
            {name: "TeslaProjectPLCsystem", value:  this._customer.TeslaProjectPLCsystem, type: "String"},
            {name: "TeslaProjectBusSystem", value:  this._customer.TeslaProjectBusSystem, type: "String"},
            {name: "CustomerFullName_10115", value:  this._customer.CustomerFullName_10115, type: "String"},
            {name: "CustomerDescription_10117", value:  this._customer.CustomerDescription_10117, type: "String"},
            {name: "CustomerStreet_10105", value:  this._customer.CustomerStreet_10105, type: "String"},
            {name: "CustomerZipCode_10107", value:  this._customer.CustomerZipCode_10107, type: "String"},
            {name: "CustomerCountry_10109", value:  this._customer.CustomerCountry_10109, type: "String"},
            {name: "CustomerPhone_10110", value:  this._customer.CustomerPhone_10110, type: "String"},
            {name: "CustomerEmail_10112", value:  this._customer.CustomerEmail_10112, type: "String"},
            {name: "CreatorName1_10232", value:  this._customer.CreatorName1_10232, type: "String"},
            {name: "CreatorName2_10233", value:  this._customer.CreatorName2_10233, type: "String"},
            {name: "CreatorName3_10234", value:  this._customer.Creatorname3_10234, type: "String"},
            {name: "CreatorFullName_10245", value:  this._customer.CreatorFullName_10245, type: "String"},
            {name: "CreatorStreet_10235", value:  this._customer.CreatorStreet_10235, type: "String"},
            {name: "CreatorZipCode_10237", value:  this._customer.CreatoryZipCode_10237, type: "String"},
            {name: "CreatorCountry_10239", value:  this._customer.CreatorCountry_10239, type: "String"},
        ];
    }
}