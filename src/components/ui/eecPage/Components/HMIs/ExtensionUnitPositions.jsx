import "../../Eec.css";
import DropdownItem from '../Util/DropdownItem';
import { hmiOptions } from "../../Store/hmiStore";

const ExtensionUnitPositions = ({ 
  hmiIndex,
  extensionUnitPositionIndex,
  extensionUnitPosition,
}) => {
  const index = {hmiIndex:hmiIndex, extensionUnitPositionIndex:extensionUnitPositionIndex};


  return (
    <div className="extension-unit-position">
      <div className="extension-unit-position-settings">
            <DropdownItem
              title={"Button type:"}
              item={extensionUnitPosition}
              options={hmiOptions.buttonSelectionOptions}
              index={index}
              property={"buttonSelection"}
            />
      </div>
    </div>
  );
  };
  
  export default ExtensionUnitPositions;