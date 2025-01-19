import React from 'react'
import WorkFlow from '../assets/WorkFlow.png'
import Customize from '../assets/Customize.png'
import Export from '../assets/Export.png'
import DWorkFlow from '../assets/dark/D_Workflow.png'
import DCustomize from '../assets/dark/D_Windows.png'
import DExport from '../assets/dark/D_Chart.png'


import { useDarkMode } from '../components/DarkMode'

const KeyFeatures = () => {
    const { darkMode } = useDarkMode()
    return (
    <div className='flex flex-col justify-center items-center font-bold space-y-16 h-[60vh] '>
        <h1 className='text-4xl dark:bg-clip-text 
        dark:bg-gradient-to-r 
        dark:from-[#60DDD9] 
        dark:to-[#347775]
        dark:text-transparent'>
            Key Features
        </h1>

        <div className='flex text-center space-x-8'>
            {/* Ai Diagram */}
            <div className='flex flex-col items-center justify-between border-2 border-black w-[18rem] h-[18rem] py-4'>
                AI-Powered Diagram Generation
                <img src={darkMode ? DWorkFlow : WorkFlow} 
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
                <img src={darkMode ? DCustomize:Customize} 
                    alt='customize-diagram'
                />
                <p>
                    Adjust colours, layouts, and labels <br></br>
                    for a personalized experience
                </p>
                    
            </div>

            {/* Export & Share */}
            <div className='flex flex-col items-center justify-between border-2 border-black w-[18rem] h-[18rem] py-4 '>
                Export & Share
                <img src={darkMode ? DExport : Export} 
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