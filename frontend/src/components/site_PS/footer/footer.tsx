'use client'

import style from './style.module.css'
import { FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";



export default function Footer(){
    return(
        <footer className={style.footer}>
            <div className={style.footer_content}>
                <div className={style.contacts}>
                    <h2>Seu site com todos os veiculos do mundo</h2>
                    <p>Descubra os veiculos mais rapidos do mundo</p>
                    <div className={style.social_media}>
                        <a href="www.instagram.com" className={style.social_link} id='instagram'>
                            <FaInstagram />
                        </a>
                        <a href="www.instagram.com" className={style.social_link} id='facebook'>
                            <FaFacebook />
                        </a>
                        <a href="www.instagram.com" className={style.social_link} id='linkedin'>
                            <FaLinkedin />
                        </a>                    
                    </div>
                </div>

                <ul className={style.list}>
                    <li><h3>Nossa empresa</h3></li>
                    <li><a href='#' className={style.sobre_link}> Machine Cast</a></li>
                    <li><a href='#' className={style.sobre_link}> Adapti Soluções Web</a></li>
                </ul> 
                <ul className={style.list}>
                    <li><h3>Parcerias</h3></li>
                    <li><a href='#' className={style.sobre_link}> Spotify</a></li>
                    <li><a href='#' className={style.sobre_link}> UFES</a></li>
                </ul>
            </div>   
            <div className={style.copyright}>2025, Feito para Melissa Costa Ferreira</div>    
        </footer>
    )
}