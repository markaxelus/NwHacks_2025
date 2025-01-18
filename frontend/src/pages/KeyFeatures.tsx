import React from 'react'
import WorkFlow from '../assets/WorkFlow.png'
import Customize from '../assets/Customize.png'
import Export from '../assets/Export.png'

const KeyFeatures = () => {
  return (
    <div className='flex flex-col justify-center items-center font-bold space-y-16 h-[60vh]'>
        <h1 className='text-4xl'>
            Key Features
        </h1>

        <div className='flex text-center space-x-8'>
            {/* Ai Diagram */}
            <div className='flex flex-col items-center justify-between border-2 border-black w-[18rem] h-[18rem] py-4'>
                AI-Powered Diagram Generation
                <img src={WorkFlow} 
                    alt='ai-diagram'
                    className=''
                />
                <p>
                    Convert text-heavy PDFs into <br></br>
                    clear, structured visuals
                </p>
                    
            </div>

            {/* Customizeable Designs */}
            <div className='flex flex-col items-center justify-between border-2 border-black w-[18rem] h-[18rem] py-4'>
                Customizeable Designs
                <img src={Customize} 
                    alt='customize-diagram'
                />
                <p>
                    Adjust colours, layouts, and labels <br></br>
                    for a personalized experience
                </p>
                    
            </div>

            {/* Export & Share */}
            <div className='flex flex-col items-center justify-between border-2 border-black w-[18rem] h-[18rem] py-4'>
                Export & Share
                <img src={Export} 
                    alt='export-diagram'
                />
                <p>
                    Download diagrams or share them <br></br>
                    directly with others
                </p>
                    
            </div>
        </div>
    </div>
  )
}

export default KeyFeatures