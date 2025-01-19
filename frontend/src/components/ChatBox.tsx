import React from 'react'

const ChatBox = () => {
  return (
    <div className='h-full w-full pb-12 bg-gray-900/[0.1] rounded-3xl'>
      <div className='m-4 w-[95%] h-44'>
        CHAT GOES HERE
      </div>
        <input 
          type='text'
          placeholder='Message to ChatBot'
          className='w-[95%] h-12 border-2 border-gray-900 rounded-3xl p-6 bg-transparent outline-none'>
        </input>
      <div className="h-full flex  justify-center items-end bg-red-100"> 
        
      </div>
    </div>
  )
}

export default ChatBox
