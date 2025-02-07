import { Card} from "@tesla/design-system-react";
import JobCards from "../toolPage/JobCards";
import PrivateRoute from "../../auth/privateRoute";
import DownloadButton from "../libraryPage/DownloadButton";
import ModalCreatePtpForm from "./ModalCreatePtpForm";
import JobHistory from "./JobHistory";
import { Icon, Tooltip, TooltipWrapper, useTooltipState } from '@tesla/design-system-react';
import { iconInfo } from '@tesla/design-system-icons';


const RobotPage = () => {
    const {
        open: openTool,
        handlers: handlersTool,
        wrapperRef: wrapperRefTool,
    } = useTooltipState({ initialOpen: false });

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
                    <p>Step1: Fill out PTP template</p>
                    <p>Step2: Use "Create PTP" button to generate Robot PTP program</p>
                </Tooltip>
                </TooltipWrapper>
            </h2>
            <div style={{display: "flex", justifyContent: "left", gap: "15px"}}>
                <ModalCreatePtpForm/>
                <DownloadButton label="Download PTP Template" filePath="Templates/PointTOPointTemplate.xlsx"/>
            </div>
            <div style={{marginTop:"20px"}}/>
            <JobHistory/>
            <div style={{marginTop:"100px"}}/>
            <JobCards />
        </PrivateRoute>
        </>
    )
    
}

export default RobotPage