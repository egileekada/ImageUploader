import React from 'react';
import ViewPhotos from './FilesComponent/ViewPhotos';
import { IoMdSearch } from "react-icons/io"; 
import { useHistory } from 'react-router-dom';
import Loader from './FilesComponent/Loader';
import DeleteModal from './FilesComponent/DeleteModal';
import UpdateModal from './FilesComponent/UpdateModal';

export default function Files() { 

    const [data, setData] = React.useState([]);
    const [ deleteModal, setDeleteModal ] = React.useState(false)   
    const [ updateModal, setUpdateModal ] = React.useState(false)  
    const [ value, setValue ] = React.useState({
        name: '',
        url: ''
    })  
    const [picName, setPicName] = React.useState(localStorage.getItem('name')+'')

    const history = useHistory()

    console.log(data)

    const ClickHandler =()=> {
        localStorage.setItem('name', picName);
        history.go(0)
    }

    const ChangeHandler =(e: any)=> {

        let name = e.target.value

        if(name === ''){ 
            localStorage.setItem('name', '');
            history.go(0) 
        } 
        setPicName(name)
    }

    React.useEffect(()  => {
        // GET request using fetch inside useEffect React hook
        // if(picName === ''){

            // setData()
            fetch('https://image-uploder.herokuapp.com/api/view_image', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    data: picName 
                }),
                })
                .then(response => response.json())
                .then(data => {
                    setData(data) 
                    console.log(data)
                })
                .catch((error) => {
                console.error('Error:', error);
                });
        // }
    
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [picName]);

    return (
        <div className=' w-full h-full py-12 px-8'>
            <div className='w-full flex flex-row items-center' >
                <div>
                    <p className='font-bold text-2xl' >Manage Logos</p>
                    <p className='text-xs mt-2'>All logo files for all companies listed on the plugin</p>
                </div>
                <div className='w-full flex flex-1' />
                <div className='relative' >
                    <IoMdSearch onClick={()=> ClickHandler()} size='30px' className='absolute top-2 z-10 right-2 cursor-pointer' /> 
                    <input value={picName} onChange={(e)=> ChangeHandler(e)} style={{backgroundColor: '#F4F8FF'}} className=' w-64 text-xs p-4 rounded-md ' placeholder='Search For A Logo' /> 
                </div> 
            </div> 

            <div className=" relative w-full mt-8 grid grid-cols-4 gap-1 fill-current flex rounded-md ">
                {ViewPhotos(data, setValue, setDeleteModal, setUpdateModal)} 
            </div>
            <Loader />
            {deleteModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <DeleteModal close={setDeleteModal} value={value} />
                        </div>
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                    </>
            ) : null} 

            {updateModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <UpdateModal close={setUpdateModal} value={value} />
                        </div>
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                    </>
            ) : null}  
        </div>
    );
}
