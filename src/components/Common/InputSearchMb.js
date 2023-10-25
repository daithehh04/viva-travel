'use client'
import Image from 'next/image'

import searchIcon from '@/assets/images/search-mb.svg'
import imgInput from '@/assets/images/img-input-h.svg'
import arrIcon from '@/assets/images/right-arr.svg'
import HomeSearch from '../Menu/HomeSearch'
import { useRef } from 'react'
import { useData } from '../Menu/DataContextMenu'
import { DATA_SEARCH_TEXT_TOUR } from '@/graphql/filter/queries'
import { useQuery } from '@apollo/client'

import Link from 'next/link'
import FilterBanner from '@/pageComponent/Home/FilterBanner'
import Loading from './Loading'

function InputSearchMb({lang, dataFilter,onCloseNav}) {
  const { dataInput } = useData();
  const refMenu = useRef()
  const handleOpen = (e) => {
    e.preventDefault()
    refMenu.current.classList.add('show')
    onCloseNav()
  }
  const handleClose = () => {
    refMenu.current.classList.remove('show')
  }
  const { data, loading } = useQuery(DATA_SEARCH_TEXT_TOUR, {
    variables: {
      title: dataInput,
      language: lang?.toUpperCase()
    }
  })
  const allTours = data?.allTours?.nodes
  let noResult = 'No result for this search !!'
  if(lang === 'fr') {
    noResult = 'Aucun résultat pour cette recherche !!'
  }
  if(lang === 'it') {
    noResult ='Nessun risultato per questa ricerca!!'
  }
  return (
    <div className='ml-[3.73vw] mr-[5.33vw] relative'>
      <div className='input-search__mobile w-full h-[9.3vw]' onClick={handleOpen}></div>
      <div
        className='fixed inset-0 bg-white home-search__mb !z-[200] overflow-hidden w-full'
        ref={refMenu}
      >
        <HomeSearch
          onClose={handleClose}
          lang={lang}
        />
        <div className='mt-[6.4vw]'>
          {loading ? (
            <div className='flex items-center justify-center w-full'>
              <Loading />
            </div>
          ) : (
            <div className='flex flex-col gap-[3.2vw] max-h-[54.4vw] overflow-y-auto content'>
              {allTours?.length === 0 ? (
                <h4 className='text-[3.2vw]'>{noResult}</h4>
              ) : (
                allTours?.map((tour, index) => (
                  <Link
                    onClick={handleClose}
                    href={`/${lang}/tours/${encodeURIComponent(tour?.translation?.slug)}`}
                    key={index}
                  >
                    <h3 className='text-[3.2vw] pb-[3.2vw]'>{tour?.translation?.tourDetail?.banner?.title}</h3>
                    <hr />
                  </Link>
                ))
              )}
            </div>
          )}
          <div className='mt-[6.4vw]'>
            <FilterBanner
              dataFilter={dataFilter}
              lang={lang}
              onClose={handleClose}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputSearchMb
