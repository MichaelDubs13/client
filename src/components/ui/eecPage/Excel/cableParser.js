import * as XLSX from 'xlsx'
import { filterItemsByStartsOptions, getCableLength, splitIntoTwo } from './util';


const cableParser = {
    parse:(workbook, sheet) => {
        var arr = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        let cables = [];
        arr.forEach(item => {
            const cable_target = item["CBL Target"];  
            const cable_source = item["CBL Source"];  
            const cable_length = item["Length"];  
            const layer = item["Layer"];  
            let cable = {  
                cable_target:cable_target,
                cable_source:cable_source, 
                cable_length:cable_length,
                layer:layer,
            }
            cables.push(cable);
        })

        return cables;
    },

    
    
}



export default cableParser;