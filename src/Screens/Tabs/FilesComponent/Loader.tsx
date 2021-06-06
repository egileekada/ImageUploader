import React from 'react'

export default function Loader() {

    const [showModal, setShowModal] = React.useState(true)
    const timerRef = React.useRef<NodeJS.Timeout>();

    React.useEffect(() => {
        timerRef.current = setInterval(() => { 
            setShowModal(false)
        }, 5000); 
        
        return () => {
            clearInterval(timerRef.current!);
        };
    }, []);

    return (
        <div>
            {showModal ? (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"> 
                            <svg className='animate-spin ' width="70" height="70" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                                <g fill="none">
                                    <g transform="translate(1 1)" className='stroke-2'>
                                        <circle style={{strokeOpacity: .5}}  cx="18" cy="18" r="18"/>
                                        <path d="M36 18c0-9.94-8.06-18-18-18">
                                            {/* <animateTransform
                                                attributeName="transform"
                                                type="rotate"
                                                from="0 18 18"
                                                to="360 18 18"
                                                dur="1s"
                                                repeatCount="indefinite"/> */}
                                        </path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}                        
        </div>
    )
}

