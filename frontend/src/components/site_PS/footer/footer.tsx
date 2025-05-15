'use client'

import style from './style.module.css'
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";



export default function Footer(){
    return(
        <footer className={style.footer}>
            <div className={style.footer_content}>
                <div className={style.contacts}>
                    <h2>A melhor revendedora automotiva da região sudeste do Brasil</h2>
                    <p>Descubra os veiculos mais rapidos do mundo</p>
                    <div className={style.social_media}>
                        <a target='_blank' href="https://www.instagram.com/matheusrdgs7/" className={style.social_link} id='instagram'>
                            <FaInstagram />
                        </a>
                        <a target='_blank' href="https://www.instagram.com/matheusrdgs7/" className={style.social_link} id='facebook'>
                            <FaFacebook />
                        </a>
                        <a target='_blank' href="https://www.instagram.com/matheusrdgs7/" className={style.social_link} id='linkedin'>
                            <FaLinkedin />
                        </a>                    
                    </div>
                </div>

                <ul className={style.list}>
                    <li><h3>Nossas lojas</h3></li>
                    <li><a href='#' className={style.sobre_link}> Matriz</a></li>
                    <li><a href='#' className={style.sobre_link}> Pampulha</a></li>
                </ul> 
                <ul className={style.list}>
                    <li><h3>Parcerias</h3></li>
                    <li><a href='#' className={style.sobre_link}> Gordo Autopeças</a></li>
                    <li><a href='#' className={style.sobre_link}> Borracharia do Tião</a></li>
                </ul>
            </div>   
            <div className={style.copyright}>2025, Feito por Matheus Rodrigues Pinto</div>    
        </footer>
    )
}