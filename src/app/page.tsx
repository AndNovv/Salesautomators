"use client"
import { useEffect, useRef, useState } from "react"
import ClientDetailsCard from "@/components/ClientDetailsCard"
import JobDetailsCard from "@/components/JobDetailsCard"
import ServiceLocationCard from "@/components/ServiceLocationCard"
import ScheduledCard from "@/components/ScheduledCard"
import { Button } from "@/components/ui/button"
import { AxiosResponse } from "axios"
import { useSearchParams } from "next/navigation"

const axios = require('axios');
const qs = require('qs');


export default function Home() {


  // Client Details Data
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const clientDetailsInputRefs = [firstNameRef, lastNameRef, phoneRef, emailRef]

  // Job Details Data

  const [jobType, setJobType] = useState('')
  const [jobSource, setJobSource] = useState('')
  const jobDescriptionRef = useRef<HTMLTextAreaElement>(null)

  // Service Location Data

  const addressRef = useRef<HTMLInputElement>(null)
  const cityRef = useRef<HTMLInputElement>(null)
  const stateRef = useRef<HTMLInputElement>(null)
  const zipCodeRef = useRef<HTMLInputElement>(null)

  const serviceLocationRefs = [addressRef, cityRef, stateRef, zipCodeRef]

  const [area, setArea] = useState('')

  // Schedulded Data

  const starttimeRef = useRef<HTMLInputElement>(null)
  const endTimeRef = useRef<HTMLInputElement>(null)

  const scheduldedRefs = [starttimeRef, endTimeRef]

  const [date, setDate] = useState<Date>(new Date())
  const [technician, setTechnician] = useState('')

  const allRefs = [...clientDetailsInputRefs, jobDescriptionRef, ...serviceLocationRefs, ...scheduldedRefs]


  const printInformation = () => {
    allRefs.forEach((ref) => console.log(ref.current?.value))

    console.log(jobType)
    console.log(jobSource)

    console.log(area)

    console.log(date)

    console.log(technician)
  }


  const clientId = process.env.CLIENT_ID
  const clientSecret = process.env.CLIENT_SECRET
  const authorizationHeader = `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`;
  const redirect_uri = process.env.BASE_URL

  console.log(authorizationHeader)

  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  console.log(code)

  const data = qs.stringify({
    'grant_type': 'authorization_code',
    'redirect_uri': redirect_uri,
    'code': code
  });

  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://oauth.pipedrive.com/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': authorizationHeader,
    },
    data: data
  };


  async function exchangeToken(): Promise<void> {
    axios.request(config)
      .then((response: AxiosResponse) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error: any) => {
        console.log(error);
      })
  }

  // useEffect(() => {
  //   exchangeToken();
  // }, [])

  const testApi = () => {
    exchangeToken()
  }

  return (
    <main className="pt-10 md:px-20 lg:px-60">
      <div className="grid gap-4 grid-cols-2">
        <ClientDetailsCard refs={clientDetailsInputRefs} />
        <JobDetailsCard setJobType={setJobType} setJobSource={setJobSource} jobDescriptionRef={jobDescriptionRef} />
        <ServiceLocationCard refs={serviceLocationRefs} setArea={setArea} />
        <ScheduledCard refs={scheduldedRefs} setDate={setDate} date={date} setTechnician={setTechnician} />
      </div>

      <div className="flex justify-center gap-4 mt-8 w-full">
        <Button variant={'default'} size={'lg'} onClick={testApi}>Create Job</Button>
        <Button variant={'outline'} size={'lg'} onClick={printInformation}>Save Info</Button>
      </div>

    </main >
  );
}
