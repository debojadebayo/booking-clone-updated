import { notFound } from 'next/navigation'
import React from 'react'
import fetchResults from '../../lib/fetchResults'

type Props = {searchParams: SearchParams}

export type SearchParams = {

  url: URL, 
  checkin: string, 
  checkout: string,
  group_adults: string,
  group_children: string,
  no_rooms: string,
}


async function SearchPage({ searchParams }: Props) {

  if (!searchParams.url) {
    return notFound()
  }

  const results = await fetchResults(searchParams)

  if (!results) {
    return <div> No results found </div>;
  }

  console.log(results)

return (
  <section>
    <div className='flex mx-auto max-w-7xl p-6 lg:p-8'>
      <h1 className='text-4xl font-bold text-[#013B94] pb-4'>Your Search Results</h1>

      <h2 className='pb-3'>
        Dates of trip: <span className='italic'>{searchParams.checkin} - {searchParams.checkout}</span>
      </h2>

      <hr className='mb-5' />

      <h3 className='font-semibold text-xl'>{results.content.total_listings}</h3>

      <div className='mt-5'>
        {results.content.listings.map((listing, i) => (
          <div key={i} className='flex space-y-2 justify-between space-x-4 p-5 border
          rounded-lg max-w-7xl'>
            <img
              src={listing.url}
              alt={listing.title}
              className='h-44 w-44 rounded-lg`'
            
              >
            </img>
          </div>

          
        ))}

      </div>
    </div>
  </section>
)
}

export default SearchPage
