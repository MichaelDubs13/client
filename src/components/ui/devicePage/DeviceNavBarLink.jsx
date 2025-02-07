import React, { useEffect  } from 'react';
import useDeviceStore from '../../../store/deviceStore';
import { Breadcrumbs, Breadcrumb } from '@tesla/design-system-react';



const DeviceNaBarLink = () => {
    const shop = useDeviceStore((state) => state.shop);
    const line = useDeviceStore((state) => state.line);
    const plc = useDeviceStore((state) => state.plc);

    const createBreadcrumbs = ()=>{
        return (
            <Breadcrumbs>
                {shop && <Breadcrumb onClick={() => {}}>{shop}</Breadcrumb> }
                {line && <Breadcrumb onClick={() => {}}>{line}</Breadcrumb> }
                {plc && <Breadcrumb onClick={() => {}}>{plc}</Breadcrumb> }
            </Breadcrumbs>
        )
        
    }

    return (
        <>
            {
                createBreadcrumbs()
            }
        </>
    )
    
}

export default DeviceNaBarLink