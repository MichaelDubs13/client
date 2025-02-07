import React , {useState, useEffect} from 'react';
import DeviceDataService from '../../../services/deviceDataService';
import {TBody, DataTH, DataTable, Pagination } from "@tesla/design-system-react";
import CallRow from "../devicePage/CallRow";

const ReferenceRow = ({block}) => {
    const [calls, setCalls] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage, setRecordsPerPage] = useState(40);
    const indexOfLastPost = currentPage * recordsPerPage;
    const indexOfFirstPost = indexOfLastPost - recordsPerPage;
    const currentRecords = calls.slice(indexOfFirstPost, indexOfLastPost);

    useEffect(() => {
        const fetchData = async () => {
            var data = await DeviceDataService.getCallsByName(block.Name);
            setCalls(data);
        };

        fetchData();
        return () => {
            setCalls([]);
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
                                                return <CallRow call={call} plc_id={call.plc_id}/>;
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
                                        totalPages = {Math.ceil(calls.length / recordsPerPage)}
                                        page={currentPage}
                                        totalRecords={calls.length}
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