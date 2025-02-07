import sectionStore from "./sectionStore";

const dataStore = {
    
    sections : [
        {
            heading:"Manufacturing Line Requirements",
            groups : sectionStore.firstSection
        },
        {
            heading:"Project Properties" ,
            groups : sectionStore.secondSection
        },
    ],
}

export default dataStore;