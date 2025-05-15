'use client'

import { useToast } from "@/components/use-toast"
import { api } from "@/services/api"
import { vehicleType } from "@/types/vehicle"
import { useEffect, useState } from "react"
import Card from "@/components/site_PS/card/card"
import style from "./style.module.css"
import Navbar from "@/components/site_PS/navbar/navbar"
import Footer from "@/components/site_PS/footer/footer"

export default function Home() {
  const [vehicle, setVehicle] = useState<vehicleType[] | undefined>()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')  
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<vehicleType[]>('GET', `/veiculos`)

      if (response) {
        setVehicle(response)
      } else {
        toast({
          title: 'Veiculos não encontrados',
        })
      }
    }
    requestData()
  }, [toast])


  const handleCategoryChange = (categoria: string) => {
    setSelectedCategory(categoria)
  }

function normalize(str: string | undefined) {
  if (!str) return ''
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
}

const filteredVehicles = selectedCategory === 'all'
  ? vehicle
  : vehicle?.filter(v => normalize(v.categoria?.name) === selectedCategory)


  return (
    <>
      <div className={style.page}>
        <Navbar logo="./images/logo.png" onCategoryChange={handleCategoryChange} />
        <h1 className={style.title}>Veiculos</h1>
        <div className={style.wrapper}>
          {filteredVehicles?.map((vehicle: vehicleType, index: number) => (
            <Card vehicle={vehicle} key={index} />
          ))}
        </div>
        <Footer />
      </div>
    </>
  )
}
