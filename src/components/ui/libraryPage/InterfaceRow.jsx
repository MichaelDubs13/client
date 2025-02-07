import React , {useState, } from 'react';
import { TBody,  Table } from '@tesla/design-system-react';

const InterfaceRow = ({block}) => {
 
    return (
        <>
                <tr>
                    <td colSpan={6}>
                        <Table 
                            hasBorder={true} 
                            hasTbodyRowBorders={true}>
                            <TBody>
                                {
                                    block.Interfaces.Input.length > 0 &&
                                    <tr>
                                        <td colSpan={6} className='td-block'>Inputs</td>
                                    </tr>
                                }
                                {
                                    block.Interfaces.Input.map((item) => {
                                        return (
                                        <tr>
                                            <td>{item.Name}</td>
                                            <td>{item.DataType}</td>
                                            <td>{item.DefaultValue}</td>
                                            <td>{item.Comment}</td>
                                        </tr>
                                    )})
                                }
                                {
                                    block.Interfaces.InOut.length > 0 &&
                                    <tr>
                                        <td colSpan={6} className='td-block'>InOut</td>
                                    </tr>
                                }
                                {
                                    block.Interfaces.InOut.map((item) => {
                                        return (
                                        <tr>
                                            <td>{item.Name}</td>
                                            <td>{item.DataType}</td>
                                            <td>{item.DefaultValue}</td>
                                            <td>{item.Comment}</td>
                                        </tr>
                                    )})
                                }
                                {
                                    block.Interfaces.Output.length > 0 &&
                                    <tr>
                                        <td colSpan={6} className='td-block'>InOut</td>
                                    </tr>
                                }
                                {
                                    block.Interfaces.Output.map((item) => {
                                        return (
                                        <tr>
                                            <td>{item.Name}</td>
                                            <td>{item.DataType}</td>
                                            <td>{item.DefaultValue}</td>
                                            <td>{item.Comment}</td>
                                        </tr>
                                    )})
                                }
                            </TBody>
                        </Table>
                    </td>
                </tr>
        </>
    );
}

export default InterfaceRow;