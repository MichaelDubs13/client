import InputTextItem from '../Util/InputTextItem';



const PsuLoadItem = ({title, amperage, capacity}) => {
    const getVisualStyle = () => {
        if(amperage > capacity){
            return {color:'red'}
        } else if (amperage > (capacity * 0.8)){
            return {color:'#E4D00A'}
        }
    }

    const isOverloaded = () => {
        if(amperage > capacity){
            return true
        } 

        return false;
    }

    return (
        <div style={{display:'flex'}}>
            <InputTextItem title={title} placeHolder={`${amperage}A`} readOnly={true} valueStyle={getVisualStyle()}/> 
            {isOverloaded() && <p style={{color:'red', marginLeft:'10px'}}>Overloaded</p>}
        </div>
    );
};
export default PsuLoadItem;