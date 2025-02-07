import React, { useState, useEffect } from 'react';
import {FormItem, FormLabel, FormInputText, Button, FormItemFileUpload, FormInputDropdown } from '@tesla/design-system-react';
import useAuthStore from '../../../store/authStore.js';
import * as XLSX from 'xlsx'
import ModelBuilder from "./Models/ModelBuilder";
import Parser from './Excel/Parser.js';


const CreateEecForm = ({onSubmit}) => {
  const [eecPath, setEecPath] = useState("");
  const [eecFile, setEecFile] = useState(null);
  const {user, isAuthenticated} = useAuthStore();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState(''); 
  const [xml, setXml] = useState(''); 
  
  useEffect(() => {
    if (isAuthenticated === true) {
      setUserEmail(user.email);
      setUserName(`${user.first_name} ${user.last_name}`);
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault()
    downloadXML(xml);
    onSubmit()
  };

  const handleUserEmailChange = async (event) => {
    setUserEmail(event.target.value);
  }

  const handleEecUpload = async (event) => {
    event.preventDefault();
    if(event.target.files){
      var file = event.target.files[0];
      setEecPath(event.target.value);
      setEecFile(file);
      await parseExcel(event.target.files[0]);
    }
  }
  
  const parseExcel = async (file) =>{
    var reader = new FileReader();
      reader.onload = function(event) {
        var data = event.target.result;
        const excelParser = new Parser(data);
        const config = excelParser.parseProjectSheet();
        const pdps = excelParser.parsePdpSheet();
        const mcps = excelParser.parseMcpSheet();
        const psus = excelParser.parsePsuSheet();
        let switches = excelParser.parseNetworkSheet();
        const devices = excelParser.parseDeviceSheet();
        const ios = excelParser.parseIOSheet();

        switches = excelParser.createNetworkTree(devices, switches);
        const ioDevices = excelParser.createIODevices(devices, ios);
        var xml = ModelBuilder.build(config, pdps, mcps, psus, switches, devices, ioDevices);
        setXml(xml);
      }
      reader.readAsBinaryString(file)
  }

  function downloadXML(doc) {
    const fileData = doc;
    const blob = new Blob([fileData], { type: "text/xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "xmlDoc";
    link.href = url;
    link.click();
  }

  return (
    <>
    <div style={{display: "flex", flexDirection: "column"}}></div>
      <h2 style={{ marginBottom: "10px"}}>EEC Generator</h2>
      <FormItem>
          <FormLabel htmlFor="eec">EEC Configuration</FormLabel>
          <FormItemFileUpload
              id="eec"
              accept=".xlsx"
              multiple = {false}
              label="Select File"
              placeholder="Upload EEC configuration"
              value={eecPath}
              style={{ marginBottom: "5px"}}
              onChange={handleEecUpload}/>
      </FormItem>
      <FormItem>
        <FormLabel htmlFor="userEmail">User Email</FormLabel>
        <FormInputText
          id="userEmail"
          placeholder="Enter User Email"
          value={userEmail}
          onChange={handleUserEmailChange}
        />
      </FormItem>
      <Button onClick={handleSubmit}>Create EEC</Button>
    </>
  );
};

export default CreateEecForm;