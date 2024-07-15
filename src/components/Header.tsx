'use client'

import Link from "next/link"
import { Fragment, useState } from "react";
import { 
    Bars3Icon, 
    ChatBubbleLeftIcon, 
    ChevronDownIcon,
    HomeIcon, 
    PaperAirplaneIcon, 
    PhoneIcon, 
    PlayCircleIcon, 
    XMarkIcon} from "@heroicons/react/20/solid";
import { Description, Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel, Popover, PopoverButton, PopoverGroup, PopoverPanel, Transition } from "@headlessui/react";
import { cn } from "@/lib/utils";


const products = [
    {
        name: 'Book a Stay',
        description: 'Find a place to stay',
        href: '#',
        icon: HomeIcon,
    },
    {
        name: 'Book a Flight',
        description: 'Fly to your destination',
        href: '#',
        icon: PaperAirplaneIcon,
    },
    {
        name: 'Contact our Support Team',
        description: "your customers' data will be safe and secure",
        href: '#',
        icon: ChatBubbleLeftIcon,
    }
]

const calltoAction = [
    {
        name: 'See Demo Booking',
        description: 'Learn more about our services',
        href: '#',
        icon: PlayCircleIcon,
    },
    {
        name: "Contact Support",
        description:"Get in touch with our team",
        href: '#',
        icon: PhoneIcon

    }
]

const navbarQuickLinks = [
    {
        name: 'Flights',
        href: '#',
    },
    {
        name: 'Car Rentals',
        href: '#',
    },
    {
        name: 'Attractions',
        href: '#',
    },
    {
        name: 'Flight & Hotel',
        href: '#',
    },
]

function Header() {

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
return (

    <header className="bg-[#003B95]">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" 
            aria-label="Global">
                <div className="flex lg:flex-1"> 
                    <Link href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">Booking.com</span>
                        <img 
                        src="https://static1.squarespace.com/static/5bde0f00c3c16aa95581e2e2/62b4cb1add9d257dd43bb03d/62b653fedc7c895918d19b24/1656116254983/booking+logo+white.png?format=1500w" 
                        alt="Booking.com" 
                        className="h-12 w-auto" />
                    </Link>
                </div>

                <div className="flex lg:hidden">
                    <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                    onClick={()=>setMobileMenuOpen(true)}>
                        <span className='sr-only'>Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />

                    </button>

                </div>

                    <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                        <Popover className="relative">
                            <PopoverButton className="group flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
                                Stays 
                                <ChevronDownIcon className="h-5 w-5 flex-none text-white group-data-[open]:rotate-180" aria-hidden="true" />
                            </PopoverButton>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                                >

                                <PopoverPanel
                                    className="absolute bg-white -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl shadow-lg ring-1 ring-gray-900/5">
                                    <div className="p-4">
                                        {products.map((item) => (
                                            <div
                                                key={item.name} 
                                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">

                                                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200">
                                                        <item.icon 
                                                        className="h-6 w-6 text-[#012B95] group-hover:text-blue-600" 
                                                        aria-hidden="true" 
                                                        />
                                                
                                                    </div>

                                                    <div className="flex-auto">
                                                        <a
                                                        href={item.href}
                                                        className="block font-semibold text-[#012B95]"
                                                        >
                                                            {item.name}
                                                            <span className="absolute inset-0" />
                                                        </a>
                                                        <p className="mt-1 text-[#013B94]">
                                                            {item.description}
                                                        </p>
                                                
                                                    </div>


                                            </div>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                        {calltoAction.map((item) => (
                                            <a 
                                                key={item.name}
                                                href={item.href}
                                                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold leading-6 text-[#012B95] hover:bg-gray-100"
                                            >
                                                <item.icon
                                                    className="h-5 w-5 flex-none text-[#012B95]"
                                                    aria-hidden="true"
                                                />

                                                    {item.name}
                                            </a>
                                        ))}
                                    </div>

                                </PopoverPanel>
                            </Transition>
                        </Popover>

                        {navbarQuickLinks.map((item) => (
                            <a 
                                key={item.name}
                                href={item.href}
                                className="text-sm font-semibold leading-6 text-white"
                            >{item.name}</a>

                        ))}
                    </PopoverGroup>

                    <div className="hidden lg:flex-1 lg:flex lg:justify-end">
                        <a href="#" className="text-sm font-semibold leading-6 text-white">
                            Log in<span aria-hidden="true">&rarr;</span></a>

                    </div>
        </nav>
        <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            >
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#013B95]
                px-6 py=6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">

                    <div className="flex flex-row items-center justify-between">
                        <a href="#" className="m-1.5 p-2.5">
                            <span className="sr-only">Booking.com</span>
                            <img
                                className="h-8 w-auto"
                                src="https://static1.squarespace.com/static/5bde0f00c3c16aa95581e2e2/62b4cb1add9d257dd43bb03d/62b653fedc7c895918d19b24/1656116254983/booking+logo+white.png?format=1500w"
                                alt="Booking.com"
                            />
                        </a>

                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-white"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />

                            </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-50">
                            <div className="space-y-2 py-6">
                                <Disclosure
                                 as="div"
                                 className="-mx-3">

                                    {({ open }) => (
                                        <>    
                                        <DisclosureButton className="flex w-full tiems-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base
                                        font-semibold leading-7 text-white hover:bg-blue-800">
                                            Stays 
                                            <ChevronDownIcon 
                                            className={cn( open ? "rotate-180" : "", "h-5 w-5 flex-none" )} aria-hidden="true" />
                                        </DisclosureButton>
                                            <DisclosurePanel className="mt-2 space-y-2">
                                                {[...products, ...calltoAction].map((item) => (
                                                    <DisclosureButton
                                                         key={item.name}
                                                         as="a"
                                                         href={item.href}
                                                         className="flex justify-start rounded-lg py-2 pl-6 pr-3
                                                         text-sm font-semibold leading-7 text-white
                                                         hover:bg-blue-800"
                                                         >
                                                        {item.name}
                                                    </DisclosureButton>
                                                ))}
                                                </DisclosurePanel>
                            
                                        </>
                                    )}

                                </Disclosure>

                                {navbarQuickLinks.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounde-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-blue-800"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                               
                            </div>

                            <div>
                                <a href="#" 
                                className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-blue-800">
                                    Log in<span aria-hidden="true">&rarr;</span>
                                </a>
                            </div>

                        </div>
                    </div>

                </DialogPanel>

        </Dialog>
    </header>
  )
}

export default Header
