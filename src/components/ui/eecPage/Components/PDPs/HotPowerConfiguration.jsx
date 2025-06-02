import HotPowerDropItem from './HotPowerDropItem';
import HeadingItem from '../Util/HeadingItem';
import "../../Eec.css";

const HotPowerConfiguration = ({pdp, pdpIndex}) => {
    var i = 0;

    return (
        
        <div>
            {
                pdp.hotPowerDrops.map((hotPowerDrop, index) => {
                    i=i+1;
                    return <HeadingItem label={`5A Hot Power Branch circuit power drop ${index + 1}: CB${i}`}
                    size={18} margin={"20px"}
                    component={hotPowerDrop}
                    headerIcon={hotPowerDrop.UI.icon}
                    open={true}
                    children={<HotPowerDropItem
                        key={`${hotPowerDrop}-${index}`}
                        hotPowerDrop={hotPowerDrop}
                        pdpIndex={pdpIndex}
                        hotPowerIndex={index}
                        />}
                    />})
            }
        </div>
    );
};
export default HotPowerConfiguration;