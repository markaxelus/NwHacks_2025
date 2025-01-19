import React from 'react'

const ChatBox = () => {
  return (
    <div className='h-full flex justify-center items-center'>
      <div className='w-full flex justify-center items-center'> 
        <input 
          type='text'
          placeholder='Message to ChatBot'
          className='w-[95%] h-12 border-2 border-gray-900 rounded-3xl p-6 bg-transparent outline-none'>
        </input>
      </div>
    </div>
  )
}

export default ChatBox
