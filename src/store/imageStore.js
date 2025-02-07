import {create} from "zustand";
import BlockDataService from "../services/blockDataService";
import fileDataService from "../services/fileDataService";


const useImageStore = create((set) => ({
    revisions: [],
    image:{},
    fetchHardwareImage: async (gsdName) => {
      try {
        const data = await fileDataService.getGsdImage(gsdName);
        console.log(data);
        set(() => ({image:data}))

        } catch (error) {
          console.error("Error fetching images:", error);
        }
    },
    fetchImage: async (block_id, image_id, plc) => {
      try {
        const data = await BlockDataService.getImage(block_id, image_id, plc);
        console.log(data);
        set(() => ({image:data}))

        } catch (error) {
          console.error("Error fetching images:", error);
        }
    },
    fetchImages: async (block_id, revisions, plc) => {
    
        await Promise.all(
          revisions.map((revision) =>
            BlockDataService.getImage(block_id, revision.Image, plc).then((image)=>({Image:image, Revision:revision }))
              .catch((error) => console.log("There was a problem!", error))
          )).then((revisions) => set({revisions:revisions}));

          //console.log(this.images)
      },
    clearImages : ()=>{
        set({revisions:[]});
    },
    clearImage: ()=>{
      set({image:{}});
    }
}));



export default useImageStore;