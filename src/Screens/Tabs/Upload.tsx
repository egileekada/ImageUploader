import React from 'react' 
import RenderPhotos from './UploadComponent/RenderPhotos';

export default function Upload() { 

    const [ selectedFiles, setSelectedFiles ] = React.useState([] as Array<string>);
    const [ fileName, setFileName ] = React.useState([] as Array<string>);
    const [ imageFiles, setImageFiles ] = React.useState([] as Array<any>);  
    const [ showModal, setShowModal ] = React.useState(false) 

    const handleImage = (e:any) => {   
        if(imageFiles.length <= 20){
            const files = e.target.files

            for (var i = 0; i < files.length; i++) {
                let value = files[i].name+''   
                const filename = value.split('.').slice(0, -1).join('.'); 
                const clonename = [...fileName, filename];
                setFileName(clonename); 
                const clone = [...imageFiles, files[i]];
                setImageFiles(clone); 
            }
            if (e.target.files[0]) {
                const filesArray: any = Array.from(e.target.files).map((file) => URL.createObjectURL(file)); 
                
                setSelectedFiles((prevImages: any) => prevImages.concat(filesArray));
                Array.from(e.target.files).map(
                    (file : any) => URL.revokeObjectURL(file) // avoid memory leak
                );
            }
        } else {
            alert('You Can not add any more files')
        }
    };

    console.log(fileName)

    const handleImageChange = (e:any) => {  
 

		if (Array.from(e.target.files).length <= 20) {
            const files = e.target.files 

            for (var i = 0; i < files.length; i++) { 
                let value = files[i].name+''   
                const filename = value.split('.').slice(0, -1).join('.'); 
                fileName.push(filename) 
            } 

			const filesArray: any = Array.from(e.target.files).map((file) => URL.createObjectURL(file)); 
            const fileData = Array.from(e.target.files).map((file) => file);  
            
            setImageFiles((prevImages: any) => prevImages.concat(fileData));

			setSelectedFiles((prevImages: any) => prevImages.concat(filesArray));
			Array.from(e.target.files).map(
				(file : any) => URL.revokeObjectURL(file) // avoid memory leak
			); 
        } else{ 
            alert('Limit reached')
        }

    };     

    const uploadImage = async (base64EncodedImage: any, filename: any) => {
        try {
            await fetch('https://image-uploder.herokuapp.com/api/image/upload', {
                method: 'POST',
                body: JSON.stringify({ 
                    data: {
                        url: base64EncodedImage,
                        name: filename   
                    }
                }),
                headers: { 'Content-Type': 'application/json' },
            });

            if(filename === fileName[fileName.length-1]){
                setImageFiles([]);
                setSelectedFiles([]);
                setFileName([]) 
                setShowModal(false);
            } 
        } catch (err) {
            console.error(err); 
            setShowModal(false);
        } 

    };

    const handleSubmitFile = () => {
        // e.preventDefault();
  
        for (var i = 0; i < imageFiles.length; i++) {  
            const reader = new FileReader(); 

            setShowModal(true);
            const name = fileName[i] 
            reader.readAsDataURL(imageFiles[i]);
            reader.onloadend = () => { 
                uploadImage(reader.result, name);
            };
            reader.onerror = () => {
                console.error('AHHHHHHHH!!'); 
            };
        }  
    };

    return (
        <div className=' w-full h-full py-12 px-8'>
            <div className='w-full flex flex-row items-center' >
                <div>
                    <p className='font-bold text-2xl' >Upload Logos</p>
                    <p className='text-xs mt-2'>All logo files for all companies listed on the plugin</p>
                </div>
                <div className='w-full flex flex-1' />
                {fileName.length !== 0 ? 
                    
                    <button onClick={()=> handleSubmitFile()} className='w-36 flex justify-center  bg-green-500 mr-6 text-white font-bold py-4 rounded-md text-xs'>
                        Submit
                    </button>
                :null}

                {fileName.length === 0 ? 
                    <label style={{backgroundColor: '#4E60E6'}} className='w-36 flex cursor-pointer justify-center text-white font-bold py-4 rounded-md text-xs' >
                        <input   style={{display:'none' , width:'100%', height: '100%'}} type="file" id="file" multiple onChange={handleImageChange} />
                        Upload Files
                    </label>:
                    <a href='#AddOne' style={{textDecoration: 'none', color: '#4E60E6' }} className='text-xs font-bold ' >Add New Image</a>
                }
            </div>
            <div className=" w-full mt-8 grid grid-cols-3 gap-1 fill-current flex rounded-md ">
                {RenderPhotos(selectedFiles, fileName, imageFiles, setSelectedFiles, setFileName, setImageFiles) }
                {fileName.length !== 0 ?
                    <label id='AddOne' style={{fill: '#4E60E6', backgroundColor: '#D9E8FF31', width: '123px', height: '123px'}} className=" my-4 cursor-pointer flex rounded-md flex justify-center items-center">
                        <input style={{display:'none' , width: '100%', height: '100%'}} type="file" id="file" onChange={handleImage} />
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" viewBox="0 0 49.2 38.249">
                            <path className="a" d="M45.614,39.315H32.591L29.961,34.9a1.426,1.426,0,0,0-1.225-.7H20.464a1.426,1.426,0,0,0-1.225.7l-2.63,4.418H12.336v-.974a1.426,1.426,0,0,0-1.426-1.426H5.633a1.426,1.426,0,0,0-1.426,1.426v.974H3.586A3.586,3.586,0,0,0,0,42.9V68.863a3.586,3.586,0,0,0,3.586,3.586H45.614A3.586,3.586,0,0,0,49.2,68.863V42.9A3.586,3.586,0,0,0,45.614,39.315ZM24.6,66.089A10.207,10.207,0,1,1,34.807,55.882,10.207,10.207,0,0,1,24.6,66.089ZM43.377,46.707H38.908a1.426,1.426,0,0,1,0-2.852h4.468a1.426,1.426,0,1,1,0,2.852Z" transform="translate(0 -34.2)"/>
                            <circle className="a" cx="7.131" cy="7.131" r="7.131" transform="translate(17.469 14.551)"/>
                        </svg>
                    </label> 
                :null}
            </div>
            {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <svg className='animate-bounce'  viewBox="0 0 100 100" y="0" x="0" xmlns="http://www.w3.org/2000/svg" id="Layer_1" version="1.1" width="120px" height="120px"   ><g><path fill="#e0e0e0" d="M77.48 28.757L61.231 12.508c-1.191-1.166-2.28-1.727-3.276-1.732H22.589c-.943 0-1.711.762-1.711 1.698v75.051c0 .936.768 1.698 1.711 1.698h54.822c.943 0 1.711-.762 1.711-1.698V32.033c.009-.998-.508-2.085-1.642-3.276z" ></path>
                                <path fill="#666" d="M62.414 28.757H77.48L61.231 12.508v15.066c0 .652.531 1.183 1.183 1.183z"  ></path>
                                <path fill="#323232" d="M62.256 8.286a2.676 2.676 0 0 0-1.902-.786H22.589c-2.75 0-4.987 2.232-4.987 4.975v75.051c0 2.743 2.237 4.975 4.987 4.975h54.822c2.75 0 4.987-2.232 4.987-4.975V31.085a6.538 6.538 0 0 0-1.937-4.661L62.256 8.286zm-1.025 4.222L77.48 28.757H62.414a1.185 1.185 0 0 1-1.183-1.183m17.891 59.951c0 .936-.767 1.698-1.711 1.698H22.589a1.707 1.707 0 0 1-1.711-1.698v-75.05c0-.936.768-1.698 1.711-1.698h35.366v16.798c0 2.459 2 4.459 4.459 4.459h16.708v55.491z" ></path>
                                <circle fill="#323232" r="20" cy="62" cx="50"   ></circle>
                                <path fill="#fff" d="M50.455 48.867a.616.616 0 0 0-.91 0L36.83 62.734a.618.618 0 0 0 .455 1.035h8.841v10.7c0 .477.387.864.864.864h6.02a.864.864 0 0 0 .864-.864v-10.7h8.841a.618.618 0 0 0 .455-1.035L50.455 48.867z"   ></path>
                                </g> 
                            </svg>
                        </div>
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}  
        </div>
    )
}
