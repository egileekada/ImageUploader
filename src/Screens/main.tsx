import React, { useState } from 'react'; 
import { useHistory } from 'react-router-dom';
import Files from './Tabs/Files'
import Upload from './Tabs/Upload'

export default function Main() {

    const [tab, setTab] = useState('files');   
    const history = useHistory()

    const FilesTab =()=>{
        history.go(0);
        setTab('files');
    }

    React.useEffect(() => { 
        localStorage.setItem('name', '')
    }, []);

    return ( 
        <div className='w-full h-full' > 
            <div style={{backgroundColor:'#362B8B', height:"95px"}} className='w-full flex items-center px-8' > 
                <p className='text-white text-xl font-bold cur' >NGLOGOS</p>
                <div className='w-full flex flex-1' />
                <ul style={{width: '500px', marginRight: '200px', marginTop:'80px'}} className='h-full flex' >
                    <li onClick={()=> setTab('upload')} className="w-full cursor-pointer text-sm text-white mx-4">
                        <p className='w-full text-center'>UPLOAD</p>
                        <p className={tab === 'upload' ? 'w-full bg-white h-1 mt-2 rounded-xl': 'w-full h-1 mt-2 rounded-xl bg-transparent'}></p>
                    </li>
                    <li onClick={()=> FilesTab()} className="cursor-pointer w-full text-sm text-white mx-4">
                        <p className='w-full text-center'>FILES</p>
                        <p className={tab === 'files' ? 'w-full bg-white h-1 mt-2 rounded-xl': 'w-full h-1 mt-2 rounded-xl bg-transparent'}></p>
                    </li> 
                </ul> 
            </div>  
            <div className={tab === 'upload' ? 'flex' : 'hidden' } > 
                <Upload />  
            </div>
            <div className={tab === 'files' ? 'flex' : 'hidden' } > 
                <Files />  
            </div> 
        </div>
    )
}
