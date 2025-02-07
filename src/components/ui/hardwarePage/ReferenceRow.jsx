import React , {useState, useEffect } from 'react';
import DeviceDataService from '../../../services/deviceDataService';
import {TBody, DataTH, DataTable, Pagination } from "@tesla/design-system-react";
import DeviceRow from './DeviceRow';


const ReferenceRow = ({group, hardware}) => {
    const [devices, setDevices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(40);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const currentRecords = devices.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(()=>{
        const fetchData = async () => {
           let data =[];
           await Promise.all(group.map(async (item) => {
                var results = await DeviceDataService.getDevicesByGSD(item.name);
                data = data.concat(results);
            }));
            setDevices(data);
          }
        
          fetchData();
          return () => {
            setDevices([]);
          };
    }, []);
 
    const paginate = (selectedPage) =>{
        setCurrentPage(selectedPage);
    }
    const handleRecordsPerPageChange = (number) =>{
        setRecordsPerPage(number);
    }

    return (
        <>
            <tr>
                <td colSpan={6}>
                    <tr>
                        {
                            <>
                            {
                                <DataTable border={4} style={{width:"2000px"}}> 
                                <thead>
                                    <tr>
                                        <DataTH sortable={true} key="PLC" >PLC</DataTH>
                                        <DataTH sortable={true} key="Name" >Line</DataTH>
                                        <DataTH sortable={true} key="Name" >Name</DataTH>
                                        <DataTH sortable={true} key="Gsd" >GSD</DataTH>
                                        <DataTH sortable={true} key="Name" >IP</DataTH>
                                    </tr>
                                </thead>
                                
                                <TBody>
                                { 
                                    currentRecords && currentRecords.map( (device, key) =>{
                                        return <DeviceRow device={device}/>
                                    })
                                }
                                </TBody>
                            </DataTable>
                            }
                            <Pagination
                                onPageChange={paginate}
                                onRecordsPerPageChange={handleRecordsPerPageChange}
                                variant="select"
                                recordsPerPage={recordsPerPage}
                                totalPages = {Math.ceil(devices.length / recordsPerPage)}
                                page={currentPage}
                                totalRecords={devices.length}
                                totalRecordsLabel={"Total: "}
                                recordsPerPageSteps={[20,40, 100, 200]}
                                prevLinkLabel={'Prev'}
                                nextLinkLabel={'Next'}
                            />
                            </>
                        }
                    </tr>
                </td>
            </tr>
        </>
    );
}

export default ReferenceRow;