import "../../Eec.css";
import HeadingItem from "../Util/HeadingItem";
import ElectricalDiagram from "../../Flow/ElectricalDiagram";
import NetworkDiagram from "../../Flow/NetworkDiagram";


const OneLineComponents = () => {
    return (
        
        <>  
            <div>
                <HeadingItem label={`One-Line Eletrical Diagram`} 
                  size={18} margin={"20px"} open={false}
                  children={<ElectricalDiagram/>}/>
                <HeadingItem label={`One-Line Network Diagram`} 
                  size={18} margin={"20px"} open={false}
                  children={<NetworkDiagram/>}/>
            </div>
        </>           
    );
};
export default OneLineComponents;