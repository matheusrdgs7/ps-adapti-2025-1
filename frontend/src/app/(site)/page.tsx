'use client'

import { useToast } from "@/components/use-toast"
import { api } from "@/services/api"
import { vehicleType } from "@/types/vehicle"
import { useEffect, useState } from "react"
import Card from "@/components/site_PS/card/card"
import style from "./style.module.css"
import  Navbar  from "@/components/site_PS/navbar/navbar"
import Footer from "@/components/site_PS/footer/footer"


export default function Home() {
  const [vehicle, setVehicle] = useState<vehicleType[] | undefined>()
  const {toast}=useToast()

  useEffect(()=>{
    const requestData = async() =>{
      const {response} = await api<vehicleType[]>('GET', `/veiculos`)

      if(response){
        setVehicle(response)
      }else{
        toast({
          title: 'Veiculos não encontrados',
        })
      }
    }
    requestData()
  }, [toast])

  return (
    <>
    <div className={style.page}>
      <Navbar logo="./images/logo.png"></Navbar>
      <h1 className={style.title}>Veiculos</h1>
      <div className={style.wrapper}>
        {vehicle?.map((vehicle: vehicleType, index: number)=>(
        <Card vehicle={vehicle} key={index}></Card>
      ))}
      </div>
      <Footer/>
    </div>
  </>
  )
}
