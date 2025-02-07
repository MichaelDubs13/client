import React , {useState } from 'react';
import { Link } from '@tesla/design-system-react'
const HardwareLinkRow = ({hardware}) => {
    return (
        <>

            <tr>
                <td><Link href={hardware.link} target="_blank" rel="noopener noreferrer">{hardware.link}</Link></td>
            </tr>
        </>
    );
}

export default HardwareLinkRow;