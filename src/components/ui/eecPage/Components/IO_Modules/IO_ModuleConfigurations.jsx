import IO_ModuleConfiguration from './IO_ModuleConfiguration';
import HeadingItem from '../Util/HeadingItem';
import "../../Eec.css";

const IO_ModuleConfigurations = ({ioModuleGroup, ioModuleGroupIndex}) => {
    
    var i = 0;

    return (
        
        <div>
            {
                ioModuleGroup.ioModules.map((ioModule, index) => {
                    i=i+1;
                    return <HeadingItem label={`IO Module ${index + 1}`}
                    size={18} margin={"20px"}
                    headerIcon={ioModule.UI.icon}
                    open={true}
                    children={<IO_ModuleConfiguration
                        key={`${ioModule}-${index}`}
                        ioModule={ioModule}
                        ioModuleGroupIndex={ioModuleGroupIndex}
                        ioModuleIndex={index}
                        />}
                    />})
            }
        </div>
    );
};
export default IO_ModuleConfigurations;