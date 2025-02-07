import { SideNav_v9, Icon, Chip } from "@tesla/design-system-react";
import { iconTrip,iconRobot,iconSearch, iconComputer,iconResources,iconGear,iconToybox } from '@tesla/design-system-icons';
import './App.css';
import "@tesla/design-system/dist/index.css";
import { Routes, Route } from "react-router";
import { Layout } from './components/layout/Layout';
import ToolPage from "./components/ui/toolPage/ToolPage";
import LibraryPage from "./components/ui/libraryPage/LibraryPage";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";
import { checkSession } from "./lib/checkSession";
import JobPage from "./components/ui/toolPage/JobPage";
import PrivateRoute from "./components/auth/privateRoute";
import PlcPage from "./components/ui/devicePage/plcPage/PlcPage";
import HmiPage from "./components/ui/devicePage/HmiPage";
import LinePage from "./components/ui/devicePage/LinePage";
import HardwarePage from "./components/ui/hardwarePage/HardwarePage";
import ReleaseLibPage from "./components/ui/releaseLibPage/ReleaseLibPage";
import RobotPage from "./components/ui/robotPage/RobotPage";
import EecPage from "./components/ui/eecPage/EecPage";
import PlcsPage from "./components/ui/devicePage/PlcsPage";
import HmisPage from "./components/ui/devicePage/HmisPage";
import MultiuserServersPage from "./components/ui/devicePage/MultiuserServersPage";
import SearchPage from "./components/ui/searchPage/SearchPage";
import { useLocation } from 'react-router-dom';

function App() {
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuthStore();
  const location = useLocation();
  const items = [
    {
      href: '/',
      leadingText: 'CodeGen',
      leading: <Icon data={iconComputer} size="large"/>,
      highlighted: location.pathname === '/',
    },
    {
      href: "/robot/",
      leadingText: 'Robot',
      leading: <Icon data={iconRobot} size="large"/>,
      highlighted: location.pathname.startsWith('/robot/'),
    },
    {
      href: "/search/" ,
      leadingText: 'Search',
      leading: <Icon data={iconSearch} size="large"/>,
      highlighted: location.pathname.startsWith('/search/'),
    },
    {
      href: "/eec/" ,
      leadingText: 'EEC',
      leading: <Icon data={iconTrip} size="large"/>,
      highlighted: location.pathname.startsWith('/eec/'),
    },
    {
      href: "/library/"  ,
      leadingText: 'Library',
      leading: <Icon data={iconResources} size="large"/>,
      highlighted: location.pathname.startsWith('/library/'),
    },
    {
      href: "/hardware/" ,
      leadingText: 'Hardware',
      leading: <Icon data={iconGear} size="large"/>,
      highlighted: location.pathname.startsWith('/hardware/'),
    },
    {
      href: "#"  ,
      leadingText: 'Devices',
      leading: <Icon data={iconToybox} size="large"/>,
      trailing: <Chip text="3" />,
      highlighted: location.pathname.startsWith('/devices/'),
      items: [
        {
          href: "/devices/plc/"  ,
          leadingText: 'PLCs',
          style: {fontSize:"18px"}
        },
        {
          href: "/devices/hmi/" ,
          leadingText: 'HMIs',
          style: {fontSize:"18px"}
        },
        {
          href: "/devices/server/" ,
          leadingText: 'Servers',
          style: {fontSize:"18px"}
        },
      ],
    },
    
  ];
  useEffect(() => {
    if (isAuthenticated === false) {
      checkSession(setIsAuthenticated, setUser);
    }
  }, [isAuthenticated, setIsAuthenticated]);

  const handleItemSelect = (event) => {
    console.log(location.pathname);
  }

  return (
    <div className="App">
      <Layout>
      
        <div style={{display:"flex", flexDirection: "row"}}>
          <div className="side-bar">
            <SideNav_v9 variant="internal" hasIcons items={items} sticky={true} onItemSelect={handleItemSelect}/>
          </div>
          <div>
          <Routes>
            <Route exact path="/" element={<ToolPage />}/>
            <Route exact path="/robot/" element={<RobotPage />} />
            <Route exact path="/search/" element={<SearchPage />} />
            <Route exact path="/eec/" element={<EecPage />} />
            <Route exact path="/library/" element={<LibraryPage />} />
            <Route 
              exact 
              path="/library/release" 
              element={
                <PrivateRoute >
                  <ReleaseLibPage />
                  </PrivateRoute>
            }/>
            <Route exact path="/hardware/" element={<HardwarePage />} />
            <Route exact path="/devices/plc" element={<PlcsPage />} />
            <Route exact path="/devices/hmi" element={<HmisPage />} />
            <Route exact path="/devices/server" element={<MultiuserServersPage />} />
            <Route
            exact
            path="/jobs/:id"
            element={
              <PrivateRoute >
               <JobPage />
              </PrivateRoute>
            }/>
            <Route
            exact
            path="/devices/plc/:id"
            element={
              <PlcPage />
            }/>
            <Route
            exact
            path="/devices/hmi/:id"
            element={
              <HmiPage />
            }/>
             <Route
            exact
            path="/devices/shop/:shop_id/line/:line_id"
            element={
              <LinePage />
            }/>
          </Routes>
          
          </div>
        </div>
        
      </Layout>
    </div>
  );
}

export default App;
