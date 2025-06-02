import ExtensionUnitPositions from './ExtensionUnitPositions';
import HeadingItem from '../Util/HeadingItem';
import "../../Eec.css";

const ExtensionUnitConfiguration = ({hmi, hmiIndex}) => {
    return (
        
        <div>
            {
                hmi.extensionUnitPositions.map((extensionUnitPosition, index) => {
                    return <HeadingItem label={`Extension Unit Position ${index + 1}`}
                    size={18} margin={"20px"}
                    component={extensionUnitPosition}
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