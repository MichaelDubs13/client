import {create} from "zustand";

const projectStore = create((set) => ({
    plant:"PLANT1",
    shop:"SHOP1",
    line:"LINE1", 
    installation_location:"UL",
    installation_location_options:["UL", "EU"],

    setPlant:(value)=>{
        set({plant:value});        
    },
    setShop:(value)=>{
        set({shop:value});
    },
    setLine:(value)=>{
        console.log(value)
        set({line:value});
    },
    setinstallation_location:(value)=>{
        set({installation_location:value});
    },

    setConfig:(data)=>{
        set({plant:data.plant}); 
        set({shop:data.shop});  
        set({line:data.line});
        set({installation_location:data.installation_location});
    },

    getConfig:()=>{
        return {
            plant:projectStore.plant,
            shop:projectStore.shop,
            line:projectStore.line,
            installation_location:projectStore.installation_location,
        }
    }
}));

export {
    projectStore,
}