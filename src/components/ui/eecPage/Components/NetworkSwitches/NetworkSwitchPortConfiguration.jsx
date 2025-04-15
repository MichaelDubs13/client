import NetworkSwitchPort from './NetworkSwitchPort';
import HeadingItem from '../Util/HeadingItem';
import "../../Eec.css";

const NetworkSwitchPortConfiguration = ({networkSwitch, networkSwitchIndex}) => {
    var i = 0;

    return (
        
        <div>
            {
                networkSwitch.ports.map((port, index) => {
                    i=i+1;
                    return <HeadingItem label={`Port ${index + 1}}`}
                    size={18} margin={"20px"}
                    open={true}
                    children={<NetworkSwitchPort
                        key={`${port}-${index}`}
                        port={port}
                        networkSwitchIndex={networkSwitchIndex}
                        portIndex={index}
                        />}
                    />})
            }
        </div>
    );
};
export default NetworkSwitchPortConfiguration;