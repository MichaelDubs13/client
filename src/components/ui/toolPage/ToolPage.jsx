import { Card} from "@tesla/design-system-react";
import { Icon, Tooltip, TooltipWrapper, useTooltipState, ButtonGroup, Text, List, ListItem} from '@tesla/design-system-react';
import { StatusMessage, IconTrigger } from '@tesla/design-system-react';
import { Stepper, StepperItem } from '@tesla/design-system-react';
import { iconInfo } from '@tesla/design-system-icons';
import { useState } from "react";
import ModalCreateProject from "./ModalCreateProject";
import JobCards from "./JobCards";
import ModalCreateSoftwareMatrix from "./ModalCreateSoftwareMatrix";
import PrivateRoute from "../../auth/privateRoute";
import DownloadButton from "../libraryPage/DownloadButton";
import ModalViewExamplesForm from "./ModalViewExampleForm";
import JobHistory from "./JobHistory";
import ModalViewInstructionForm from "./ModalViewInstructionForm";
import ModalViewTemplateForm from "./ModalViewTemplateForm";
import ModalCreateSkidManager from "./ModalCreateSkidManager";




const ToolPage = () => {
    const step1Header = "Download Templates";
    const step1Buttons = ["Templates/SoftwareDesignLayout.pptx", "Templates/IpList.xlsm", "Templates/SoftwareMatrix.xlsx" ];
    const step2Buttons = ["Instructions/HowTo_FillSoftwareMatrix.pptx" ];
    const step3Buttons = ["Templates/SoftwareDesignLayout.pptx" ];
    const step4Buttons = ["Templates/IpList.xlsm" ];
    const step5Buttons = ["Templates/SoftwareMatrix.xlsx" ];
    const getStepButtons = (header)=>{
        switch(header){
            case "Download Templates":
                return getButtonGroup(step1Buttons);
            case "Download Instructions":
                return getButtonGroup(step2Buttons);
            case "Software Design":
                return getButtonGroup(step3Buttons);
            case "Fill out IpList":
                return getButtonGroup(step4Buttons);
            case "Create SoftwareMatrix":
                return <ModalCreateSoftwareMatrix/> 
            case "Fill out SoftwareMatrix":
                return getButtonGroup(step5Buttons);
            case "Create Project":
                return  <ModalCreateProject/>
            case "Receive Project":
                return getButtonGroup([]);
            default:
                return getButtonGroup([]);    
        }
    }

    const getButtonGroup = (buttons) =>{
        return <ButtonGroup layout='vertical'>
        {
            buttons.map(button => {
                return <DownloadButton label={button.split('.')[0].split('/')[1]} filePath={button}/>
            })
        }
        </ButtonGroup>
    }
    const steps = {
        "Download Templates" : <div>
                                    <Text is="p" style={{marginBottom:'20px'}}>Use 'Templates' button to download IpList, SoftwareMatrix, SoftwareDesignLayout</Text>
                                    {getStepButtons("Download Templates")}
                                </div>,
        "Download Instructions" : <div>
                                    <Text is="p" style={{marginBottom:'20px'}}>Use 'Instruction' button to download instructions on how to fill software matrix</Text>
                                    {getStepButtons("Download Instructions")}
                                </div>,
        "Software Design" :<div>
                                <Text is="p">Plan for software structure using Software Design Layout</Text>
                                <Text is="p" style={{marginBottom:'20px'}}> Define the following on the layout:
                                    <List is="ol" variant="unordered">
                                        <ListItem>Opmodes</ListItem>
                                        <ListItem>Stations</ListItem>
                                        <ListItem>Devices/Toolings</ListItem>
                                        <ListItem>Components</ListItem>
                                    </List>
                                </Text>
                                {getStepButtons("Software Design")}
                            </div>, 
        "Fill out IpList" : <div>
                                <Text is="p" style={{marginBottom:'20px'}}>Fill out IpList downloaded from previous step</Text>
                                <Text is="p" style={{marginBottom:'20px'}}>This is an optional step, if no IP list is used, there will be no hardware generated</Text>
                                <Text is="p" style={{marginBottom:'20px'}}>If this step is skipped, go to step "Fill out SoftwareMatrix"</Text>
                                {getStepButtons("Fill out IpList")}
                            </div>, 
        "Create SoftwareMatrix" : <div>
                                     <Text is="p" style={{marginBottom:'20px'}}>Use 'Create SoftwareMatrix' button to generate initial SoftwareMatrix from IpList</Text>
                                     {getStepButtons("Create SoftwareMatrix")}
                                </div>, 
        "Fill out SoftwareMatrix" : <div>
                                        <Text is="p">Complete rest of the SoftwareMatrix with</Text>
                                        <Text is="p">
                                            <List is="ol" variant="unordered">
                                                <ListItem>Opmodes</ListItem>
                                                <ListItem>Stations</ListItem>
                                                <ListItem>Devices/Toolings</ListItem>
                                                <ListItem>Components</ListItem>
                                            </List>
                                        </Text>
                                        <Text is="p" style={{marginBottom:'20px'}}>Defined in Software Matrix Layout</Text>
                                        {getStepButtons("Fill out SoftwareMatrix")}
                                    </div>, 
        "Create Project" :<div>
                            <Text is="p" style={{marginBottom:'20px'}}>Use 'Create Project' button to generate PLC program from IpList and SoftwareMatrix</Text>
                            {getStepButtons("Create Project")}
                        </div>, 
        "Receive Project" : <div>
                                <Text is="p" style={{marginBottom:'20px'}}>Generation will take roughly 10mins, an email will be sent to the user when the project is generated and project will be created on the output server specified in the UI, by default the project will be created in server59 if no output server is selected</Text>
                                {getStepButtons("Receive Project")}
                            </div>,
    }
    const defaultStepVariants = {
        "Download Templates" : "incomplete",
        "Download Instructions" : "incomplete",
        "Software Design" : "incomplete",
        "Fill out IpList" : "incomplete",
        "Create SoftwareMatrix" : "incomplete",
        "Fill out SoftwareMatrix" : "incomplete",
        "Create Project" : "incomplete",
        "Receive Project" : "incomplete",
    }
    

    const [pressed, setPressed] = useState(true);
    const [message, setMessage] = useState(steps[step1Header]);
    const [header, setHeader] = useState(step1Header);
    const [stepVariants, setStepVariants] = useState({...defaultStepVariants, [step1Header]: "complete"});
    
    const {
        open: openReference,
        handlers: handlersReference,
        wrapperRef: wrapperRefReference,
      } = useTooltipState({ initialOpen: false });
    const {
        open: openTool,
        handlers: handlersTool,
        wrapperRef: wrapperRefTool,
    } = useTooltipState({ initialOpen: false });

    const handleStepperClick = (event) => {
        const header = event.target.textContent
        setHeader(header);
        setMessage(steps[header])
        setStepVariants({...defaultStepVariants, [header]: "complete"})      
    }

    


    return (
   
        <>
        <PrivateRoute>
            <Card
                sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "80vh",
                }}
            >
            </Card>
            <IconTrigger
                label="Work Flow"
                onClick={() => setPressed(!pressed)}
                pressed={pressed}
                invertColors
                rotate
                />
            {
                pressed && 
                <div>
                <Stepper>
                    <StepperItem label="Download Templates" buttonProps={{ onClick:handleStepperClick }} variant={stepVariants["Download Templates"]}/>
                    <StepperItem label="Download Instructions" buttonProps={{ onClick:handleStepperClick }} variant={stepVariants["Download Instructions"]} />
                    <StepperItem label="Software Design" buttonProps={{ onClick:handleStepperClick }} variant={stepVariants["Software Design"]} />
                    <StepperItem label="Fill out IpList" buttonProps={{ onClick:handleStepperClick }} variant={stepVariants["Fill out IpList"]} />
                    <StepperItem label="Create SoftwareMatrix" buttonProps={{ onClick: handleStepperClick }} variant={stepVariants["Create SoftwareMatrix"]} />
                    <StepperItem label="Fill out SoftwareMatrix" buttonProps={{ onClick:handleStepperClick }} variant={stepVariants["Fill out SoftwareMatrix"]} />
                    <StepperItem label="Create Project" buttonProps={{ onClick: handleStepperClick }} variant={stepVariants["Create Project"]} />
                    <StepperItem label="Receive Project" buttonProps={{ onClick: handleStepperClick }} variant={stepVariants["Receive Project"]} />
                </Stepper>
                <StatusMessage
                    body={message}
                    header={header}
                    type="info"
                    style={{ marginBlockStart: '0' }}
                    enclosed={true}
                />
                </div>
            }
            <h2>
                References
                <TooltipWrapper
                {...handlersReference}
                wrapperRef={wrapperRefReference}
                inline
                className="tds-text--regular tds-text--contrast-medium tds-density--dense"
                >
                <button>
                    <Icon size="large" data={iconInfo} inline align="text-middle" />
                </button>

                <Tooltip open={openReference} align="start">
                    <p>Use "Templates" button to download templates for code gen.</p>
                    <p>Use "Examples" button to download example software matrix for code gen.</p>
                    <p>Use "Instructions" button to download instructions on how to fill out software matrix.</p>
                    <p>Use "Download Download Software Design Layout" button to download a copy of software design layout.</p>
                    <p>Use "Download Lithium-Desktop" button to download offline version of code gen app.</p>
                </Tooltip>
                </TooltipWrapper>
            </h2>
            <div style={{display: "flex", justifyContent: "left", gap: "15px"}}>      
                <ModalViewExamplesForm/>
                <ModalViewInstructionForm/>
                <ModalViewTemplateForm/>
                <DownloadButton label="Download Lithium-Desktop" filePath="lithium.zip"/>
            </div>
            <h2>
                Tools
                <TooltipWrapper
                {...handlersTool}
                wrapperRef={wrapperRefTool}
                inline
                className="tds-text--regular tds-text--contrast-medium tds-density--dense"
                >
                <button>
                    <Icon size="large" data={iconInfo} inline align="text-middle" />
                </button>

                <Tooltip open={openTool} align="start">
                    <p>Step1: Fill out IP Address List</p>
                    <p>Step2: Use "Create SoftwareMatrix" button to generate intial software matrix</p>
                    <p>Step3: Use "Create Project" button to generate a project with IP List and software matrix</p>
                </Tooltip>
                </TooltipWrapper>
            </h2>
            <div style={{display: "flex", justifyContent: "left", gap: "15px"}}>
                <ModalCreateProject/>
                {/* <ModalCheckProject/>       */}
                <ModalCreateSoftwareMatrix/>  
                <ModalCreateSkidManager/>      
            </div>
            <div style={{marginTop:"20px"}}/>
            <JobHistory/>
            <div style={{marginTop:"100px"}}/>
            <JobCards />
        </PrivateRoute>
        </>
    )
    
}

export default ToolPage