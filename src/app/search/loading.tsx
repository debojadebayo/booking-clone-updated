import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

function LoadingResults() {

  const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

  return (
    <section>

      <div className='max-w-7xl mx-auto pt-10'>
        <p className='text-center animate-pulse font-bold text-[#013B94] pt-10'>Sit tight! We're just fetching the best deals on the web</p>
      </div>
      
      <div className='flex justify-center py-10'>
        <div className='w-10 h-10 bg-[#013B94] rounded-full animate-bounce'></div>
      </div> 

      <div className='space-y-2 p-5'>
        {[...Array(10)].map((_, i) => 
          <div key={i} className='flex space-x-2 mx-auto max-w-7xl'>
            <Skeleton className={`${shimmer} h-20 w-20 rounded-lg md:h-44 md:w-44 bg-gray-100`} />
            <Skeleton className={`${shimmer} h-44 w-full rounded-lg bg-gray-100`} /> 
            {/* bg-muted class not included */}
          </div>)}
      </div>

    </section>
  )
}

export default LoadingResults
