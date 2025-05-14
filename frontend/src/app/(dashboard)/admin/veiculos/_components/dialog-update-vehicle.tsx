'use client'

import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/dialog'
import FormFieldsVehicle from './form-fields-vehicle'
import { updateVehicle } from '@/actions/vehicle'
import { filterFormData } from '@/services/filter-form-data'
import { useEffect, useState } from 'react'
import { useToast } from '@/components/use-toast'
import { vehicleType } from '@/types/vehicle'
import { ResponseErrorType, api } from '@/services/api'
import { categoryType } from '@/types/category'

interface DialogUpdateVehicleProps {
  id: string
  children: React.ReactNode
}

export function DialogUpdateVehicle({ id, children }: DialogUpdateVehicleProps) {
  const [vehicle, setVehicle] = useState<vehicleType | null>(null)
  const [open, setOpen] = useState<boolean>()
  const [error, setError] = useState<ResponseErrorType | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const requestData = async () => {
      const { response } = await api<vehicleType>('GET', `/veiculos/${id}`)

      if (response) {
        setVehicle(response)
      } else {
        setVehicle(null)
        toast({
          title: 'Veiculo não encontrado!',
        })
        setOpen(false)
      }
    }

    requestData()

    return () => {
      setVehicle(null)
      setError(null)
    }
  }, [id, open, toast])

  const submit = async (form: FormData) => {
    const newForm = await filterFormData(form)

    const { error } = await JSON.parse(await updateVehicle(newForm))

    if (error) {
      setError(error)
      toast({
        title: 'Não foi possível editar o veiculo!',
      })
    } else {
      toast({
        title: 'Veiculo editado com sucesso!',
      })
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar veiculo</DialogTitle>
          <DialogDescription>
            Atualize as informações do veiculo abaixo e clique em
            &quot;Salvar&quot; para aplicar as alterações.
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <FormFieldsVehicle error={error} vehicle={vehicle} />
        </form>
      </DialogContent>
    </Dialog>
  )
}
