import { FormInputSearch, TBody, DataTH, DataTable, Pagination } from "@tesla/design-system-react";
import React, { useState, useEffect,  } from 'react';
import useDeviceStore from '../../../store/deviceStore';
import DeviceRow from "./DeviceRow";
import ModalAddDevice from "./ModalAddDevice";
import ModalUploadHmiList from "./ModalUploadHmiList";
import DeviceNavBar from "./DeviceNavBar";
import DeviceNaBarLink from "./DeviceNavBarLink";
import ModalUploadHmiForm from "./ModalUploadHmiForm";



const HmisPage = () => {
    const[query, setQuery] = useState("");
    const devices = useDeviceStore((state) => state.devices);
    const fetchHMIs = useDeviceStore((state) => state.fetchHMIs);
    const sortDevices = useDeviceStore((state) => state.sortDevices);
    const [sortField, setSortField] = useState("");
    const [order, setOrder] = useState("asc");
    const [selected, setSelected] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(20);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const filteredRecords = devices.filter((device) => device.name.toLowerCase().includes(query.toLowerCase()));
    const currentRecords = filteredRecords.slice(indexOfFirstPost, indexOfLastPost);
    const itemRefs = [];

    useEffect(()=>{
        fetchHMIs();
    }, []);

    const paginate = (selectedPage) =>{
        setCurrentPage(selectedPage);
    }

    const handleRecordsPerPageChange = (number) =>{
        setCurrentPage(1);
        setRecordsPerPage(number);
    }
 
    const getHMIs = () => {
        var results = []
        itemRefs.forEach(item => {
            if(item.checked){
                var device = devices.find(i => i.id.toString() === item.id);
                    if(device){
                        results.push(device);
                }
            }})
        
        return results;
    };

    const handleSearchChange = async (event)=>{
        setQuery(event.target.value);
        setCurrentPage(1);
    }
    const handleSortingChange = (accessor) => {
        const sortOrder =
        accessor === sortField && order === "asc" ? "desc" : "asc";
        setSortField(accessor);
        setOrder(sortOrder);
        sortDevices(accessor, sortOrder);
    };
  
    const handleCheckAll = () => {
        if(selected.length === devices.length){
            setSelected([]);
        } else {
            setSelected(devices);
        }
    }

    const updateCheckBoxValue = (value, device) => {
        if (value) {
            setSelected([...selected, device]);
        } else {
            setSelected(selected.filter((item) => item !== device));
        }
    }

    const handleNavbarChange = ()=>{
        setCurrentPage(1);
    }


    return (
   
        <>
            <FormInputSearch value={query} 
                onChange={handleSearchChange} 
                placeholder="search by hostname"/>
            <h2>HMIs</h2>
            <div style={{display: "flex", justifyContent: "left", gap: "15px"}}>
                <ModalAddDevice/>
                <ModalUploadHmiList/>
                <ModalUploadHmiForm getHMIs={getHMIs}/>
            </div>
            <div style={{display: "flex", 
                justifyContent: "space-between", 
                flexWrap: "wrap", gap: "15px",
                alignItems:"flex-start", alignContent:"flex-start"}}>
            <DeviceNavBar type={"hmi"} handleNavbarChange={handleNavbarChange}/>
            <div>
                <DeviceNaBarLink/>
                <DataTable border={4} style={{width:"1800px", float:"right", backgroundColor:"white"}}> 
                    <thead>
                        <tr>
                            <DataTH sortable={true} key="shop" onClick={() => handleSortingChange("shop")}>SHOP</DataTH>
                            <DataTH sortable={true} key="line" onClick={() => handleSortingChange("line")}>LINE</DataTH>
                            <DataTH sortable={true} key="plc" onClick={() => handleSortingChange("plc")}>PLC</DataTH>
                            <DataTH sortable={true} key="device" onClick={() => handleSortingChange("device")}>DEVICE</DataTH>
                            <DataTH sortable={true} key="ipAddress" onClick={() => handleSortingChange("ipAddress")}>IP ADDRESS</DataTH>
                            <DataTH sortable={true} key="state" onClick={() => handleSortingChange("state")}>ONLINE</DataTH>
                            <DataTH key="checkboxall"><input id="checkbox" type="checkbox" checked={selected.length === devices.length} onChange={handleCheckAll} style={{transform:"scale(1.5)"}}/></DataTH>
                        </tr>
                    </thead>
                    
                    <TBody>
                        { 
                            currentRecords?.map( (device, key) =>{
                            return(
                                <DeviceRow device={device} key={key} ref={(node) =>itemRefs[key] = node} checked={selected.includes(device)} 
                                        updateCheckBoxValue={updateCheckBoxValue}/>
                            )})
                        }
                    </TBody>
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
                </DataTable>
            </div>
        </div>
        </>
    )
    
}

export default HmisPage