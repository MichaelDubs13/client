import * as XLSX from 'xlsx'
import pdpParser from './pdpParser';
import deviceParser from './deviceParser';
import xpdpParser from './xpdpParser';
import mcpParser from './mcpParser';
import psuParser from './psuParser';
import switchParser from './switchParser';
import cableParser from './cableParser';
import ProjectConfiguration from '../Models/ManufacturingEquipmentLine/ProjectConfiguration';

export default class Parser {
    constructor(data) {
        this._data = data;
        this._wb = XLSX.read(this._data, {type:'binary'});
        this._pdpWorksheet = "UI-pdp";
    }

    parse(){
        let pdps = pdpParser.parse(this._wb, this._pdpWorksheet)
       
        return {pdps}
    }
}