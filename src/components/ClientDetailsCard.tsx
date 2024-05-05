"use client"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import React, { RefObject } from 'react'
import { Input } from "./ui/input"

const ClientDetailsCard = ({ refs }: { refs: RefObject<HTMLInputElement>[] }) => {

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        for (let i = 0; i < refs.length; i++) {
            if (!refs[i].current?.value) {
                refs[i].current?.focus()
                break
            }
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Client Details</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={submitForm} className="grid grid-cols-2 gap-x-2 gap-y-3">
                    <Input ref={refs[0]} type="text" placeholder="First Name" />
                    <Input ref={refs[1]} type="text" placeholder="Last Name" />
                    <Input ref={refs[2]} type="text" placeholder="Phone" className="col-span-2" />
                    <Input ref={refs[3]} type="email" placeholder="Email (optional)" className="col-span-2" />
                    <button type="submit" className="hidden">Submit</button>
                </form>
            </CardContent>
        </Card>
    )
}

export default ClientDetailsCard