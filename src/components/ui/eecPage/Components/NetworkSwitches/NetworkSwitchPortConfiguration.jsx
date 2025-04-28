import NetworkSwitchPort from './NetworkSwitchPort';
import HeadingItem from '../Util/HeadingItem';
import "../../Eec.css";

const NetworkSwitchPortConfiguration = ({networkSwitch, networkSwitchIndex}) => {
    return (
        
        <div>
            {
                networkSwitch.ports.map((port, index) => {
                    return <HeadingItem label={`Port ${index + 1}`}
                    size={18} margin={"20px"}
                    headerIcon={port.UI.icon}
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