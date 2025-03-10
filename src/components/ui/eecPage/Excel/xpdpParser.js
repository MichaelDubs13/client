import * as XLSX from 'xlsx'


const xpdpParser = {
     parse(workbook, worksheet){
           var arr = XLSX.utils.sheet_to_json(workbook.Sheets[worksheet]);
           let xpdps = [];
           arr.forEach(item => {
               var numberOfPwrDrop8A = item["# of Power Drops 8A (1Ph)"];
               var numberOfPwrDrop15A = item["# of Power Drops 15A (1Ph)"];
               var numberOfPwrDrop20A1p = item["# of Power Drops 20A (1Ph)"];
               var numberOfPwrDrop20A3p = item["# of Power Drops 20A (3Ph)"];
   
               numberOfPwrDrop8A = numberOfPwrDrop8A > 2 ? 2 : numberOfPwrDrop8A;
               numberOfPwrDrop15A = numberOfPwrDrop15A > 2 ? 2 : numberOfPwrDrop15A;
               numberOfPwrDrop20A1p = numberOfPwrDrop20A1p > 2 ? 2 : numberOfPwrDrop20A1p;
               numberOfPwrDrop20A3p = numberOfPwrDrop20A3p > 2 ? 2 : numberOfPwrDrop20A3p;
   
               var amp = item["Amperage"];
               amp = `${amp}A`;
               const xf_cable_length = item["Cable Length from XF (m)"];
               const fla_demand = item["FLA Demand (average per phase)"];
               const fed_from = item["Fed From"];
               var location = item["Location"];
               var location = item["Location"];
               if(location){
                   var locationArray = location.split('-')
                   if(locationArray.length > 1){
                       location = locationArray[1]
                   }
               }
               const notes = item["Notes"];
               const name = item["PDP name"];
               const spare8A = item["Spare 8A (1Ph)"];
               const spare15A = item["Spare 15A (1Ph)"];
               const spare20A1p = item["Spare 20A (1Ph)"];
               const spare20A3p = item["Spare 20A (3Ph)"];
               var xf_size = item["XF Size"];
               if(xf_size){
                   if(xf_size.startsWith("30kVA")){
                       xf_size = "30kVA Transformer"
                   }
               }
               const branchCircuit = {
                   "8A 1ph": [],
                   "15A 1ph": [],
                   "20A 1ph": [],
                   "20A 3ph": []
                 }
               
               //ensure powerDrops is initialized before assignment
               this.powerDrops = this.powerDrops || {};
               this.powerDrops["8A 1ph"] = numberOfPwrDrop8A;
               this.powerDrops["15A 1ph"] = numberOfPwrDrop15A;
               this.powerDrops["20A 1ph"] = numberOfPwrDrop20A1p;
               this.powerDrops["20A 3ph"] = numberOfPwrDrop20A3p;
   
               if(location){
                   const xpdp = {
                       numberOfPwrDrop8A:numberOfPwrDrop8A,
                       numberOfPwrDrop15A:numberOfPwrDrop15A,
                       numberOfPwrDrop20A1p:numberOfPwrDrop20A1p,
                       numberOfPwrDrop20A3p:numberOfPwrDrop20A3p,
                       amp:amp,
                       xf_cable_length:xf_cable_length,
                       fla_demand:fla_demand,
                       fed_from:fed_from,
                       location:location,
                       notes:notes,
                       name:name,
                       spare8A:spare8A,
                       spare15A:spare15A,
                       spare20A1p:spare20A1p,
                       spare20A3p:spare20A3p,
                       xf_size:xf_size,
                       branchCircuit:branchCircuit,
                       //line:line,
                  }
                  xpdps.push(xpdp);
               }
           })
   
           console.log(xpdps);
           return xpdps;
       }
}

export default xpdpParser;