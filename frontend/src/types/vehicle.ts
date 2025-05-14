import { categoryType } from "./category"

export type vehicleType = {
    id: string
    name: string
    marca: string
    ano: number
    image: string
    estoque: number
    categoria_id: string
    categoria: categoryType
    created_at: Date
    update_at: Date
}
