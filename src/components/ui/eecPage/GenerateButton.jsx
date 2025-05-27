import { ToastContainer, useToastContainerState,} from "@tesla/design-system-react";
import { iconRocket } from '@tesla/design-system-icons';
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
import ActionIcon from '../util/ActionIcon';
import eecDataService from '../../../services/eecDataService';
import useAuthStore from '../../../store/authStore';
import useEecStore from '../../../store/eecStore';

const GenerateButton = () => {
  const {user} = useAuthStore();
  const { toasts, addToast } = useToastContainerState();
  const fetchJobHistory = useEecStore((state) => state.fetchJobHistory);
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


  const handleSumbit = async (event) => {
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
    downloadIMX(imx, name);
    createJob(imx, name);
    addToast({
        title: 'New EEC Job submitted',
        dismissible: true,
        caption: 'New EEC Job submitted',
        variant: 'status',
        statusType: 'info',
      })
  }

  const createJob = async (imx, name) => {
      try{
        var imxFile = createFile(imx, name)
        const formData = new FormData();
        const payload = createPayload();
        formData.set("imxFile", imxFile);
        formData.set("data", JSON.stringify(payload));
        var result = await eecDataService.createJob(formData)
        fetchJobHistory();
      } catch (error) {
        console.log(error);
      }
  }

  const createPayload = () => {
    var email = ''
    if(user){
      email = user.email;
    }
    const payload = {
      "user": email,
    };
    
    return payload;
  }
  const createFile = (doc, name) => {
    const fileData = doc;
    const blob = new Blob([fileData], { type: "text/xml" });
    var file = new File([blob], name);
    return file;
  }
  const downloadIMX = (doc, name) => {
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
      <ToastContainer toasts={toasts} />
      <ActionIcon label="Generate EEC configuration" onClick={handleSumbit} icon={iconRocket}/>
    </>
  );
};

export default GenerateButton;
