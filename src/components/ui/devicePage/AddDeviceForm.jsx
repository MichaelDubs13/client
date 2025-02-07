import React, { useState, useEffect } from 'react';
import {Loader, FormItem, FormLabel, FormInputText, Button, FormInputDropdown } from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import useDeviceStore from '../../../store/deviceStore.js'; 
import CreatableSelect from 'react-select/creatable';
const FormData = require('form-data');


const AddDeviceForm = ({onSubmit}) => {
  const deviceOptions = ["PLC", "HMI", "Line"]
  const [selectedDeviceOption, setSelectedDeviceOption] = useState('PLC'); 
  const [selectedShop, setSelectedShop] = useState({}); 
  const [selectedLine, setSelectedLine] = useState({}); 
  const [selectedPlc, setSelectedPlc] = useState({});
  const [selectedDevice, setSelectedDevice] = useState(''); 
  const [hostName, setHostName] = useState(''); 
  const [ipAddress, setIpAddress] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const createPLC =  useDeviceStore((state) => state.createPLC);
  const createHMI =  useDeviceStore((state) => state.createHMI);
  const createLine =  useDeviceStore((state) => state.createLine);
  const shops = useDeviceStore((state) => state.shops);
  const [plcs, setPlcs] = useState([]);
  const [lines, setLines] = useState([]);
  const fetchShops = useDeviceStore((state) => state.fetchShops);
  const addShop = useDeviceStore((state) => state.addShop);
  const fetchLines = useDeviceStore((state) => state.fetchLines);
  const fetchPLCs = useDeviceStore((state) => state.fetchPLCs);
  const fetchPLCsPerLine = useDeviceStore((state) => state.fetchPLCsPerLine);

  useEffect(()=>{
    fetchShops();
  }, []);
  const handleDeviceOptionSelect = async (event) =>{
    setSelectedDeviceOption(event.value);
  };
  const handleShopOptionSelect = async (event) =>{
    setSelectedShop(event);
    var lines = await fetchLines(event.id)
    if(lines){
      console.log(lines);
      setLines(lines);
    }
  };
  const handleLineOptionSelect = async (event) =>{
    setSelectedLine(event);
    var plcs = await fetchPLCsPerLine(selectedShop.id, event.id);
    if(plcs){
      setPlcs(plcs);
    }
  };
  const handlePlcOptionSelect = async (event) =>{
    setSelectedPlc(event);
  };
  const handleDeviceChange = async (event) =>{
    setSelectedDevice(event.target.value);
  };
  const handleIpAddressChange = async (event) =>{
    setIpAddress(event.target.value);
  };
  const handleHostNameChange = async (event) =>{
    setHostName(event.target.value);
  };
  
  const handleShopCreate = (inputValue) => {
    if(inputValue){
      var newShop = {name:inputValue}
      addShop(newShop);
      setSelectedShop(newShop);
    }
  };
  const handleLineCreate = (inputValue) => {
    if(inputValue){
      var newLine = {name:inputValue};
      setLines([...lines,newLine])
      setSelectedLine(newLine); 
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true);
    const formData = new FormData();
    switch(selectedDeviceOption){
      case "HMI":
        var payload = createHMIPayload();
        formData.set("data", JSON.stringify(payload));
        await createHMI(formData);
        break;
      case "PLC":
        var payload = createPLCPayload();
        formData.set("data", JSON.stringify(payload));
        await createPLC(formData);
        break;
      case "Line":
        var payload = createLinePayload();
        formData.set("data", JSON.stringify(payload));

        var id = selectedShop.id ? selectedShop.id : "unknown";

        await createLine(id, formData);
        break;
      default:
        break;
    }

    fetchPLCs();
    setIsLoading(false);
    onSubmit()
  };

  const createPLCPayload = () => {
    const payload = {
      "shop": selectedShop.name,
      "line": selectedLine.name,
      "device": selectedDevice,
      "ipAddress": ipAddress,
      "user_name": "",
      "email": "",
    };
    return payload;
  }

  const createHMIPayload = () => {
    const payload = {
      "shop": selectedShop.name,
      "line": selectedLine.name,
      "plc": selectedPlc.name,
      "device": selectedDevice,
      "ipAddress": ipAddress,
      "user_name": "",
      "email": "",
    };
    return payload;
  }

  const createLinePayload = () => {
    const payload = {
      "shop": selectedShop.name,
      "line": selectedLine.name,
      "server": hostName,
      "user_name": "",
      "email": "",
    };
    return payload;
  }
  

  return (
    <>
    <div style={{display: "flex", flexDirection: "column"}}></div>
      <h2 style={{ marginBottom: "10px"}}>Add a new device</h2>
      <Loader show={isLoading} contained={true}/>
      <FormItem>
          <FormLabel htmlFor="deviceType">Device Type</FormLabel>
          <FormInputDropdown
              id="deviceType"
              label="deviceType"
              onOptionSelect={handleDeviceOptionSelect}
              options={deviceOptions}
              placeholder=""
              selected={selectedDeviceOption}
              style={{ marginBottom: "5px"}}
            ></FormInputDropdown>
      </FormItem>
      <FormItem>
          <FormLabel htmlFor="shop">Shop</FormLabel>
            <CreatableSelect 
            isClearable 
            selectOption
            options={shops} 
            getOptionLabel={(shop) => shop.name}
            getOptionValue={(shop) => shop.name}
            onChange={handleShopOptionSelect}
            onCreateOption={handleShopCreate}
            selected={selectedShop}
            style={{ marginBottom: "5px"}}
            />
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="line">Line</FormLabel>
        <CreatableSelect 
          isClearable 
          selectOption
          options={lines} 
          getOptionLabel={(line) => line.name}
          getOptionValue={(line) => line.name}
          onChange={handleLineOptionSelect}
          onCreateOption={handleLineCreate}
          selected={selectedLine}
          style={{ marginBottom: "5px"}}
        />
      </FormItem>
      {
        selectedDeviceOption === "Line" &&
        <FormItem>
          <FormLabel htmlFor="server">Server URL</FormLabel>
          <FormInputText
            id="server"
            placeholder="Enter Server URL"
            value={hostName}
            onChange={handleHostNameChange}
          />
        </FormItem>
      }
      {
        selectedDeviceOption === "HMI" &&
        <FormItem>
          <FormLabel htmlFor="plc">PLC</FormLabel>
          <CreatableSelect 
            isClearable 
            selectOption
            options={plcs} 
            getOptionLabel={(plc) => plc.name}
            getOptionValue={(plc) => plc.name}
            onChange={handlePlcOptionSelect}
            selected={selectedPlc}
            style={{ marginBottom: "5px"}}
          />
        </FormItem>
      }
      {
        ["HMI", "PLC"].includes(selectedDeviceOption) &&
        <FormItem>
        <FormLabel htmlFor="name">Name</FormLabel>
        <FormInputText
          id="name"
          placeholder="Enter Device Name"
          value={selectedDevice}
          onChange={handleDeviceChange}
        />
      </FormItem>
      }
      {
        ["HMI", "PLC"].includes(selectedDeviceOption) &&
        <FormItem>
          <FormLabel htmlFor="ipAddres">Ip Address</FormLabel>
          <FormInputText
            id="ipAddres"
            placeholder="Enter IpAddress"
            value={ipAddress}
            onChange={handleIpAddressChange}
          />
        </FormItem>
      }
      
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default AddDeviceForm;