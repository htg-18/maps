import React from 'react';
import { formats, zones, audits, subFormats } from '../../../MapData';

const Filters = ({ isDisabled,setSelectedFormat, setSelectedZone, setSelectedAudit, setSelectedSubformat }) => {
    
    const handleAuditChange = (e) => {
        if(e.target.value){
            setSelectedAudit(e.target.value);
        }else{
            setSelectedAudit("Inventory Hygiene Score")
        }
    }

    const handleZoneChange = (e) => {
        if(e.target.value){
            const selectedZone = e.target.value;
            if (zones.includes(selectedZone)) {
                setSelectedZone(selectedZone);
            }
        }else{
            setSelectedZone("All")
        }
    }

    const handleSubformatChange = (e) => {
        if(e.target.value){
            setSelectedSubformat(e.target.value);
        }else{
            setSelectedSubformat("All Subformats");
        }
    }

    const handleFormatChange = (e) => {
        if(e.target.value){
            setSelectedFormat(e.target.value);
        }else{
            setSelectedFormat("All Stores")
        }
    }

    return (
        <div className='flex flex-col gap-3 absolute left-[60px] top-[10px] rounded-[12px] w-[295px]' style={{ zIndex: '10000' }}>
            <input
                list="formatList"
                disabled={isDisabled}
                placeholder='Format :All Stores'
                onChange={handleFormatChange}
                className='pl-3 rounded-[12px] min-h-[35px] w-[260px] border-none outline-none'
                style={{ border: '0.5px solid gray', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
            />
            <datalist id="formatList">
                {formats.map((format) => {
                    return <option key={format} value={format}>{format}</option>;
                })}
            </datalist>

            <input
                disabled={isDisabled}
                list="zoneList"
                placeholder='Zone :All'
                onChange={handleZoneChange}
                className='pl-3 rounded-[12px] min-h-[35px] w-[260px] border-none outline-none'
                style={{ border: '0.5px solid gray', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
            />
            <datalist id="zoneList">
                {zones.map((zone) => {
                    return <option key={zone} value={zone}>{zone}</option>
                })}
            </datalist>

            <input
                list="auditList"
                disabled={isDisabled}
                placeholder='Audit: Inventory Hygiene Score'
                onChange={handleAuditChange}
                className='pl-3 rounded-[12px] min-h-[35px] w-[260px] border-none outline-none'
                style={{ border: '0.5px solid gray', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
            />
            <datalist id="auditList">
                {audits.map((audit) => {
                    return <option key={audit} value={audit}>{audit}</option>
                })}
            </datalist>

            <input
                list="subFormatList"
                disabled={isDisabled}
                placeholder='Subformat: All Subformats'
                onChange={handleSubformatChange}
                className='pl-3 rounded-[12px] min-h-[35px] w-[260px] border-none outline-none'
                style={{ border: '0.5px solid gray', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
            />
            <datalist id="subFormatList" >
                {subFormats.map((subFormat) => {
                    return <option key={subFormat} value={subFormat}>{subFormat}</option>
                })}
            </datalist>
        </div>
    )
}

export default Filters;
