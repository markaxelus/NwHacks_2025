import React from 'react'

const ChatBox = () => {
  return (
    <div className='h-full w-full pb-4 bg-gray-900/[0.1] p-4 rounded-3xl flex flex-col items-center justify-between '>
      <div className='m-4 w-[95%] h-[70%] flex items-right justify-right overflow-y-auto'>
        CHAT GOES HERE
      </div>
        
      <input 
        type='text'
        placeholder='Message to ChatBot'
        className='w-[95%] h-12 border-2 border-gray-900 rounded-3xl p-6 bg-transparent outline-none'>
      </input>
    </div>
  )
}

export default ChatBox
