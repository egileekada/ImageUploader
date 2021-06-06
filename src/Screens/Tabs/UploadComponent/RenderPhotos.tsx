import React from 'react'
import { IoIosClose } from 'react-icons/io';

export default function RenderPhotos(source: any, name: any, files: any, setsource: any, setname: any, setfiles: any) { 
 

    const ChangeHandler = (e: any, index: any) => {   
        const clone = [...name]
        clone[index] = e.target.value;
        setname(clone)
    }
     
    function DeleteHandler(id: any, tag:any, file: any) {
        const newList = source.filter((item: any) => item !== id);   
        const clone = [...files];
        const index = clone.indexOf(file);  
        const clonename = [...name];
        const indexname = clonename.indexOf(tag);  
        clone.splice(index, 1); 
        clonename.splice(indexname, 1)
        setsource(newList);
        setname(clonename);
        setfiles(clone);
    }

    const FilesLimit = (index: any, photo: any) => { 
        return ( 
            <div key={index} style={{ width:'380px',  backgroundColor: '#D9E8FF31'}} className='p-6 flex flex-row items-center rounded-md my-4'>
                <div className='pr-6' >
                    <p className='text-xs font-bold ' >Company Name</p>
                    <input className=' w-48 py-3 px-4 text-xs rounded-md mt-3'  value={name[index]} onChange={(e)=> ChangeHandler(e, index)} />
                </div>
                <div style={{backgroundImage:'url(' + photo + ')',width:'70px', height: '70px' , backgroundRepeat:'no-repeat', backgroundSize:'cover', marginTop: '6px', display: 'flex', backgroundPosition: 'center', borderRadius: '5px', opacity:'50%' }} />
                <div onClick={()=> DeleteHandler(photo, name[index], files[index])}  style={{backgroundColor: '#E64EA029'}} className=' cursor-pointer w-6 h-6 ml-6 flex justify-center items-center rounded-full'>
                    <IoIosClose style={{color:'#EF60B2'}} />
                </div>
            </div>    
        )     
    }
 
        return source.map((photo: any, index: any) => { 
            return(
                <div key={index}>
                    {FilesLimit(index, photo)}
                </div>
            )            
        });   
}
