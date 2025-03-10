import ItemStore from "./ItemStore";
import {pdpStore} from "./pdpStore";

const groupStore = {
    firstGroup : {
        items:ItemStore.lineGroupItems,
        heading: "Manufacturing Line Name and Location",
      },
    
   secondGroup : {
        items:ItemStore.secondGroupItems,
        heading: "General Project Properties",
      },

   ProjPropTechincalPropGroupItems : {
        items:ItemStore.ProjPropTechincalPropGroupItems,
        heading: "Project Technical Properties",
      },

    thirdGroup : {
        items:ItemStore.thirdGroupItems,
        heading: "Customer Properties",
      },

   fourthGroup : {
        items:ItemStore.fourthGroupItems,
        heading: "Project Creator Properties",
      },
      
   fithGroup :{
        items:pdpStore.counts,
        heading: "Power Distribution Panel Configuration",
      },
}

export default groupStore;