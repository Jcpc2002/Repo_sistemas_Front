import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from '../assets/Logo_UFPS_Footer.png'

export const Footer = () => {
    return (
        <footer className='w-full' >
            <div className='bg-gray-800 grid grid-cols-1 m-auto gap-12 p-10 md:grid-cols-4' >
                <div className="flex justify-center items-center">
                    <h1 className="text-white text-center font-bold">
                        REPOSITORIO DIGITAL INGENIERÍA DE SISTEMAS UFPS
                    </h1>
                </div>
                <div className="flex flex-col text-slate-50 text-base">
                    <p>#0- a Avenida Gran Colombia No. 12E-96</p>
                    <p>Colsag</p>
                    <p>Cúcuta, Norte de Santander</p>
                    <p>(057)(7)5776655</p>
                </div>
                <div className="flex flex-col text-slate-50 text-base">
                    <p>Solicitud y correspondencia</p>
                    <p>Unidad de Gestión Documental</p>
                    <p className="text-[#FFC107] bold">ugad@ufps.edu.co</p>
                </div>
                <div className="flex items-center justify-center gap-4 text-4xl text-slate-50 flex-wrap">
                    <a href="https://www.facebook.com/Ufps.edu.co" target='_blank' className="p-2 bg-gray-900 rounded-md hover:text-[#FFC107]"><FaFacebookSquare /></a>
                    <a href="https://twitter.com/UFPSCUCUTA" target='_blank' className="p-2 bg-gray-900 rounded-md hover:text-[#FFC107]"><FaSquareXTwitter /></a>
                    <a href="https://www.instagram.com/ufpscucuta/" target='_blank' className="p-2 bg-gray-900 rounded-md hover:text-[#FFC107]"><FaInstagram /></a>
                    <a href="https://www.youtube.com/channel/UCgPz-qqaAk4lbHfr0XH3k2g" target='_blank' className="p-2 bg-gray-900 rounded-md hover:text-[#FFC107]"><FaYoutube /></a>
                </div>
            </div>

            <div className="bg-gray-950 text-slate-50 text-center text-base">
                <small><b>2024</b> - Page Created by; JuanSerrano, SteveenSayago & JuanPatiño</small>
            </div>
        </footer>
    )
}

