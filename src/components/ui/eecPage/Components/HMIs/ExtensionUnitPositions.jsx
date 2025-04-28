import "../../Eec.css";
import CheckboxItem from '../Util/CheckboxItem';
import DropdownItem from '../Util/DropdownItem';
import InputTextItem from '../Util/InputTextItem';
import { hmiStore } from "../../Store/hmiStore";
import { hmiOptions } from "../../Store/hmiStore";
import DeviceSelection from "../Common/DeviceSelection";

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