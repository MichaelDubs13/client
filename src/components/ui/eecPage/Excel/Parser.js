import * as XLSX from 'xlsx'
import pdpParser from './pdpParser';
import deviceParser from './deviceParser';
import xpdpParser from './xpdpParser';
import mcpParser from './mcpParser';
import psuParser from './psuParser';
import switchParser from './switchParser';

export default class Parser {
    constructor(data) {
        this._data = data;
        this._wb = XLSX.read(this._data, {type:'binary'});
        this._projectWorksheet = "Project";
        this._devicesWorksheet = "Devices";
        this._cablesWorksheet = "Cables";
        this._pdpWorksheet = "PDP";
        this._xpdpWorksheet = "XPDP";
        this._psuWorksheet = "PSU";
        this._mcpWorksheet = "MCP";
        this._networkWorksheet = "Network";
        this._ios = "IO";
        this.powerDrops = {
            "8A 1ph": 0,
            "15A 1ph": 0,
            "20A 1ph": 0,
            "20A 3ph": 0
        };
    }

    parse(){
        const config = this.parseProjectSheet();
        let pdps = pdpParser.parse(this._wb, this._pdpWorksheet)
        let xpdps = xpdpParser.parse(this._wb, this._xpdpWorksheet)
        let mcps = mcpParser.parse(this._wb, this._mcpWorksheet)
        const devices = deviceParser.parse(this._wb, this._devicesWorksheet)
        
        var psus = psuParser.parse(this._wb, this._psuWorksheet)
        psus = psuParser.getOrderedBranch(psus);
        psus = psuParser.getPwrDrops(psus, devices)
        
        const ios = deviceParser.createIODevices(devices);
        pdps = pdpParser.createPdpBranchCircuit(pdps, devices)
        xpdps = xpdpParser.createXpdpBranchCircuit(xpdps, devices)

        let switches = switchParser.parse(this._wb, this._networkWorksheet)
        var networkTree = switchParser.createNetworkTree(devices, switches);
        
        mcps = mcpParser.getNetworkPorts(mcps, devices);
        mcps = mcpParser.getDirectNetworkDevices(mcps, devices, switches)
        return {config:config, pdps:pdps,xpdps:xpdps, mcps:mcps, psus:psus, switches:networkTree,devices:devices, ios:ios }
        
    }

    parseProjectSheet(){
        var arr = XLSX.utils.sheet_to_json(this._wb.Sheets[this._projectWorksheet]);

        const PLANT = arr[1].Value;
        const SHOP = arr[2].Value;
        const LINE = arr[3].Value;
        const INSTALLATION_LOCATION = arr[4].Value;

        //General Project properties
        const SHAREPOINT = arr[6].Value;
        const PROJECT_DESCRIPTION = arr[7].Value;
        const PROJECT_TYPE = arr[8].Value;
        const REVISION_STATUS = arr[9].Value;
        const REVISION_NUMBER = arr[10].Value;
        const DRAWING_NUMBER = arr[11].Value;
        const APPROVED_DATE = arr[12].Value;
        const MANUFACURING_DATE = arr[13].Value;
        //Project Template properties
        const VOLTAGE = arr[15].Value;
        const VOLTAGE_FREQUENCY = arr[16].Value;
        const FLA = arr[17].Value;
        const SCCR = arr[18].Value;
        const CONTROL_VOLTAGE = arr[19].Value;
        const PLC_SYSTEM = arr[20].Value;
        const BUS_SYSTEM = arr[21].Value;

        //Project Customer properties
        const CUSTOMER_FULL_NAME = arr[23].Value;
        const CUSTOMER_DESCRIPTION = arr[24].Value;
        const CUSTOMER_STREET = arr[25].Value;
        const CUSTOMER_CITY = arr[26].Value;
        const CUSTOMER_COUNTRY = arr[27].Value;
        const CUSTOMER_PHONE = arr[28].Value;
        const CUSTOMER_EMAIL = arr[29].Value;

        //Project Creator properties
        const CREATOR_ENGINEER_NAME = arr[31].Value;
        const CREATOR_MANAGER_NAME = arr[32].Value;
        const CREATOR_APPROVER_NAME = arr[33].Value;
        const CREATOR_FULL_NAME = arr[34].Value;
        const CREATOR_STREET = arr[35].Value;
        const CREATOR_CITY = arr[36].Value;
        const CREATOR_COUNTRY = arr[37].Value;
        const CREATOR_PHONE = arr[38].Value;
        const CREATOR_EMAIL = arr[39].Value;

        return {plant:PLANT, shop:SHOP, line:LINE, installation_location:INSTALLATION_LOCATION}
    }
}