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
  
  const setExtensionUnitPositionValue = hmiStore((state) => state.setExtensionUnitPositionValue);
  const index = {hmiIndex:hmiIndex, extensionUnitPositionIndex:extensionUnitPositionIndex};


  return (
    <div className="extension-unit-position">
      <div className="extension-unit-position-settings">
        {/*If statement to determine which position the RFID Reader is located within the Extension Unit */}
        {((hmiIndex.rfidPosition === "Right" && (extensionUnitPositionIndex.Last() === index || extensionUnitPositionIndex.Last() - 1 === index)) ||
          (hmiIndex.rfidPosition === "Left" && (extensionUnitPositionIndex.First() === index || extensionUnitPositionIndex.First() + 1 === index))) ? (
            <DropdownItem
              title={"Button type:"}
              placeHolder={extensionUnitPosition.buttonSelection}
              options={hmiOptions.buttonSelectionOptions}
              setModelValue={setExtensionUnitPositionValue}
              value={"RFID Reader"}
              index={index}
              property={"buttonSelection"}
            />
          ) : (
            <DropdownItem
              title={"Button type:"}
              placeHolder={extensionUnitPosition.buttonSelection}
              options={hmiOptions.buttonSelectionOptions}
              setModelValue={setExtensionUnitPositionValue}
              index={index}
              property={"buttonSelection"}
            />
          )}
      </div>
    </div>
  );
  };
  
  export default ExtensionUnitPositions;