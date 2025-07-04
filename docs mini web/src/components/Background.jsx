import React from 'react'

function Background() {
    return (
            <div className='relative h-screen w-full bg-zinc-800'>
                <div className="absolute top-[5%] w-full py-10 flex justify-center text-zinc-200 font-semibold text-xl">Documents.</div>
                <h1 className='text-[10vw] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] font-semibold leading-none text-zinc-900 tracking-tighter absolute'>Docs</h1>
            </div>
    )
}

export default Background