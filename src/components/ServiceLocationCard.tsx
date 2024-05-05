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
import React, { Dispatch, RefObject, SetStateAction } from 'react'
import { Input } from "./ui/input"


const ServiceLocationCard = ({ refs, setArea }: { refs: RefObject<HTMLInputElement>[], setArea: Dispatch<SetStateAction<string>> }) => {

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        for (let i = 0; i < refs.length; i++) {
            console.log(refs[i].current?.value)
            if (!refs[i].current?.value) {
                refs[i].current?.focus()
                break
            }
        }
    }

    const areas = ['Los Angelos', 'Tokyo', 'London', 'Sydney', 'Moscow']

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Service Location</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submitForm} className="grid grid-cols-2 gap-x-2 gap-y-3">
                    <Input ref={refs[0]} type="text" placeholder="Address" className="col-span-2" />
                    <Input ref={refs[1]} type="text" placeholder="City" className="col-span-2" />
                    <Input ref={refs[2]} type="text" placeholder="State" className="col-span-2" />
                    <Input ref={refs[3]} type="number" placeholder="Zip code" />

                    <Select onValueChange={(value) => setArea(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Area" />
                        </SelectTrigger>
                        <SelectContent>
                            {areas.map((el) => <SelectItem key={el} value={el}>{el}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <button type="submit" className="hidden">Submit</button>
                </form>
            </CardContent>
        </Card>
    )
}

export default ServiceLocationCard