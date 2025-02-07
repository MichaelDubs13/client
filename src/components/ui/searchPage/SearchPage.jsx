import { DataTH, FormInputSearch, Pagination, TBody, DataTable, Loader, Button, Text } from "@tesla/design-system-react";
import { useEffect, useState } from "react";
import useDeviceStore from "../../../store/deviceStore";
import CallRow from "../devicePage/CallRow";
import HardwareRow from "../devicePage/HardwareRow";
import { useSearchParams } from 'react-router-dom';



const SearchPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const fetchPlcCall = useDeviceStore((state) => state.fetchPlcCall);
    const fetchHardwaresPerPLC = useDeviceStore((state) => state.fetchHardwaresPerPLC);
    const [items, setItems]=useState([]);
    const [placeholder, setPlaceHolder] = useState("Search by blocks")
    const [searchCategory, setSearchCategory] = useState("blocks");
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(40);
    const [filterKey, setFilterKey] = useState("name");
    const [isLoading, setIsLoading] = useState(false);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const filteredRecords = items? items.filter((item) => item[filterKey].toLowerCase().includes(query.toLowerCase())) : [];
    const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
   

    useEffect(() => {
        const fetchData= async ()=>{
            setIsLoading(true);
            const params = [];
            for(let entry of searchParams.entries()) {
                params.push(entry);
            }
            
            if(params.length > 0){
                const searchCategory = params[0][0];
                const searchValue = params[0][1];
                switch(searchCategory) {
                    case 'blocks':
                        await updateBlockSearch(searchValue);
                        break;
                    case 'networks':
                        await updateNetworkSearch(searchValue);
                        break;
                    case 'hardwares':
                        await updateHardwareSearch(searchValue);
                        break;
                    case 'labels': 
                        await updateLabelSearch(searchValue);
                        break;
                    default:
                        await updateBlockSearch(searchValue);
                        break; 
                }
                setQuery(searchValue);
            }  else{
                await handleBlocksButttonClick();
            }

            setIsLoading(false);
        }
        
        fetchData();
      }, []);
    const handleSearchChange = (event)=>{
        setQuery(event.target.value);
        setSearchParams({[searchCategory]: event.target.value })   
        setCurrentPage(1);
    }
    const paginate = (selectedPage) =>{
        setCurrentPage(selectedPage);
    }
    const handleRecordsPerPageChange = (number) =>{
        setRecordsPerPage(number);
    }
    const updateBlockSearch = async (searchValue) => {
        setPlaceHolder("Search by blocks");
        setSearchCategory("blocks");
        var items = await fetchPlcCall("all");
        setItems(items);
        setFilterKey("name");
        setSearchParams({["blocks"]: searchValue })  
    }
    const updateNetworkSearch = async (searchValue) => {
        setPlaceHolder("Search by networks");
        setSearchCategory("networks");
        var items = await fetchPlcCall("all");
        setItems(items);
        setFilterKey("network");
        setSearchParams({["networks"]: searchValue }) 
    }
    const updateHardwareSearch = async (searchValue) => {
        setPlaceHolder("Search by hardwares");
        setSearchCategory("hardwares");
        var items = await fetchHardwaresPerPLC("all");
        setItems(items);
        setFilterKey("gsd");
        setSearchParams({["hardwares"]: searchValue })  
    }
    const updateLabelSearch = async (searchValue) => {
        setPlaceHolder("Search by labels");
        setSearchCategory("labels");
        setSearchParams({["labels"]: searchValue })  
    }

    const handleBlocksButttonClick = async () => {
        setIsLoading(true);
        await updateBlockSearch(query);
        setIsLoading(false); 
    }
    const handleNetworksButttonClick = async () => {
        setIsLoading(true);
        await updateNetworkSearch(query);
        setIsLoading(false);
    }
    const handleHardwaresButttonClick = async () => {
        setIsLoading(true);
        await updateHardwareSearch(query);
        setIsLoading(false);
    }
    const handleLabelsButttonClick = async () => {
        setIsLoading(true);
        await updateLabelSearch(query);
        setIsLoading(false);
    }
    const renderSwitch = (param) => {
        switch(param) {
          case 'blocks':
          case 'networks':
            return <div>
                        <thead>
                            <tr>
                                <DataTH sortable={true} key="Download" ></DataTH>
                                <DataTH sortable={true} key="PLC" >PLC</DataTH>
                                <DataTH sortable={true} key="Name" >Name</DataTH>
                                <DataTH sortable={true} key="Path" >Path</DataTH>
                                <DataTH sortable={true} key="Container" >Container</DataTH>
                                <DataTH sortable={true} key="NetworkNumber" >Network #</DataTH>
                                <DataTH sortable={true} key="NetworkTitle" >Network Title</DataTH>
                            </tr>
                        </thead>
                        
                        <TBody>
                        { 
                            currentRecords && currentRecords.map( (call, key) =>{
                                return <CallRow call={call} plc_id={call.plc_id} searchType={param} searchWord={query}/>;
                            })
                        }
                        </TBody>
                    </div>;
        case 'hardwares':
            return <div>
                        <thead>
                            <tr>
                                <DataTH sortable={true} key="Arrow" ></DataTH>
                                <DataTH sortable={true} key="PLC" >PLC</DataTH>
                                <DataTH sortable={true} key="Name" >Name</DataTH>
                                <DataTH sortable={true} key="GSD" >GSD</DataTH>
                                <DataTH sortable={true} key="IpAddress" >IpAddress</DataTH>
                            </tr>
                        </thead>
                        
                        <TBody>
                        { 
                            currentRecords && currentRecords.map( (hardware, key) =>{
                                return <HardwareRow hardware={hardware} plc_id={hardware.plc_id} searchWord={query}/>;
                            })
                        }
                        </TBody>
                    </div>;
          default:
            return <div/>;
        }
      }
      
    return (
   
        <>
        <div style={{marginTop:"50px"}}>
            <FormInputSearch style={{height:"75px", width:"2000px", fontSize:"30px"}} 
                highlighted={true} value={query} onChange={handleSearchChange}
                placeholder={placeholder}/>
            <div style={{marginTop:"25px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                <Button variant="tertiary" height="large" style={{marginRight:"20px", fontSize:"25px"}} onClick={handleBlocksButttonClick}>Blocks</Button>
                <Button variant="tertiary" height="large" style={{marginRight:"20px", fontSize:"25px"}} onClick={handleNetworksButttonClick}>Networks</Button>
                <Button variant="tertiary" height="large" style={{marginRight:"20px", fontSize:"25px"}} onClick={handleHardwaresButttonClick}>Hardwares</Button>
                <Button variant="tertiary" height="large" style={{marginRight:"20px", fontSize:"25px"}} onClick={handleLabelsButttonClick}>Labels</Button>
            </div>
        </div>
        {
            query ?
            <div>
                <Loader show={isLoading} contained={true}/>
                <DataTable border={4} style={{width:"2000px"}}> 
                {
                   renderSwitch(searchCategory)
                }
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
            </div> : 
            <div className="tds-text--center" >
                <div style={{marginTop:"50px"}}/>
                <Text is="strong" contrast="low">
                Type something in the search bar to view results...
                </Text>
            </div>
        }
        </>
    )
    
}

export default SearchPage