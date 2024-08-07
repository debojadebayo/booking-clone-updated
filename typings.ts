import { List } from "postcss/lib/list"

export type Result = {
    content: {
        total_listings: string,
        listings: Listing[]
    }

}

export type Listing = {

    url: string,
    title: string,
    description: string,
    booking_metadata: string,
    link: string,
    price: string,
    rating: string | null,
    rating_word: string,
    rating_count: string | null,


}


export type SearchParams = {

    url: URL, 
    checkin: string, 
    checkout: string,
    group_adults: string,
    group_children: string,
    no_rooms: string,
  }