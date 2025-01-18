import React from 'react'


const Process = () => {
  return (
    <div id='process'
        className='flex flex-col space-y-6 text-center pt-44 h-[50vh]'>
      <h1 className='font-bold text-4xl'>
        How It Works
      </h1>
      
      <div className='font-bold'>
        <p>
            Simply upload your PDF, and our AI-powered system will break down <br></br>
            complex information into intuitive, customizable diagrams
        </p>
      </div>

      {/* Video Demo / Screenshot */}
      <div className='font-bold'>
        <h2>
            Maybe a demo video or a screenshot here ??
        </h2>
      </div>
    </div>
  )
}

export default Process