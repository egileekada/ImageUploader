import React from 'react'
import { IoMdMore } from "react-icons/io"; 

export default function ViewPhotos(source: any, setValue: any, deleteModal: any, updateModal: any) {

    const [option, setOption] = React.useState('');
    // const [value, setValue] = React.useState('');

    const Delete = (name: any, url: any) => {
        setOption('');
        setValue({
            name: name,
            url: url,
        });
        deleteModal(true)
    }

    const Edit = (name: any, url: any) => {
        setOption('');
        setValue({
            name: name,
            url: url,
        }); 
        updateModal(true)
    }

    return source.map((photo: any, index: any) => { 
        return(  
            <div key={index} className='w-64 my-4 h-auto rounded-md'>
                <div  style={{backgroundColor: '#F4F8FF'}} className='w-full h-40 relative rounded-md' >
                    <IoMdMore onClick={()=> setOption(index)} size='30px' color='#09467B' className=' absolute cursor-pointer z-10 top-1 right-1' />
                    <img className='w-full h-full object-cover rounded-md opacity-60' src={photo.url} alt="" />
                    {option === index ?
                        <div style={{border:'1px solid #D4D6DB'}} className='w-16 bg-white z-10 top-8 mt-1 -right-4 p-3 rounded-sm absolute' >
                            <p onClick={()=>Edit(photo.name, photo.url)} className='text-xs cursor-pointer' >Edit</p>
                            <p onClick={()=>Delete(photo.name, photo.url)} className='text-xs mt-2 cursor-pointer' >Delete</p>
                        </div>
                        :null
                    }
                </div>
                <p className='text-xs mt-2' >{photo.name}</p>
            </div>  
        )
    });   
}
