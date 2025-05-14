'use client'

import { destroyVehicle } from '@/actions/vehicle'
import { Button } from '@/components/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from '@/components/dialog'
import { useToast } from '@/components/use-toast'
import { useState } from 'react'

interface DialogCreateVehicleProps {
  id: string
  children: React.ReactNode
}

export function DialogVehicleDelete({ id, children }: DialogCreateVehicleProps) {
  const [open, setOpen] = useState<boolean>()
  const { toast } = useToast()

  const submit = async () => {
    const { error } = await JSON.parse(await destroyVehicle(id))

    if (error) {
      toast({
        title: 'Não foi possível excluir o veiculo!',
      })
    } else {
      toast({
        title: 'Veiculo deletado com sucesso!',
      })
    }

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar exclusão de veiculo</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este veiculo? Esta ação é
            irreversível e removerá permanentemente o veiculo do sistema. Deseja
            continuar com a exclusão?
          </DialogDescription>
        </DialogHeader>
        <form action={submit}>
          <DialogFooter>
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" type="submit">
              Excluir
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
