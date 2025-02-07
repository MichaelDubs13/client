import { iconChevronSmall90, iconGlobe } from '@tesla/design-system-icons';
import { Icon, NavItem, Loader } from '@tesla/design-system-react';
import React, { useState, useEffect } from 'react';
import useBlockStore from '../../../store/blockStore';
import PathRow from "./PathRow";
import Breadcrumb from "../util/Breadcrumb";

const LibraryPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const blocks = useBlockStore((state) => state.blocks);
    const fetchBlocks = useBlockStore((state) => state.fetchBlocks);
    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const programPath = "Program blocks";
    const defaultLibPath = "_Library";
    const defaultTypePath = "_Types_PLC";
    const selectAll = "All";
    const [pathObjects, setPathObjects] = useState([]);
    const [selectedPaths, setSelectedPaths] = useState([programPath, defaultLibPath, defaultTypePath, selectAll])
    const libraryFolders = [defaultLibPath, "_LibrarySafety", "_LibraryTeslaAutomation"]
    const libraryPath = `${programPath}/${defaultLibPath}/`;
    const [blockPath, setBlockPath] = useState(libraryPath);
    const libraryBlocks = blocks.filter((block) => block.Path?.startsWith(blockPath));
    const itemRefs = [];

    useEffect(()=>{
        const fetchData = async () => {
          console.log("fetching blocks")
          setIsLoading(true);
          const blocks = await fetchBlocks();
          var pathObjects = createPathObject(blocks);
          setPathObjects(pathObjects);
          var breadcrumbs = createPathOptions(pathObjects, selectedPaths);
          setBreadcrumbs([...breadcrumbs]);
          setIsLoading(false);
        }
      
        fetchData();
    }, []);

    const getOption=(blockPaths, pathOptions, depth) => {
      var item = {}
      
      for(let i = 0; i < depth; i++){
          const key = blockPaths[i];
          if(i === 0){
            item = pathOptions[key];
          } else {
            item = item[key];
          }
      }

      return item;
    }

    const getPathOptions = (pathObject) => {
      const options = []
      for (var option of Object.keys(pathObject)) {
        options.push(option);
      }
      return options;
    }
    const createPathOption = (key, options) => {
      return {label:key, value:key, options: options, };
    }
    const createPathOptions = (pathOptions, selectedPaths, index, selectedPath) => {
      let breadcrumbs = [];
      let pathObject = {};
      let key = '';
      let options = [];
      for(let i = 0 ; i < 4; i ++) {
        
        key = selectedPaths[i]

        if(i === 0){
          pathObject = pathOptions[programPath]
          options = [programPath];
        } else if(i === 1){
          key = updateKey(key, i, index, selectedPath);
          pathObject = pathObject[key]
          options = libraryFolders;
        } else {
          key = updateKey(key, i, index, selectedPath);
          pathObject = pathObject[key];
        }

        var breadcrumb = createPathOption(key, options)
        breadcrumbs.push(breadcrumb); 

        if(key != selectAll) {
          options = getPathOptions(pathObject);
        }

        if(i > 2) {
          options.unshift(selectAll)
        }
      }
      console.log(breadcrumbs)
      return breadcrumbs;
    }
    const createPathObject = (blocks) => {
      let pathOptions = {};
      blocks?.forEach(block => {
          const blockPaths = block.Path.split("/");
          for (let i = 0; i < blockPaths.length; i++) {
              const value = blockPaths[i];
              if(!value) {
                  continue;
              }
              if(i === 0){
                if(!pathOptions[value]){
                  const options = {};
                  pathOptions[value] = options;
                }
              } else {

                const parent = getOption(blockPaths ,pathOptions, i)
                if(!parent.hasOwnProperty(value)){
                  const options = {};
                  parent[value] = options;
                }
              }
          }
      })

      return pathOptions
    }
  
    const handleOptionSelect = (selectedOption, index) => {
      
      let selectedValues = selectedPaths.map((value, i) => {
       return getSelectedValue(i, index, value, selectedOption)
      })
      
      setSelectedPaths(selectedValues)
      
      let valueArray = [];
    
      for (let i = 0; i < itemRefs.length; i++) {
        let value = '';
        if(i === index){
          value = selectedOption;
        } else {
          //value = itemRefs[i].children[0].getElementsByTagName("input")[0].value;
          value = selectedValues[i];
        }

        if(value != selectAll){
          valueArray.push(value);
        }
      }


      var breadcrumbs = createPathOptions(pathObjects,selectedValues, index, selectedOption);
      setBreadcrumbs([...breadcrumbs]);
      const result = valueArray.join("/");
      setBlockPath(result);
    }
    const getSelectedValue = (i, index, value, selectedPath)=>{
      if(i === index){
        return selectedPath;
      } else if(i===2){
        if(index < 2){
          return defaultTypePath;
        }
      }else if(i === 3){
        if(index < 3){
          return selectAll;
        }
      } 

      return value;
    }
    const updateKey= (key, i, index, selectedPath) => {
      if(index && selectedPath) {
        if(i === index){
          key = selectedPath;
        } else {
          key = selectedPaths[i];
        }
        if(i===2){
          if(index < 2){
            key = defaultTypePath;
          }
        }else if(i === 3){
          if(index < 3){
            key =  selectAll;
          }
        } 
      }
      
      return key;
    }
    return (
   
        <>
             <NavItem
                href="/library/release"
                leading={<Icon data={iconGlobe} size='large'/>}
                leadingText="Library"
                trailing={<Icon data={iconChevronSmall90} />}
                caption="Release"
              />
            <h2>Library</h2>
            <div style={{marginBottom:"10px"}}/>
            <div style={{display:"flex"}}>
              {
                    breadcrumbs.map((item, key) => {
                        return (
                          <Breadcrumb itemValue={item.value} itemOptions={item.options} index={key} 
                            handleOptionSelect = {handleOptionSelect}
                            ref={(node) =>itemRefs[key] = node}
                            />
                        )
                    })   
                }
            </div>
            <Loader show={isLoading} contained={true}/>
            <PathRow blocks={libraryBlocks} path={blockPath}/>
        </>
    )
    
}

export default LibraryPage