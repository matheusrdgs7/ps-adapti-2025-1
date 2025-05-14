'use client'

import { Button } from '@/components/button'
import { DashboardContainer } from '@/components/dashboard/dashboard-items'
import {
  FormFieldsGroup,
  FormField,
  ImageForm,
  handleImageChange,
} from '@/components/dashboard/form'
import { DialogFooter } from '@/components/dialog'
import { Input } from '@/components/input'
import { Label } from '@/components/label'
import { cn } from '@/lib/utils'
import { api, ResponseErrorType } from '@/services/api'
import { categoryType } from '@/types/category'
import { vehicleType } from '@/types/vehicle'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/select'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

interface FormFieldsVehicleProps {
  vehicle?: vehicleType | null
  readOnly?: boolean
  error?: ResponseErrorType | null
}

export default function FormFieldsVehicle({
  vehicle,
  readOnly,
  error,
}: FormFieldsVehicleProps) {
  const { pending } = useFormStatus()
  const [updateImage, setUpdateImage] = useState<string | undefined>()
  const [categorias, setCategorias] = useState<categoryType[]>()

  const requestData = async() => {
    try{
      const  response  = await api('GET', '/categorias') // requisicao para api
      if (response.error) {
          console.log('Não foi possível obter as categorias.')
      }else {
        setCategorias(response.response as categoryType[])
      }
    }catch(e){
      console.log('Ocorreu um errro inesperado.')
    }
}

useEffect(() => {
  requestData()
}, [])

  return (
    <>
      <FormFieldsGroup>
        {vehicle && <Input defaultValue={vehicle.id} type="text" name="id" hidden />}
        <FormField>
          <Label htmlFor='name' required={!vehicle}>
          Nome
          </Label>
          <Input
          name='name'
          id='name'
          placeholder='Insira o nome do veiculo'
          defaultValue={vehicle?.name}
          disabled={pending}
          readOnly={readOnly}
          error={error?.errors?.name}
          />
        </FormField>

        <FormField>
          <Label htmlFor='marca' required={!vehicle}>
          Marca
          </Label>
          <Input
          name='marca'
          id='marca'
          placeholder='Insira a marca'
          defaultValue={vehicle?.marca}
          disabled={pending}
          readOnly={readOnly}
          error={error?.errors?.marca}
          />
        </FormField>

        <FormField>
          <Label htmlFor='ano' required={!vehicle}>
          Ano
          </Label>
          <Input
          name='ano'
          id='ano'
          placeholder='Insira o ano de fabricação'
          defaultValue={vehicle?.ano}
          disabled={pending}
          readOnly={readOnly}
          error={error?.errors?.ano}
          />
        </FormField>

        <FormField>
          <Label htmlFor='estoque' required={!vehicle}>
          Estoque
          </Label>
          <Input
          name='estoque'
          id='estoque'
          placeholder='Quantidade em estoque'
          defaultValue={vehicle?.estoque}
          disabled={pending}
          readOnly={readOnly}
          error={error?.errors?.estoque}
          />
        </FormField>

        <FormField>
          <Label
          htmlFor='imagem'
          hidden={readOnly && !vehicle?.image}
          required={!vehicle}
          >
            Imagem
          </Label>
          <Input
          name='image'
          id='image'
          type='file'
          accept='image/*'
          disabled={pending}
          hidden={readOnly}
          onChange={(e)=> handleImageChange(e, setUpdateImage)}
          error={error?.errors?.image}
          />
          <ImageForm
          className="aspect-square size-40"
          src={updateImage || vehicle?.image}
          />
        </FormField>

        <FormField>
          <Select disabled={pending || readOnly} name='categoria_id' defaultValue={vehicle?.categoria_id}>
            <Label> Categoria</Label>
            <SelectTrigger> 
              <SelectValue placeholder="Selecione a categoria do veiculo"/>
            </SelectTrigger>
              <SelectContent id="categoria_id">
                <SelectGroup id="categoria_id">
                  {categorias?.map((categoria: categoryType, index: number) =>(
                    <SelectItem value={categoria.id} key = {index}>
                      {categoria.name}
                    </SelectItem>
                  ) )}
                </SelectGroup>
              </SelectContent>
          </Select>
        </FormField>

        {error?.errors?.categoria_id&&(
          <p className='text-destructive text-xs mt-2'>
            {error?.errors?.categoria_id}
            </p>
        )}

      </FormFieldsGroup>
      <DialogFooter className={cn({ hidden: readOnly })}>
        <Button type="submit" pending={pending}>
          Salvar
        </Button>
      </DialogFooter>
    </>
  )
}
