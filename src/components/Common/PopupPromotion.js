"use client"
import Image from "next/image"
import { useState } from "react"
import closeIcon from "@/assets/images/close.svg"

function PopupPromotion({lang,data}) {
  const [show,setShow] = useState(true)
  const handleCloseImg = (e) => {
    e.stopPropagation();
  }
  return (
    <>
      {show && <div className="fixed w-full h-full z-[199] inset-0" style={{background: 'rgba(0,0,0,0.65)'}} onClick={() => setShow(false)}>
        <div className="max-w-[75rem] w-[65%] max-md:w-[90%] max-h-[50rem] h-[90vh] z-[200] absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2" onClick={handleCloseImg}>
          <Image src={data?.popupPromotion?.thumbPopup?.sourceUrl} width={500} height={500} className="object-cover w-full h-full rounded-[2vw]" alt={data?.popupPromotion?.thumbPopup?.altText || "thumb voucher"}/>
          <Image src={closeIcon} width={50} height={50} alt="icon" className="absolute right-[2vw] top-[2vw] w-[1.8vw] h-[1.8vw] cursor-pointer max-md:w-[4.27vw] max-md:h-[4.27vw]" onClick={() => setShow(false)}/>
        </div>
      </div>}
    </>
  )
}

export default PopupPromotion