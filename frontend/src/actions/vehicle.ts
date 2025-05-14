'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createVehicle(form: FormData) {

    const res = await api('POST', '/veiculos', { data: form })

    if (!res.error) {
        revalidatePath('/admin/ceiculos')
    }

    return JSON.stringify(res)

}

export async function updateVehicle(form: FormData) {

    const res = await api('POST', `/veiculos/${form.get('id')}`, {
        data: form
    })

    if (!res.error) {
        revalidatePath('/admin/veiculos')
    }

    return JSON.stringify(res)

}

export async function destroyVehicle(id: string) {

    const res = await api('DELETE', `/veiculos/${id}`)

    if (!res.error) {
        revalidatePath('/admin/veiculos')
    }

    return JSON.stringify(res)

}
