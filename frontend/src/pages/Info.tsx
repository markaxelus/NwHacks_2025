import React from 'react'
import Learning from '../assets/Learning.png'
import Trust from '../assets/Trust.png'
import Plant from '../assets/Plant.png'
import FAQ from '../assets/FAQ.png'
import Instagram from '../assets/instagram.png';
import Mail from '../assets/Mail.png';

const Info = () => {
  return (
    <div className='flex flex-col justify-center items-center font-bold pt-48 mb-52'>

        <div className='text-center space-y-[14rem]'>
            {/* Why Choose */}
            <div className='flex flex-col items-center space-y-8'>
                <h1 className='text-4xl'>
                    Why Choose Link?
                </h1>
                <img src={Learning} 
                    alt='thinking'
                    className=''
                />
                <p>
                Designed with neurodivergent users in mind, Link simplifies learning by 
                <br></br>presenting information visually, making complex ideas easier to absorb
                </p>
                    
            </div>

            {/* Benefits */}
            <div className='flex flex-col items-center space-y-8'>
                <h1 className='text-4xl'>   
                    Who Can Benefit?
                </h1>
                <img src={Trust} 
                    alt='trust'
                />
                <p>
                Perfect for students, educators, and professionals seeking faster 
                <br></br>comprehension through visual aids
                </p>
                    
            </div>

            {/* Community */}
            <div className='flex flex-col items-center space-y-8'>
                <h1 className='text-4xl'>
                    Join Our Community
                </h1>
                <img src={Plant} 
                    alt='share'
                />
                <p>
                Be part of our growing community. Share feedback, request features, and 
                <br></br>help shape the future of Link
                </p>
            </div>

            {/* Contact */}
            <div className='flex flex-col items-center space-y-8'>
                <h1 className='text-4xl'>
                    Contact Us
                </h1>
                <img src={FAQ} 
                    alt='share'
                />
                <p>
                Have questions? Reach out to our support team or follow us on 
                <br></br>social media
                </p>
                <div className='flex space-x-12 pt-16'>
                    <img src={Mail} alt="mail" className="w-15 h-15" />
                    <img src={Instagram} alt="instagram" className="w-15 h-15" />
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Info