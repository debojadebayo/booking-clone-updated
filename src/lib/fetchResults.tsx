import React from 'react'
import { SearchParams } from '../../typings'
import { Result } from '../../typings'

export async function fetchResults(searchParams: SearchParams) {

    const username = process.env.OXYLABS_USERNAME 
    const password = process.env.OXYLABS_PASSWORD

    const url = new URL(searchParams.url)

    Object.keys(searchParams).forEach(key => { 
        if (key === 'url' || key === 'location' ) return;  

        const value = searchParams[key as keyof SearchParams]

        if (typeof value === "string")
            url.searchParams.append(key, value)

    })

    console.log("scraping url >>> ", url.href)

    const body = {

        source: "universal",
        url: url.href,
        parse: true,
        render: "html",
        geo_location: "United States",
        parsing_instructions: {
          listings: {
            _fns: [
              {
                _fn: "xpath",
                _args: ["//div[@data-testid='property-card']"],
              },
            ],
            _items: {
              title: {
                _fns: [
                  {
                    _fn: "xpath_one",
                    _args: [".//div[@data-testid='title']/text()"],
                  },
                ],
              },
              description: {
                _fns: [
                  {
                    _fn: "xpath_one",
                    _args: [
                      ".//div[contains(@class, 'c0ade187b1')]/h4[contains(@class, 'e8acaa0d22 e7baf22fe8')]/text()",
                    ],
                  },
                ],
              },
              booking_metadata: {
                _fns: [
                  {
                    _fn: "xpath_one",
                    _args: [
                      ".//div[contains(@class, 'c5ca594cb1 f19ed67e4b')]/div[contains(@class, 'abf093bdfe f45d8e4c32')]/text()",
                    ],
                  },
                ],
              },
              link: {
                _fns: [
                  {
                    _fn: "xpath_one",
                    _args: [".//a[@data-testid='title-link']/@href"],
                  },
                ],
              },
              price: {
                _fns: [
                  {
                    _fn: "xpath_one",
                    _args: [
                      `.//span[@data-testid='price-and-discounted-price']/text()`,
                    ],
                  },
                ],
              },
              url: {
                _fns: [
                  {
                    _fn: "xpath_one",
                    _args: [".//img/@src"],
                  },
                ],
              },
              rating_word: {
                _fns: [
                  {
                    _fn: "xpath_one",
                    _args: [".//span[contains(@class, 'e8acaa0d22 eb02592978 f374b67e8c')]/text()"],
                  },
                ],
              },
              rating_count: {
                _fns: [
                  {
                    _fn: "xpath_one",
                    _args: [".//span[contains(@class, 'e8acaa0d22 ab107395cb c60bada9e4')]/text()"],
                  },
                ],
              },
              rating: {
                _fns: [
                  {
                    _fn: "xpath_one",
                    _args: [".//div[class='a447b19dfd')/text()"],
                  },
                ],
              },
            },
          },
            total_listings: {
                    _fns: [
                        {
                            _fn: "xpath_one",
                            _args: ["//h1[contains(@class, 'd8f77e681c')]/text()"]
                        }
                    ]
            },
          },
      }


    try {
      const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
          method: 'POST',
          body: JSON.stringify(body),
          next: {
              revalidate: 60 * 60, //caches the data for 1 hour
          },
          headers: {
              "Content-Type": 'application/json',
              Authorization: "Basic " + Buffer.from(`${username}:${password}`).toString("base64")
          }
      })

      if(!response.ok) {
        const errorDetails = await response.json();
        console.error(`HTTP error! status: ${response.status}`, errorDetails);
        throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorDetails)}`);

      }

      const data = await response.json()
      if(data.results.length === 0) return 
      
      const results: Result = data.results[0]
      return results
      
      }
      catch (error) {
        console.error('There was an error somewhere somewhere:', error)
      }
  
}

export default fetchResults
