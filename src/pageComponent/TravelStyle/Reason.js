import Image from 'next/image'

function Reason({ icon, title, desc }) {
  return (
    <div className='bg-[#FFFBE9] rounded-[0.5vw]'>
      <div className='px-[1.8vw] py-[3vw] flex flex-col gap-[0.8vw] justify-center items-center'>
        <Image
          width={100}
          height={100}
          src={icon}
          alt='icon'
          className='md:w-[4.275vw] md:h-[4.275vw] w-[12.63vw] h-[12.63vw] '
        />
        <p className='font-optima text-[1.25vw] text-center max-md:text-[3.73vw] font-semibold leading-[-0.0625vw] uppercase text-[#171717] max-lg:text-[1.6vw]'>
          {title}
        </p>
        <p className='text-center font-sans text-[1vw] max-md:text-[3.2vw] leading-[150%] opacity-[0.8] md:w-[12.3vw] w-[35.73vw] max-lg:text-[1.2vw]'>
          {desc}
        </p>
      </div>
    </div>
  )
}

export default Reason
