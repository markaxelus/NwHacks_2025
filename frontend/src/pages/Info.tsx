import React from 'react'
import Learning from '../assets/Learning.png'
import Trust from '../assets/Trust.png'
import Plant from '../assets/Plant.png'
import FAQ from '../assets/FAQ.png'
import Instagram from '../assets/instagram.png';
import Mail from '../assets/Mail.png';

import DLearning from '../assets/dark/D_Head.png'
import DTrust from '../assets/dark/D_Trust.png'
import DPlant from '../assets/dark/D_Plant.png'
import DFAQ from '../assets/dark/D_FAQ.png'
import DInstagram from '../assets/dark/D_Instagram.png';
import DMail from '../assets/dark/D_Mail.png';

import { useDarkMode } from '../components/DarkMode';



const Info = () => {
    const darkMode = useDarkMode();
  return (
    <div className='flex flex-col justify-center items-center font-bold pt-48 mb-52'>

        <div className='text-center space-y-[14rem]'>
            {/* Why Choose */}
            <div className='flex flex-col items-center space-y-8'>
                <h1 className='text-4xl dark:bg-clip-text 
        dark:bg-gradient-to-r 
        dark:from-[#60DDD9] 
        dark:to-[#347775]
        dark:text-transparent'>
                    Why Choose Synapse?
                </h1>
                <img src={darkMode ? DLearning:Learning} 
                    alt='thinking'
                    className=''
                />
                <p>
                Designed with neurodivergent users in mind, Synapse simplifies learning by 
                <br></br>presenting information visually, making complex ideas easier to absorb
                </p>
                    
            </div>

            {/* Benefits */}
            <div className='flex flex-col items-center space-y-8'>
                <h1 className='text-4xl dark:bg-clip-text 
        dark:bg-gradient-to-r 
        dark:from-[#60DDD9] 
        dark:to-[#347775]
        dark:text-transparent'>   
                    Who Can Benefit?
                </h1>
                <img src={darkMode ? DTrust: Trust} 
                    alt='trust'
                />
                <p>
                Perfect for students, educators, and professionals seeking faster 
                <br></br>comprehension through visual aids
                </p>
                    
            </div>

            {/* Community */}
            <div className='flex flex-col items-center space-y-8'>
                <h1 className='text-4xl dark:bg-clip-text 
        dark:bg-gradient-to-r 
        dark:from-[#60DDD9] 
        dark:to-[#347775]
        dark:text-transparent'>
                    Join Our Community
                </h1>
                <img src={darkMode ? DPlant:Plant} 
                    alt='share'
                />
                <p>
                Be part of our growing community. Share feedback, request features, and 
                <br></br>help shape the future of Synapse
                </p>
            </div>

            {/* Contact */}
            <div className='flex flex-col items-center space-y-8'>
                <h1 className='text-4xl dark:bg-clip-text 
        dark:bg-gradient-to-r 
        dark:from-[#60DDD9] 
        dark:to-[#347775]
        dark:text-transparent'>
                    Contact Us
                </h1>
                <img src={darkMode ? DFAQ:FAQ} 
                    alt='share'
                />
                <p>
                Have questions? Reach out to our support team or follow us on 
                <br></br>social media
                </p>
                <div className='flex space-x-12 pt-16'>
                    <img src={darkMode ? DMail:Mail} alt="mail" className="w-15 h-15" />
                    <img src={darkMode ? DInstagram:Instagram} alt="instagram" className="w-15 h-15" />
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Info