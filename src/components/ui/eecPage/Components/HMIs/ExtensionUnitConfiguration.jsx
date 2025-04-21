import ExtensionUnitPositions from './ExtensionUnitPositions';
import HeadingItem from '../Util/HeadingItem';
import "../../Eec.css";

const ExtensionUnitConfiguration = ({hmi, hmiIndex}) => {
    
    var i = 0;

    return (
        
        <div>
            {
                hmi.extensionUnitPositions.map((extensionUnitPosition, index) => {
                    i=i+1;
                    return <HeadingItem label={`Extension Unit Position ${index + 1}`}
                    size={18} margin={"20px"}
                    headerIcon={"/networkPort.png"}
                    open={true}
                    children={<ExtensionUnitPositions
                        key={`${extensionUnitPosition}-${index}`}
                        extensionUnitPosition={extensionUnitPosition}
                        hmiIndex={hmiIndex}
                        extensionUnitPositionIndex={index}
                        />}
                    />})
            }
        </div>
    );
};
export default ExtensionUnitConfiguration;