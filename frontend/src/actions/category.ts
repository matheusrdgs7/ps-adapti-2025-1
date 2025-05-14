'use server'

import { api } from '@/services/api'
import { revalidatePath } from 'next/cache'

export async function createCategory(form: FormData) {

    const res = await api('POST', '/categorias', { data: form })

    if (!res.error) {
        revalidatePath('/admin/categorias')
    }

    return JSON.stringify(res)
}

export async function updateCategory(form: FormData) {
    const res = await api('POST', `/categorias/${form.get('id')}`, {
        data: form
    })

    if (!res.error) {
        revalidatePath('/admin/categorias')
    }

    return JSON.stringify(res)
}

export async function destroyCategory(id: string) {
    const res = await api('DELETE', `/categorias/${id}`)

    if (!res.error) {
        revalidatePath('/admin/categorias')
    }

    return JSON.stringify(res)
}
