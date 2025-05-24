import { iconRocket } from '@tesla/design-system-icons';
import { Icon, IconButton } from '@tesla/design-system-react';
import { pdpStore } from "./Store/pdpStore";
import { xpdpStore } from "./Store/xpdpStore";
import { mcpStore } from "./Store/mcpStore";
import { lpdStore } from "./Store/lpdStore";
import { projectStore } from "./Store/projectStore";
import { networkSwitchStore } from "./Store/networkSwitchStore";
import {hmiStore } from "./Store/hmiStore";
import { safetyGateStore } from "./Store/safetyGateStore";
import { pdpModel } from './Store/Models/PDPs/pdpModel';
import { mcpModel } from './Store/Models/MCPs/mcpModel';
import { networkSwitchModel } from './Store/Models/NetworkSwitches/networkSwitchModel';
import ModelBuilder from './Models/ModelBuilder';
import { customerStore } from './Store/customerStore';
import { ioModuleStore } from './Store/ioModuleStore';
import { xpdpModel } from './Store/Models/XPDPs/xpdpModel';
import { lpdModel } from './Store/Models/LDPs/lpdModel';
import { hmiModel } from './Store/Models/HMIs/hmiModel';
import { safetyGateGroupModel } from './Store/Models/SafetyGates/safetyGateGroupModel';
import { ioModuleGroupModel } from './Store/Models/IoModules/ioModuleGroupModel';

const GenerateButton = () => {
  const getConfig = projectStore((state) => state.getConfig);
  const pdps = pdpStore((state) => state.pdps);
  const customer = customerStore((state) => state.property);
  const xpdps = xpdpStore((state) => state.xpdps);
  const mcps = mcpStore((state) => state.mcps);
  const lpds = lpdStore((state) => state.lpds);
  const networkSwitches = networkSwitchStore((state) => state.networkSwitches);
  const hmis = hmiStore((state) => state.hmis);
  const safetyGates = safetyGateStore((state) => state.safetyGates);
  const ioModuleGroups = ioModuleStore((state) => state.ioModuleGroups);

  const handleSumbit = (event) => {
    event.preventDefault();
    const config = getConfig();
    const validatedPdps =pdpModel.generateData(pdps);
    const validatedXpdps =xpdpModel.generateData(xpdps);
    const validatedMcps =mcpModel.generateData(mcps);
    const validatedLpds = lpdModel.generateData(lpds);
    const validatedNetworkSwitches = networkSwitchModel.generateData(networkSwitches);
    const validatedHmis = hmiModel.generateData(hmis);
    const validatedSafetyGates = safetyGateGroupModel.generateData(safetyGates);
    const validatedIOModules = ioModuleGroupModel.generateData(ioModuleGroups);
    var devices = []
    var imx = ModelBuilder.buildIMX(config, customer, validatedPdps,validatedXpdps, validatedMcps, validatedLpds, validatedNetworkSwitches, devices, validatedIOModules, validatedHmis, validatedSafetyGates);
    var name = `${config.plant}_${config.line}_${config.shop}_generated.imx`
    downloadXML(imx, name);
  }


  const downloadXML = (doc, name) => {
    const fileData = doc;
    const blob = new Blob([fileData], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = name;
    link.href = url;
    link.click();
  }
  return (
    <>
 
       <IconButton size="large" label="Generate EEC configuration"
          onClick={handleSumbit}>
            <Icon data={iconRocket} size="xl"/>
        </IconButton>
    </>
  );
};

export default GenerateButton;
