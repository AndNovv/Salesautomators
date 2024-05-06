"use client"
import { useEffect, useRef, useState } from "react"
import ClientDetailsCard from "@/components/ClientDetailsCard"
import JobDetailsCard from "@/components/JobDetailsCard"
import ServiceLocationCard from "@/components/ServiceLocationCard"
import ScheduledCard from "@/components/ScheduledCard"
import { Button } from "@/components/ui/button"
import { AxiosResponse } from "axios"
import { useSearchParams } from "next/navigation"
import AppExtensionsSDK, { Command, Modal } from '@pipedrive/app-extensions-sdk';

const axios = require('axios');
const qs = require('qs');


export default function Home() {

  const [dealFields, setDealFields] = useState<{ name: string, key: string }[]>([])


  // SDK detects identifier from URL and uses default custom UI size
  const initializeSdk = () => {
    setTimeout(async () => {
      const sdk = await new AppExtensionsSDK({ identifier: '75c6d474-5478-4875-afc3-41b54166e4ae' })
        .initialize({ size: { height: 500 } });

      const { status } = await sdk.execute(Command.OPEN_MODAL, {
        type: Modal.CUSTOM_MODAL,
        action_id: '75c6d474-5478-4875-afc3-41b54166e4ae'
      });
      console.log(status)
    })
  }

  useEffect(() => {
    initializeSdk()
  })

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


  const [accessToken, setAccessToken] = useState<string | null>(null)


  const searchParams = useSearchParams()
  const [code, setCode] = useState(searchParams.get('code'))

  useEffect(() => {
    const getAccessToken = async () => {

      console.log('getToken')
      try {
        const response = await axios.post('/api/auth', { code });
        setAccessToken(response.data.access_token)
        const dealFieldsResponse: any = await axios.get('/api/dealFields', { headers: { 'Authorization': `Bearer ${response.data.access_token}` } });
        const result = dealFieldsResponse.data.data.map((el: any) => ({ name: el.name, key: el.key }))
        setDealFields(result)
      } catch (error) {
        console.error('Error:', error); // Handle errors
      }
    }

    getAccessToken()

  }, [code])

  console.log(dealFields)


  const getUserInfo = async () => {
    console.log("getUserInfo")
    try {
      const response = await axios.get('/api/user', { headers: { 'Authorization': `Bearer ${accessToken}` } });
      console.log(response.data)
    } catch (error) {
      console.error('Error:', error); // Handle errors
    }
  }

  const createJob = async () => {

    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${month}:${day}:${year}`;

    console.log(dealFields)

    const allInputValues = {
      [dealFields[dealFields.findIndex(el => el.name === 'First Name')].key]: allRefs[0].current?.value,
      [dealFields[dealFields.findIndex(el => el.name === 'Last Name')].key]: allRefs[1].current?.value,
      [dealFields[dealFields.findIndex(el => el.name === 'Phone')].key]: allRefs[2].current?.value,
      [dealFields[dealFields.findIndex(el => el.name === 'Email')].key]: allRefs[3].current?.value,

      [dealFields[dealFields.findIndex(el => el.name === 'Job Type')].key]: jobType,
      [dealFields[dealFields.findIndex(el => el.name === 'Job Source')].key]: jobSource,
      [dealFields[dealFields.findIndex(el => el.name === 'Job Description')].key]: allRefs[4].current?.value,

      [dealFields[dealFields.findIndex(el => el.name === 'Service Address')].key]: allRefs[5].current?.value,
      [dealFields[dealFields.findIndex(el => el.name === 'Service City')].key]: allRefs[6].current?.value,
      [dealFields[dealFields.findIndex(el => el.name === 'Service State')].key]: allRefs[7].current?.value,
      [dealFields[dealFields.findIndex(el => el.name === 'Service Zip code')].key]: allRefs[8].current?.value,
      [dealFields[dealFields.findIndex(el => el.name === 'Service Area')].key]: area,

      [dealFields[dealFields.findIndex(el => el.name === 'Schedulded Start date')].key]: formattedDate,
      [dealFields[dealFields.findIndex(el => el.name === 'Schedulded Start time')].key]: allRefs[9].current?.value,
      [dealFields[dealFields.findIndex(el => el.name === 'Schedulded End time')].key]: allRefs[10].current?.value,
      [dealFields[dealFields.findIndex(el => el.name === 'Schedulded Technician')].key]: technician,

    }



    console.log(allInputValues)

    try {
      const response = await axios.get('/api/createJob', { headers: { 'Authorization': `Bearer ${accessToken}` }, params: allInputValues });
      console.log(response.data)
    } catch (error) {
      console.error('Error:', error); // Handle errors
    }
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
        <Button variant={'default'} size={'lg'} onClick={createJob}>Create Job</Button>
        <Button variant={'outline'} size={'lg'} onClick={getUserInfo}>Save Info</Button>
      </div>

    </main >
  );
}
