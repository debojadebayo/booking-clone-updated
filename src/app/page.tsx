import Image from "next/image";
import { trending_data } from "@/data/trending";
import { SearchForm } from "@/components/SearchForm";

export default function Home() {
  return (
    <main className="bg-[#013B95]">
      <section className="max-w-7xl mx-auto p-6">
        <h2 className="font-bold text-white text-5xl">Find your Next Stay</h2>
        <h3 className=" text-xl py-5 text-white"> Search low prices on hotels. homes and much more...</h3>
      </section>

      <section className="m-4 mt-0 -mb-14 px-2 lg:px-4">
        <SearchForm />
      </section>

      <section className="max-w-7xl mx-auto m-4 mt-10 p-6 bg-white rounded-t-lg">
        <div className="pt-5">
          <h3 className="text-xl font-bold">Trending Destinations</h3>
          <p className= "text-lg font-light">Most popular choices for travellers from around the world</p>
        </div>
        <div className="flex space-x-4 py-5 overflow-x-scroll">
          {trending_data.map((place) => (
            <div key={place.id} className="space-y-1 shrink-0 cursor-pointer">
                <img
                  src={place.src}
                  alt={place.title}
                  className="w-80 h-72 rounded-lg object-cover pb-2"
                />

                <p className="font-bold">{place.title}</p>
                <p className="">{place.location}</p>
                <p className="text-sm font-light">{place.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
