"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import React, { Dispatch, RefObject, SetStateAction } from 'react'

const ScheduledCard = ({ refs, setDate, date, setTechnician }: { refs: RefObject<HTMLInputElement>[], setDate: Dispatch<SetStateAction<Date>>, date: Date, setTechnician: Dispatch<SetStateAction<string>> }) => {

    const technicians = ['Emma Thompson', 'Alexander Rodriguez', 'Olivia Patel', 'Benjamin Nguyen', 'Sophia Miller']

    return (
        < Card >
            <CardHeader>
                <CardTitle className="text-2xl">Schedulded</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-x-2 gap-y-3">
                <Popover>
                    <PopoverTrigger asChild className="col-span-2">
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Start date</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={(day) => setDate(day ? day : new Date)}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                <Input ref={refs[0]} type="time" placeholder="Start time" className="w-full" />
                <Input ref={refs[1]} type="time" placeholder="End time" />

                <Select onValueChange={(value) => setTechnician(value)}>
                    <SelectTrigger className="col-span-2">
                        <SelectValue placeholder="Select Technician" />
                    </SelectTrigger>
                    <SelectContent>
                        {technicians.map((el) => <SelectItem key={el} value={el}>{el}</SelectItem>)}
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    )
}

export default ScheduledCard