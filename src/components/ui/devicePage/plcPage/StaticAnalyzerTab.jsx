import React, { useState, useEffect } from "react";
import fileDataService from "../../../../services/fileDataService";
import * as XLSX from 'xlsx'
import {Button, TBody, DataTable, TabList, Loader , Pagination, FormInputDropdown, DataTH} from "@tesla/design-system-react";

const StaticAnalyzerTab = ({plc}) => {
   const [workbook, setWorkbook]= useState();
   const [activeTab, setActiveTab] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [tabs, setTabs] = useState([]);
   const [rows, setRows] = useState([]);
   const [file, setFile] = useState();
   const [selectedOption, setSelectedOption] = useState("Overview");
   const [currentPage, setCurrentPage] = useState(1);
   const [recordsPerPage, setRecordsPerPage] = useState(40);
   const indexOfLastPost = currentPage * recordsPerPage;
   const indexOfFirstPost = indexOfLastPost - recordsPerPage;
   const [headers, setHeaders] = useState([])
   const filteredRecords = rows;
   const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
   const summaryTab = "Summary";
   const callTreeTab = "CallTree";
   const overviewTabs = [summaryTab, callTreeTab];
   const hardwareTabs = ["$plc","$hardware", "$topology"]
   const hmiTabs = ["ProcessComplete_Faceplate", "RobotStatusHistory", "Opmode_Faceplate", "Valve_Faceplate", "PalletStop_Faceplate", "PosDev2P_Faceplate",
    "PosDev0P_Faceplate", "LTU_Faceplate", "Robot_Faceplate", "RollerTable_Faceplate", "BoschLubricator_Faceplate", "PosDev16P_Faceplate", "Opmode_ScreenItem"
   ];
   const [allTabs, setAllTabs] = useState([]);
   const options = [
        {
            value: 'Overview',
            label: 'Overview',
            style:{fontSize:"18px", textAlignLast:"center"}
        },
        {
            value: 'Software',
            label: 'Software',
            style:{fontSize:"18px", textAlignLast:"center"}
        },
        {
            value: 'Hardware',
            label: 'Hardware',
            style:{fontSize:"18px", textAlignLast:"center"}
        },
        {
            value: 'HMI',
            label: 'HMI',
            style:{fontSize:"18px", textAlignLast:"center"}
        }]
    useEffect(()=>{
        const fetchData = async () =>{
            setIsLoading(true);
            let wb = await fetchExcel();
            const firstSheet = wb.SheetNames[0];
            setActiveTab(firstSheet);
            let result = await parseExcel(wb, firstSheet);
            setIsLoading(false);
        }

        fetchData();
    }, []);
    const parseExcel =  async (wb, sheet)=>{
        var ws = wb.Sheets[sheet];
        let rows = XLSX.utils.sheet_to_json(ws, { header: 1 });
        
        var headers = []
        if(sheet != summaryTab){
            headers = rows[1];
            setRows(rows.slice(2));
        }else{
            setRows(rows.slice(1));
        }


        setHeaders(headers);
        
    }

    const fetchExcel = async () => {
        
        //just pass the fileObj as parameter
        let blob = await fileDataService.getStaticAnalyzer(`${plc}_DataReport.xlsx`);
        const wb = XLSX.read(await blob.arrayBuffer(), { type: "array" });
        setWorkbook(wb);
        var tabs = [];
        for (let i = 0; i < wb.SheetNames.length; i++) {
            tabs.push(wb.SheetNames[i]);
        }
        setAllTabs(tabs);
        setTabs(createTabs(overviewTabs));
        setFile(blob);     
        return wb;       
      }

    const renderSwitch = async (e) => {
        const sheetName = e.currentTarget.id;
        setActiveTab(sheetName)
        parseExcel(workbook, sheetName);
    }
    const paginate = (selectedPage) =>{
        setCurrentPage(selectedPage);
    }
    const handleRecordsPerPageChange = (number) =>{
        setRecordsPerPage(number);
    }
    const createTabs= (tabs)=>{
        var results = [];
        for (let i = 0; i < tabs.length; i++) {
            var tab = {
                id: tabs[i],
                label: tabs[i],
                style:{fontSize:"18px"}
              }
            results.push(tab);
        }

        return results;
    }
    const handleOptionSelect = (event) => {
        var tabs = [];
        if(event.value === "Overview"){
            tabs = createTabs(overviewTabs)
        } else if(event.value === "Hardware"){
            tabs = createTabs(hardwareTabs)
        } else if(event.value === "HMI"){
            tabs = createTabs(hmiTabs)
        } else if(event.value === "Software"){
            const softwareTabs = allTabs.filter(tab => !overviewTabs.includes(tab)  && !hardwareTabs.includes(tab) && !hmiTabs.includes(tab));
            tabs = createTabs(softwareTabs)
        }

        setSelectedOption(event.value)
        setTabs(tabs);
        const activeTab = tabs[0].label
        setActiveTab(activeTab);
        parseExcel(workbook, activeTab);
    }

    const handleDownloadStaticAnalyzerResult = async () => {
        const name = `${plc.name}_DataReport.xlsx`;
        const blob = await fileDataService.getStaticAnalyzer(name);
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.click();
    }
return (
        <>
        {
            <div>
                {
                    <div style={{display:"block"}}>  
                        <div style={{display:'flex'}}>
                            <FormInputDropdown
                                id="options"
                                label="options"
                                onOptionSelect={handleOptionSelect}
                                options={options}
                                selected={selectedOption}
                                style={{ marginBottom: "5px", width:"200px"}}
                            ></FormInputDropdown>
                            <Button variant="secondary"  style={{width:'150px', marginLeft:'20px'}} onClick={handleDownloadStaticAnalyzerResult}>Download</Button>
                        </div>
                        {
                             
                            <TabList
                                style={{width:"2000px", height:"50px", scrollbarWidth:'none'}}
                                animated
                                onTabChange={renderSwitch}
                                selected={activeTab}
                                tabs={tabs}
                                variant="toggle"
                                >
                            </TabList>

                        }
                        <DataTable border={4} style={{width:"2000px", scrollbarWidth:'thin'}}> 
                            <Loader show={isLoading} contained={true}/>
                            <thead>
                                <tr>
                                    {
                                        headers && headers.map(header => {
                                            return <DataTH sortable={true} key={header}>{header}</DataTH>        
                                        })
                                    }
                                </tr>
                            </thead>
                            <TBody>
                            { 
                                currentRecords && currentRecords.map( (row, key) =>{
                                    return <tr>
                                            {
                                                
                                                row.map((value, index) => {
                                                    let style = {};
                                                    let resultCol = 0;    
                                                    if(activeTab === "Summary"){
                                                        resultCol = 1;
                                                    }
                                                    if(index === resultCol){
                                                        if(value === "Pass"){
                                                            style = {backgroundColor:"#99FF66"}
                                                        } else if (value === "Fail") {
                                                            style = {backgroundColor:"#E06666"}
                                                        }
                                                    }
                                                    return <td style={style}>{value}</td>
                                                })
                                            }
                                        </tr>
                                })
                            }
                            </TBody>
                        </DataTable>
                        <Pagination
                            onPageChange={paginate}
                            onRecordsPerPageChange={handleRecordsPerPageChange}
                            variant="select"
                            recordsPerPage={recordsPerPage}
                            totalPages = {Math.ceil(filteredRecords.length / recordsPerPage)}
                            page={currentPage}
                            totalRecords={filteredRecords.length}
                            totalRecordsLabel={"Total: "}
                            recordsPerPageSteps={[20,40, 100, 200]}
                            prevLinkLabel={'Prev'}
                            nextLinkLabel={'Next'}
                        />
                    </div>
                }
            </div>
        }
        
        </>
    )
}

export default StaticAnalyzerTab;