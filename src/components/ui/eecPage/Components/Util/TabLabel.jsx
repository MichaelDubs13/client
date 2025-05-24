import { Chip} from "@tesla/design-system-react";


const TabLabel = ({label, count}) => {
   
    return (
        <>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'250px'}}>
                    <p>{label}</p >
                    <Chip text={count}/>
            </div>,
        </>
    )
}
    
export default TabLabel;