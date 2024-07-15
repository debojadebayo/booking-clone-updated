"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { BedDoubleIcon, CalendarIcon } from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "./ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, setDate } from "date-fns";
import { cn } from "@/lib/utils"

 
const formSchema = z.object({
    location: z.string().min(2, {
        message: "Location must be at least 2 characters",
    }).max(50),
    dates: z.object({
        from: z.date(),
        to: z.date(),
    }),
    adults: z.string().min(1, {
        message: "At least 1 adult is required",
    }).max(12, {
        message: "Maximum of 12 adults occupancy"
    }),

    children: z.string().min(0).max(12, {
        message: "Maximum of 12 children occupancy"
    }),

    rooms: z.string().min(1, {
        message: "At least 1 room is required",
    }),
})

export function SearchForm() {

    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: "Madrid, Spain",
            dates: {
                from: undefined,
                to: undefined,
            },
            adults: "1",
            children: "0",
            rooms: "1",
        },
    })


    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)

        const checkin_year = data.dates.from.getFullYear().toString()
        const checkin_month = (data.dates.from.getMonth() + 1).toString()
        const checkin_day = data.dates.from.getDate().toString()
        const checkout_day = data.dates.to.getDate().toString()
        const checkout_month = (data.dates.to.getMonth() + 1).toString()
        const checkout_year = data.dates.to.getFullYear().toString()

        const checkin = `${checkin_year}-${checkin_month}-${checkin_day}`
        const checkout = `${checkout_year}-${checkout_month}-${checkout_day}`

        const url = new URL("https://www.booking.com/searchresults.html")

        url.searchParams.set("ss", data.location)
        url.searchParams.set("checkin", checkin)
        url.searchParams.set("checkout", checkout)
        url.searchParams.set("group_adults", data.adults)
        url.searchParams.set("group_children", data.children)
        url.searchParams.set("no_rooms", data.rooms)


        router.push(`/search?url=${url.href}`)

        console.log(url)

    }

    return (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col lg:flex-row lg:max-w-6xl lg:mx-auto items-center justify-center space-x-0 
                lg:space-x-2 space-y-4 lg:space-y-0 rounded-lg">

                    <div className="grid w-full lg:max-w-sm items-center gap-1.5">

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field })=> (
                                    <FormItem>
                                        <FormLabel className="text-white flex">
                                            Location
                                            <BedDoubleIcon className="ml-2 h-4 w-4 text-white" />
                                        </FormLabel>
                                        <FormMessage />
                                        
                                        <FormControl>
                                            <Input placeholder="London, UK"{...field} className="text-gray-500 bg-white"/>
                                        </FormControl>
                                    </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid w-full lg:max-w-sm flex-1 items-center gap-1.5">
                        <FormField
                            control={form.control}
                            name="dates"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel className="text-white flex">
                                    Dates
                                    <CalendarIcon className="ml-2 h-4 w-4 text-white" />
                                </FormLabel>
                                <FormMessage />

                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    id="dates"
                                                    name="dates"
                                                    variant={"outline"}
                                                    className={cn(
                                                            "w-full lg:w-[300px] justify-start text-left font-normal bg-white text-gray-500",
                                                            !field.value.from && "text-muted-foreground"
                                                        )}>
                                                        
                                                        
                                                        {field.value?.from ? (
                                                            field.value?.to ? (

                                                                    <>
                                                                       {format(field.value?.from, "LLL dd, y")} - {" "}
                                                                       {format(field.value?.to, "LLL dd, y")}  
                                                                    </>
                                                                ):(
                                                                    format(field.value?.from, "MMM dd, yyyy")
                                                                )):(
                                                                    <span>"Choose you dates"</span>
                                                                )
                                                            }

                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0 bg-white" align= "start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={field.value?.from}
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                numberOfMonths={2}
                                                disabled= {(date) =>{
                                                    const today = new Date()
                                                    today.setHours(0, 0, 0, 0) 
                                                    return date < today
                                                }}

                                                        />
                                        </PopoverContent>
                                    </Popover>
                                </FormItem>
                                    )}
                                />
                    </div>

                    <div className="flex w-full items-center space-x-2">
                        <div className="grid items-center flex-1">
                            <FormField
                                    control={form.control}
                                    name="adults"
                                    render={({ field })=> (
                                            <FormItem className="flex flex-col">
                                                <FormLabel className="text-white flex">
                                                Adults
                                                </FormLabel>
                                                <FormMessage />
                                                
                                                <FormControl>
                                                    <Input type="number" placeholder="Adults"{...field} className="text-gray-500 bg-white"/>
                                                </FormControl>
                                            </FormItem>
                                    )}
                                />
                        </div>
                        <div className="grid items-center flex-1">
                            <FormField
                                control={form.control}
                                name="children"
                                render={({ field })=> (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-white flex">
                                            Children
                                        </FormLabel>
                                        <FormMessage />
                                                
                                        <FormControl>
                                            <Input type="number" placeholder="Children"{...field} className="text-gray-500 bg-white"/>
                                        </FormControl>
                                        </FormItem>
                                    )}
                                />
                        </div>
                            
                        <div className="grid items-center flex-1"> 
                            <FormField
                                control={form.control}
                                name="rooms"
                                render={({ field })=> (
                                    <FormItem className="flex flex-col">
                                        <FormLabel className="text-white flex">
                                            Rooms
                                        </FormLabel>
                                        
                                        <FormMessage />
                                                
                                        <FormControl>
                                            <Input type="number" placeholder="Rooms"{...field} className="text-gray-500 bg-white"/>
                                        </FormControl>
                                    </FormItem>
                                    )}
                                />
                        </div>

                    

                        <div>
                            <Button 
                            type="submit" 
                            className="bg-blue-500 text-base"
                            >
                            Search
                            </Button>
                        </div>
                    </div>

                </form>
            </Form>
    )
}

