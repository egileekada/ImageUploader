import React from 'react'
import { IoIosClose } from 'react-icons/io';
// import { useHistory } from 'react-router-dom';

export default function DeleteModal(props: any) {

    // const history = useHistory();
    const [disable, setDisable] = React.useState(false)
    const [value, setValue] = React.useState({
        name: '',
        url: '',
    });

    console.log(value.name)
    
    React.useEffect(() => {
      setValue(props.value)
    }, [props.value]);

    const Close =()=> {
        if(disable === true){
            props.close(true)
        } else {
            props.close(false)
        }
    }

    const DeleteHandler = async() => { 
        setDisable(true)
        try {
            await fetch('https://image-uploder.herokuapp.com/api/image/delete', {
                method: 'POST',
                body: JSON.stringify({ 
                    data: { 
                        name: value.name   
                    }
                }),
                headers: { 'Content-Type': 'application/json' },
            });  
        } catch (err) {
            console.error(err); 
        } 
        props.close(false);
        // history.go(0);

    }

    return ( 
        <div style={{width:'400px'}} className='bg-white rounded-lg pb-8 p-2' >
            <div className='w-full flex justify-end p-2' >
                <div onClick={()=> Close()} style={{border:'1.5px solid #200E32'}} className={!disable ? 'h-6 cursor-pointer w-6 flex justify-center items-center rounded-md':'h-7 w-7 flex justify-center cursor-not-allowed items-center bg-gray-300 rounded-full'}>
                    <IoIosClose color='#200E32' size='30px' />
                </div>
            </div>
            <div className='pt-8 px-2' >
                <p className='text-sm font-bold text-center' >Are You Sure you want to delete this file</p>
                <div className='w-full h-full py-4 flex flex-col justify-center items-center' >
                    <img className='w-24 h-24 object-cover rounded-md opacity-60' src={value.url} alt="" />
                    <p className='text-xs font-bold text-center mt-2'>{value.name}</p>
                </div>
                <div className='w-full flex px-4 flex-row' >
                    <button onClick={()=>DeleteHandler()} className='w-full text-white font-bold text-xs py-3 bg-red-500 flex justify-center items-center rounded-lg mr-4'>
                        {!disable ? 
                            'Delete':
                            <svg className='animate-spin ' width="20" height="20" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                                <g fill="none">
                                    <g transform="translate(1 1)" className='stroke-2'>
                                        <circle style={{strokeOpacity: .5}}  cx="18" cy="18" r="18"/>
                                        <path d="M36 18c0-9.94-8.06-18-18-18"> 
                                        </path>
                                    </g>
                                </g>
                            </svg>
                    }</button>
                    <button onClick={()=> Close()} className={!disable ? 'w-full text-white font-bold rounded-lg ml-4 text-xs py-3 bg-gray-300': 'w-full text-white cursor-not-allowed font-bold rounded-lg ml-4 text-xs py-3 bg-gray-300'}>
                        Cancel
                    </button>
                </div>
            </div>

        </div> 
    )
}
