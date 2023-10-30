import imgAction1 from '@/assets/images/Destination_Action1.svg'
import imgAction2 from '@/assets/images/Ourtour_Action2.svg'
import imgAction3 from '@/assets/images/Ourtour_Action3.svg'
import imgAction4 from '@/assets/images/Ourtour_Action4.svg'
import imgAction5 from '@/assets/images/Ourtour_Action5.svg'
import imgAction6 from '@/assets/images/Ourtour_Action6.svg'

import ListAction from './ListAction'
function SectionActions({ listActions }) {
  return (
    <div className='md:px-[10.25vw] justify-between px-[8vw] md:rounded-[0] rounded-[4.27vw] md:mt-[4vw] relative md:top-0 top-[-5vw] bg-white md:pt-[0] pt-[16.53vw] md:pb-[0] pb-[15vw] grid max-md:grid-cols-3 max-md:gap-y-[6.53vw] max-md:gap-x-[14.93vw] grid-cols-6 gap-[7.38vw] md:grid-rows-1'>
      {listActions?.map((action, index) => (
        <ListAction
          key={index}
          icon={action?.img?.sourceUrl}
          title={action?.name}
          desc={action?.desc}
        />
      ))}
    </div>
  )
}

export default SectionActions
