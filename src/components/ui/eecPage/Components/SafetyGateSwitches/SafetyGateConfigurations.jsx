import SafetyGateSwitchConfiguration from './SafetyGateSwitchConfiguration';
import HeadingItem from '../Util/HeadingItem';
import "../../Eec.css";

const SafetyGateConfigurations = ({safetyGate, safetyGateIndex}) => {    
    return (
        
        <div>
            {
                safetyGate.safetyGateSwitches.map((safetyGateSwitch, index) => {
                    return <HeadingItem label={`Safety Gate Switch ${index + 1}`}
                    size={18} margin={"20px"}
                    headerIcon={safetyGateSwitch.UI.icon}
                    open={true}
                    children={<SafetyGateSwitchConfiguration
                        key={`${safetyGateSwitch}-${index}`}
                        safetyGateSwitch={safetyGateSwitch}
                        safetyGateIndex={safetyGateIndex}
                        safetyGateSwitchIndex={index}
                        />}
                    />})
            }
        </div>
    );
};
export default SafetyGateConfigurations;