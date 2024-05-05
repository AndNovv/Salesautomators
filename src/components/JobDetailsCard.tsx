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
import { Textarea } from "@/components/ui/textarea"
import React, { Dispatch, RefObject, SetStateAction } from 'react'

const JobDetailsCard = ({ setJobType, setJobSource, jobDescriptionRef }: { setJobType: Dispatch<SetStateAction<string>>, setJobSource: Dispatch<SetStateAction<string>>, jobDescriptionRef: RefObject<HTMLTextAreaElement> }) => {

    const jobTypes = ['Full-time', 'Part-time', 'Freelance', 'Remote', 'Temporary']
    const jobSources = ['Company Website', 'Online Job Boards', 'Recruitment Agencies', 'Networking', 'Social Media']

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Job details</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="grid grid-cols-2 gap-x-2 gap-y-3">
                    <Select onValueChange={(value) => setJobType(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Job type" />
                        </SelectTrigger>
                        <SelectContent>
                            {jobTypes.map((el) => <SelectItem key={`${el}`} value={el}>{el}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <Select onValueChange={(value) => setJobSource(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Job source" />
                        </SelectTrigger>
                        <SelectContent>
                            {jobSources.map((el) => <SelectItem key={`${el}`} value={el}>{el}</SelectItem>)}
                        </SelectContent>
                    </Select>

                    <Textarea ref={jobDescriptionRef} placeholder="Job description (optional)" className="col-span-2" />
                </form>
            </CardContent>
        </Card>
    )
}

export default JobDetailsCard