'use client'

import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import { getSession } from 'next-auth/react'
import { useToast } from '@/components/use-toast'
import { categoryType } from '@/types/category'
import { api } from '@/services/api'
interface navBarProps {
  logo: string
  onCategoryChange: (categoria: string) => void 
}

export default function Navbar({ logo, onCategoryChange }: navBarProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [showDropdown, setShowDropdown] = useState<boolean>(false)
  const [categorias, setCategorias] = useState<categoryType[]>([])
  const filterItems = (categoria: string) => {
    onCategoryChange(categoria) 
    setShowDropdown(false)
  }
  const { toast } = useToast()

  useEffect(() => {
    const requestDataSession = async () => {
      const sessionResponse = await getSession()
      if (sessionResponse) {
        setIsAuth(!!sessionResponse.user)
      } else {
        toast({
          title: 'Você não está logado'
        })
      }
    }

    const requestData = async () => {
      const { response } = await api<categoryType[]>('GET', `/categorias`)
      if (response) {
        setCategorias(response)
      } else {
        toast({ title: 'Erro ao carregar categorias' })
      }
    }

    requestDataSession()
    requestData()
  }, [toast])

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')

  return (
    <nav className={style.navbar}>
      <div className={style.navbar_nav}>
        <a href="" className={style.linkLogo}>
          <img className={style.logo} src={logo} alt="Logo site" />
        </a>
        <ul className={style.nav_links}>
          <li className={style.nav_itens}>
            <a href="">Inicio</a>
          </li>

          <li className={style.nav_itens}>
            <a href="">Veiculos</a>
          </li>

          <li
            className={style.nav_itens}
            style={{ position: 'relative' }}
            onClick={toggleDropdown}
          >
            <span className={style.dropdownCaixa}>Categorias ▾</span>
            <ul
              className={`${style.optionsMenu} ${
                showDropdown ? style.show : ''
              }`}
            >
              <li onClick={() => filterItems('all')}>Todos</li>
              {categorias.map((categoria) => (
                <li
                  key={categoria.id}
                  onClick={() => filterItems(normalize(categoria.name))}
                >
                  {categoria.name}
                </li>
              ))}
            </ul>
          </li>

          <li className={style.nav_itens}>
            <a href="/admin" className={style.icon_button}>
              {isAuth ? 'Logado' : 'Logar'}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}
