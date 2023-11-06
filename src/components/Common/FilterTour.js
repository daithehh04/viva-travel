'use client'
import locationIcon from '@/assets/images/route-square-gr.svg'
import styleIcon from '@/assets/images/style-travel.svg'
import calendar from '@/assets/images/calendarFilter.svg'
import wallet from '@/assets/images/wallet.svg'
import Image from 'next/image'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useState } from 'react'
function FilterTour({
  onSelectDes,
  dataFilter,
  onSelectStyle,
  onSelectBudget,
  onSelectDuration,
  travelStyleSlug,
  className,
  lang
}) {
  const [destination, setDestination] = useState('')
  const [travelStyle, setTravelStyle] = useState(travelStyleSlug || '')
  const [duration, setDuration] = useState('')
  const [budget, setBudget] = useState('')

  const handleSort = (fn) => {
    fn?.sort(function(a, b) {
      var numA = parseInt(a?.name.split('-')[0]);
      var numB = parseInt(b?.name.split('-')[0]);
      return numA - numB;
    });
  }
  const arrBudget = dataFilter?.budget
  handleSort(arrBudget)

  const arrDuration = dataFilter?.duration
  handleSort(arrDuration)

  const arrCountry = dataFilter?.countries
  arrCountry?.sort(function(a, b) {
    var numA = parseInt(a?.country?.priority);
    var numB = parseInt(b?.country?.priority);
    return numA - numB;
  });

  const arrStyle = dataFilter?.style
  arrStyle?.sort(function(a, b) {
    var numA = parseInt(a?.banner?.travelStyleInfo?.priority);
    var numB = parseInt(b?.banner?.travelStyleInfo?.priority);
    return numA - numB;
  });

  const handleChangeDestination = (event) => {
    setDestination(event.target.value)
    onSelectDes(event.target.value)
  }
  const handleChangeTravelStyle = (event) => {
    setTravelStyle(event.target.value)
    onSelectStyle(event.target.value)
  }
  const handleChangeDuration = (event) => {
    setDuration(event.target.value)
    onSelectDuration(event.target.value)
  }
  const handleChangeBudget = (event) => {
    setBudget(event.target.value)
    onSelectBudget(event.target.value)
  }

  const option = {
    destination: 'Destination',
    budget : 'Budget',
    style: 'Travel Style',
    duration: 'Duration',
    day: 'day',
    price: '$'
  }
  if(lang === 'fr') {
    option.duration = 'Durée'
    option.style ='Style de voyage'
    option.day ='Jours'
    option.price= '€'
  }
  if(lang === 'it') {
    option.style = 'Stile di viaggio'
    option.duration ='Durata'
    option.budget = 'Bilancio'
    option.destination = 'Destinazione'
    option.day ='Jours'
    option.price= '€'
  }

  return (
    <div
      className={`flex max-md:grid max-md:grid-cols-2 max-md:gap-[2.67vw] md:gap-x-[1.87vw] gap-y-[3.2vw] gap-x-[2.67vw] md:flex-nowrap flex-wrap md:justify-normal justify-between ${className}`}
    >
      <div className='flex flex-col justify-center select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full'>
        <div className='bg-mobile md:hidden'></div>
        <div className='flex items-center select-mobile'>
          <Image
            src={locationIcon}
            width={100}
            height={100}
            alt='location'
            className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover'
          />
          <FormControl
            sx={{
              minWidth: '8.75vw',
              '&.MuiFormControl-root': {
                margin: 0
              }
            }}
          >
          <Select
            value={destination}
            onChange={handleChangeDestination}
            displayEmpty
            inputprops={{ 'aria-label': 'Without label' }}
            sx={{
              height: '2.5rem',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none'
              },
              '& .MuiSvgIcon-root': {
                right: 0
              },
              '& .MuiSelect-outlined': {
                padding: 0,
                paddingLeft: '0.62vw'
              }
            }}
          >
            <MenuItem value=''
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 210, 32, 0.7)'
                }
              }}
            >
              <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
              {option.destination}
              </span>
            </MenuItem>
            {arrCountry?.map((item, index) => (
              <MenuItem value={item?.name} key={index}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 210, 32, 0.7)'
                }
              }}
              >
                <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                  {item?.name}
                </span>
              </MenuItem>
            ))}
          </Select>
          </FormControl>
        </div>
      </div>

      <div className='flex flex-col justify-center select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
        <div className='bg-mobile md:hidden'></div>
        <div className='flex items-center select-mobile'>
          <Image
            src={styleIcon}
            width={100}
            height={100}
            alt='style'
            className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover'
          />
          <FormControl
            sx={{
              minWidth: '8.75vw',
              '&.MuiFormControl-root': {
                margin: 0
              }
            }}
          >
            <Select
              value={travelStyle}
              onChange={handleChangeTravelStyle}
              displayEmpty
              inputprops={{ 'aria-label': 'Without label' }}
              className='select-com'
              sx={{
                height: '2.5rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& .MuiSvgIcon-root': {
                  right: 0
                },
                '& .MuiSelect-outlined': {
                  padding: 0,
                  paddingLeft: '0.62vw'
                },
                
              }}
            >
              <MenuItem value=''
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 210, 32, 0.7)'
                  }
                }}
              >
                <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                {option.style}
                </span>
              </MenuItem>
              {arrStyle?.map((item, index) => (
                <MenuItem 
                  value={item?.slug} key={index}
                  className='item-select'
                  sx={{
                    '&.Mui-selected': {
                      backgroundColor: 'rgba(255, 210, 32, 0.7)'
                    }
                  }}
                >
                  <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                    {item?.name}
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className='flex flex-col justify-center select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
        <div className='bg-mobile md:hidden'></div>
        <div className='flex items-center select-mobile'>
          <Image
            src={calendar}
            width={100}
            height={100}
            alt='style'
            className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover'
          />
          <FormControl
            sx={{
              minWidth: '8.75vw',
              '&.MuiFormControl-root': {
                margin: 0
              }
            }}
          >
            <Select
              value={duration}
              onChange={handleChangeDuration}
              displayEmpty
              inputprops={{ 'aria-label': 'Without label' }}
              sx={{
                height: '2.5rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& .MuiSvgIcon-root': {
                  right: 0
                },
                '& .MuiSelect-outlined': {
                  padding: 0,
                  paddingLeft: '0.62vw'
                }
              }}
            >
              <MenuItem value=''
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 210, 32, 0.7)'
                  }
                }}
              >
                <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                {option.duration}
                </span>
              </MenuItem>
              {arrDuration?.map((item, index) => (
                <MenuItem value={item?.name} key={index}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 210, 32, 0.7)'
                  }
                }}
                >
                  <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                    {item?.name} {option.day}
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className='flex flex-col justify-center select md:rounded-0 rounded-[1.06667vw] flex-shrink-0 md:w-auto w-[48vw] max-md:bg-white max-md:w-full pl-0 md:pl-[1.87vw]'>
        <div className='bg-mobile md:hidden'></div>
        <div className='flex items-center select-mobile'>
          <Image
            src={wallet}
            width={100}
            height={100}
            alt='style'
            className='md:w-[1.875vw] md:h-[1.875vw] w-[3.73333vw] h-[3.73333vw] object-cover'
          />
          <FormControl
            sx={{
              minWidth: '8.75vw',
              '&.MuiFormControl-root': {
                margin: 0
              }
            }}
          >
            <Select
              value={budget}
              onChange={handleChangeBudget}
              displayEmpty
              inputprops={{ 'aria-label': 'Without label' }}
              sx={{
                height: '2.5rem',
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& .MuiSvgIcon-root': {
                  right: 0
                },
                '& .MuiSelect-outlined': {
                  padding: 0,
                  paddingLeft: '0.62vw'
                }
              }}
            >
              <MenuItem value=''
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 210, 32, 0.7)'
                  }
                }}
              >
                <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                {option.budget}
                </span>
              </MenuItem>
              {arrBudget?.map((item, index) => (
                <MenuItem value={item?.name} key={index}
                sx={{
                  '&.Mui-selected': {
                    backgroundColor: 'rgba(255, 210, 32, 0.7)'
                  }
                }}
                >
                  <span className='md:text-[1.0625vw] md:font-[500] leading-[130%] text-textColor text-[2.93333vw] font-[400]'>
                    {item?.name}{option.price}
                  </span>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  )
}

export default FilterTour
