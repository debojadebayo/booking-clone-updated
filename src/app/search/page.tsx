import { notFound } from 'next/navigation'
import React from 'react'
import fetchResults from '../../lib/fetchResults'
import { SearchParams } from '../../../typings'
import Image from 'next/image'
import { list } from 'postcss'
import Link from 'next/link'

type Props = {searchParams: SearchParams}

async function SearchPage({ searchParams }: Props) {

  if (!searchParams.url) {
    return notFound()
  }


  try {
    const results = await fetchResults(searchParams)
    
    if (!results || !results.content) {
      console.error("No results or listings found", results)
      return <div> No results found </div>;
    }
    
    const content = results.content

      {console.log("Returning results", content)}
     
      return (

        <section>
          <div className='flex flex-col mx-auto max-w-7xl p-6 lg:px-8'>
            <h1 className='text-4xl font-bold text-[#013B94] pb-3'>Your Search Results</h1>
      
            <h2 className='pb-3'>
              Dates of trip: <span className='italic'>{searchParams.checkin} - {searchParams.checkout}</span>
            </h2>
      
            <hr className='mb-5' />
      
            <h3 className='font-semibold text-xl'>{results.content.total_listings}</h3>
      
            <div className='mt-5 mb-2'>
              {results.content.listings.map((listing, i) => (
      
                <div key={i} className='flex mb-2 justify-between space-x-4 p-5 border
                rounded-lg max-w-7xl'>
                  <Image
                  src={listing.url}
                  alt={`image of ${listing.title}`}
                  height={44}
                  width={44}
                  className='h-44 w-44 rounded-lg'
                  />
      
      
                  <div className='flex flex-1 space-x-5 justify-between'>
                    <div>
                      <Link 
                        href={listing.link}
                        className='font-bold text-blue-500 hover:text-blue-600 hover:underline text-2xl'>
                          {listing.title}
                      </Link>
                      <p className='text-md mt-4'>{listing.description}</p>
                    </div>


                    <div className="text-right">
                      <p className="text-md">{listing.price}</p>
                    </div>

                  </div>
                </div> 
              ))}
      
            </div>
          </div>
        </section>
      )

  } catch (error) {
    console.log("Something went horribly wrong...", error)
    throw error
    
  }

}



export default SearchPage
