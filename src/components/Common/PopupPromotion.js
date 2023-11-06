"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

function PopupPromotion({lang}) {
  const [show,setShow] = useState(true)
  return (
    <div>
      {show && <div className="fixed w-full h-full z-[199]" style={{background: 'rgba(0,0,0,0.65)'}} onClick={() => setShow(false)}>
        <div className="w-[75%] h-[85vh] z-[200] absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2">
          <Image src="https://viva-cms-en.okhub.tech/wp-content/uploads/2023/11/Campi-di-riso-terrazzati-sotto-la-luce-solare-Vietnam-1.jpg" width={500} height={500} className="object-cover w-full h-full rounded-[2vw]" alt="img"/>
          <Link href={`/${lang}/hot-deals`} className="absolute top-[2vw] left-[2vw] text-[1.5vw] text-white">Promotion</Link>
        </div>
      </div>}
    </div>
  )
}

export default PopupPromotion