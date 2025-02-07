import { useParams } from "react-router-dom";
import useDeviceStore from "../../../store/deviceStore";
import React, {  useState, useEffect } from "react";
import PrivateRoute from "../../auth/privateRoute";
import useTiaServerStore from "../../../store/TiaServerStore";
import {Loader, Button} from "@tesla/design-system-react";
import ProductRow from "./ProductRow";
import LineLogRow from "./LineLogRow";
import HmiRow from "./HmiRow";
import SocketIoConsole from "../util/SocketIoConsole";
import ModalInstallIsoForm from "./ModalInstallIsoForm";

const LinePage = () => {
    const [device, setDevice] = useState();
    const [plcs, setPlcs]=useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const fetchLine = useDeviceStore((state) => state.fetchLine);
    const fetchPLCsPerLine = useDeviceStore((state) => state.fetchPLCsPerLine);
    const fetchServerLogs = useDeviceStore((state) => state.fetchServerLogs);
    const fetchInstalledProducts = useTiaServerStore((state)=> state.fetchInstalledProducts);
    const serverLogs = useDeviceStore((state)=>state.serverLogs)
    const installGSDs = useTiaServerStore((state)=> state.installGSDs);
    const installHSPs = useTiaServerStore((state)=> state.installHSPs);
    const [installedProducts, setInstalledProducts] = useState([]);
    const [missingProducts, setMissingProducts] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const { line_id,shop_id } = useParams();
    

    useEffect(()=>{

        const fetchData = async() => {
            setIsLoading(true);
            const lines = await fetchLine(shop_id,line_id);
            setDevice(lines[0]);
            const plcs = await fetchPLCsPerLine(shop_id, line_id);
            setPlcs(plcs);
            
            await fetchServerLogs(shop_id, line_id);

            //fetch installed product from current server
            var installedProducts = await fetchInstalledProducts(shop_id,line_id);
            setInstalledProducts(installedProducts);

            //fetch installed product from server58 server
            var installedProductsFromServer58 = await fetchInstalledProducts(22,11);
            
            let difference = [];
            installedProductsFromServer58?.forEach(server58Product => {
                var matchedProduct = installedProducts?.filter(item => item.DisplayName === server58Product.DisplayName && item.Version === server58Product.Version);
                if(matchedProduct)
                {
                    if(matchedProduct.length === 0){
                        difference.push(server58Product);
                    } else{
                        //check features
                        var serverProduct = matchedProduct[0];
                        var unmatchedFeatures = server58Product.Features.filter(item => item.DisplayName != serverProduct.Features.DisplayName || item.Version != serverProduct.Features.Version);
                        var unmatchedSupportPackages = server58Product.SupportPackages.filter(item => item.DisplayName != serverProduct.SupportPackages.DisplayName || item.Version != serverProduct.SupportPackages.Version);
                        var unmatchedGSDs = server58Product.InstalledGSDs.filter(item => !server58Product.InstalledGSDs.includes(item));
                        server58Product.Features =unmatchedFeatures;
                        server58Product.SupportPackages =unmatchedSupportPackages;
                        server58Product.InstalledGSDs =unmatchedGSDs;
                        var diffProduct = server58Product;
                        difference.push(diffProduct);
                    }
                }
            })
            //get diff
            setMissingProducts(difference);
            setIsLoading(false);
        }

        fetchData()
        
    }, []);


    const handleInstallGSDs = async () => {
        setExpanded(true);
        var result = await installGSDs(shop_id,line_id);
    }

    const handleInstallHSPs = async () => {
        setExpanded(true);
        var result = await installHSPs(shop_id,line_id);
    }
    const handleInstallISOs = async () => {
        setExpanded(true);
    }

    return (
   
        <>
            {
                device &&
                    <div style={{marginBottom:'30px', width:'2000px'}}>
                        <h2>{device.ipAddress}</h2>
                        <div style={{display:'flex', justifyContent:'space-between', flexWrap:'wrap', width:'100%', alignItems:'flex-start' }}>
                            <div style={{display:'flex', flexDirection:'column'}}>
                                <h5>Shop: {device.shop}</h5>
                                <h5>Name: {device.name}</h5>
                                <h5>Server: {device.server}</h5>
                                <h5>Last Pinged: {device.last_pinged}</h5>
                                <PrivateRoute >
                                    <Button style={{marginTop:"15px"}} variant="secondary" onClick={handleInstallGSDs}>Install GSDs</Button>
                                    <Button style={{marginTop:"15px"}} variant="secondary" onClick={handleInstallHSPs}>Install HSPs</Button>
                                    <ModalInstallIsoForm shop_id={shop_id} line_id={line_id} handleSubmit={handleInstallISOs}/>
                                </PrivateRoute>
                            </div>
                            <img src="/server.png" style={{transform: 'scale(0.6)', verticalAlign:'top'}}/>
                        </div>
                        <Loader show={isLoading} contained={true}/>
                    </div>
            }
            {
                <SocketIoConsole id={`${shop_id}_${line_id}`} expanded={expanded} setExpanded={setExpanded}/>
            }
            {
                <HmiRow 
                list={
                    installedProducts?.map(product => {
                        return <ProductRow product={product}/>
                    })
                }
                title="Installed Softwares"
                isExpanded={false}
            />
            }
            {
                <HmiRow 
                    list={
                        missingProducts.map(product => {
                            return <ProductRow product={product}/>
                        })
                    }
                    title="Missing Softwares"
                    isExpanded={false}
                />
            }
            {
                <HmiRow 
                    list={
                    serverLogs?.map( (log, key) =>{
                        return(
                            <LineLogRow shop_id={shop_id}  line_id={line_id} log_id={log}/>
                        )})
                    }
                    title="Logs"
                    isExpanded={false}
                />
            }
        </>
    )
}

export default LinePage;