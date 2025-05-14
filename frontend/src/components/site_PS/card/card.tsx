'use client'

import { useState } from 'react'
import { vehicleType } from '@/types/vehicle'
import style from './style.module.css'
import { api, ResponseErrorType } from '@/services/api'
import { useToast } from '@/components/use-toast'

interface vehicleProp {
    vehicle: vehicleType
}

export default function Card({ vehicle }: vehicleProp) {
    const [estoque, setEstoque] = useState(vehicle.estoque)
    const [error, setError] = useState<ResponseErrorType | null>(null)
    const { toast } = useToast()

    const comprarVeiculo = async () => {
        try{
            const  {response}  = await api<ResponseType>('PUT',`/veiculos/${vehicle.id}/comprar-veiculo`)
            setEstoque(response?.estoque)
            toast({
                title: 'Parabens pela conquista !',
            })
        }catch(error){
            toast({
                title: 'Erro ao atualizar o estoque!',
            })
        } 
    }

    return (
        <div className={style.card}>
            <img src={vehicle.image} alt='Imagem do veículo' className={style.card_img} />
            <div className={style.card_body}>
                <h2 className={style.card_name}>{vehicle.name}</h2>
                <p className={style.card_content}>Marca: {vehicle.marca}</p>
                <p className={style.card_content}>Ano: {vehicle.ano}</p>
                <p className={style.card_content}>Categoria: {vehicle.categoria.name}</p>
                <p className={style.card_content}>Quantidade disponível: {estoque}</p>
                <button type='button' className={style.card_button} onClick={comprarVeiculo} disabled={estoque<=0}>
                    {estoque > 0 ? 'Comprar' : 'Indisponível'}
                </button>
            </div>
        </div>
    )
}
