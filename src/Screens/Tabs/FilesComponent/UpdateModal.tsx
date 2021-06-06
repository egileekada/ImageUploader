import React from 'react';
import { IoIosClose } from 'react-icons/io';
import { useHistory } from 'react-router-dom';

export default function UpdateModal(props: any) {

    const history = useHistory();
    const [disable, setDisable] = React.useState(false)
    const [value, setValue] = React.useState({
        name: '',
        url: '',
    });
    const [newName, setNewName] = React.useState('')
    const [imageFile, setImageFiles] = React.useState(null)
    const [newImageurl, setNewImageUrl] = React.useState('')

    console.log(value.name)
    console.log(newName)

    React.useEffect(() => {
      setValue(props.value);
      setNewName(props.value.name)
      setNewImageUrl(props.value.url)
    }, [props.value]);

    const ChangeHandler =(e: any)=> {
        let name = e.target.value;

        setNewName(name);
    }

    const Close =()=> {
        if(disable === true){
            props.close(true)
        } else {
            props.close(false)
        }
    } 

    const handleImageChange = (e: any ) => {

        const selected = e.target.files[0];
        let value = selected.name+''   
        const filename = value.split('.').slice(0, -1).join('.'); 
        setNewName(filename); 
        setImageFiles(selected)
        const TYPES = ["image/png", "image/jpg", "image/jpeg" ];        
        if (selected && TYPES.includes(selected.type)) {
            const reader: any = new FileReader();
            reader.onloadend= () => {
                setNewImageUrl(reader.result)
            }
            reader.readAsDataURL(selected)
        } else {
            console.log('Error')
        } 
    }

    const Sumbit =()=> {
        if(imageFile === null){ 
            UpdateHandler(newName, value.url);
        } else { 
            UpdateHandler(newName, newImageurl);
        }
    }

    const UpdateHandler = async(newname: any, newfile: any) => { 
        setDisable(true)
        try {
            await fetch('http://localhost:8000/api/image/update', {
                method: 'POST',
                body: JSON.stringify({ 
                    data: { 
                        name: value.name,
                        newname: newname,  
                        url: newfile     
                    }
                }),
                headers: { 'Content-Type': 'application/json' },
            });  
        } catch (err) {
            console.error(err); 
        } 
        props.close(false);
        history.go(0);

    }

    return (
        <div style={{width:'600px'}} className='bg-white rounded-lg pb-6 p-2' >
            <div className='w-full flex p-2' >
                <p className='font-bold text-xs ' >Editing Logo</p>
                <div className='w-full flex flex-1' />
                <div onClick={()=> Close()} style={{border:'1.5px solid #200E32'}} className={!disable ? 'h-6 cursor-pointer w-6 flex justify-center items-center rounded-md':'h-7 w-7 flex justify-center cursor-not-allowed items-center bg-gray-300 rounded-full'}>
                    <IoIosClose color='#200E32' size='30px' />
                </div>
            </div> 
            <div className='w-full h-full px-2 py-2 flex flex-row items-center' >
                <div className=' w-full'>
                    <img className='w-64 h-40 object-cover rounded-md opacity-60' src={newImageurl} alt="" />
                    <label className=' cursor-pointer ' >
                        <input   style={{display:'none' , width:'100%', height: '100%'}} type="file" id="file" multiple onChange={handleImageChange} />
                        <p style={{color:'#4163CE'}} className=' text-xs text-center mt-2 underline cursor-pointer' >Change Icon</p>
                    </label>
                </div>
                <div className=' w-full px-4' >
                    <p className='text-xs font-bold mb-3' >Company Name</p>
                    <input value={newName} onChange={(e)=> ChangeHandler(e)} style={{border: '1px solid #0C346839'}} placeholder='Enter Company Name' className='py-3 rounded-md px-3 w-full text-xs' />
                    <div className='w-full flex justify-end' >
                        <button onClick={()=>Sumbit()} style={{backgroundColor: '#4163CE'}} className='h-10 text-white text-xs font-bold rounded-md mt-3 w-28 flex justify-center items-center' >
                            {!disable ? 
                                'Update':
                                <svg className='animate-spin ' width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                                    <g fill="none">
                                        <g transform="translate(1 1)" className='stroke-2'>
                                            <circle style={{strokeOpacity: .5}}  cx="18" cy="18" r="18"/>
                                            <path d="M36 18c0-9.94-8.06-18-18-18"> 
                                            </path>
                                        </g>
                                    </g>
                                </svg>
                            }
                        </button>
                    </div>
                </div>
            </div>  
        </div> 
    );
}
