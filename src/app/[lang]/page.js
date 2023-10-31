import Home from '../../pageComponent/Home'
import getDataPage, { idEn, idFr, idIt } from '@/data/getDataPage'
import getDataPost from '@/data/getDataPost'
import { getMeta } from '@/data/metaData/getMeta'
import getMetaDataPages from '@/data/metaData/getMetaDataPages'
import {
  DATA_TAXONOMIES_BUDGET,
  DATA_TAXONOMIES_COUNTRY,
  DATA_TAXONOMIES_DURATION,
  DATA_TAXONOMIES_TOUR_STYLE
} from '@/graphql/filter/queries'
import { GET_HOME_PAGE, GET_META_DATA, GET_NEXT_STEP, GET_DATA_iNSEPECT, GET_INITIAL_FILTER } from '@/graphql/home/queries'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import getDataFormBookTour from '@/data/formBookTour/getDataFormBookTour'

const idEnBook = 'cG9zdDoxNDIy'
const idFrBook = 'cG9zdDoxNDIy'
const idItBook = 'cG9zdDoxNDIy'

export async function generateMetadata({ params: { lang } }) {
  const res = await getMetaDataPages(GET_META_DATA, lang)

  const { home } = res?.data?.page?.translation
  const featuredImage = res?.data?.page?.translation?.featuredImage
  const title = home?.meta?.title
  const excerpt = home?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}
export default async function page({ params: { lang } }) {
  let data
  let dataBookTour
  if (lang === 'en') {
    data = await getDataPage(idEn, GET_HOME_PAGE)
    dataBookTour = await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idEnBook, lang)
  }
  if (lang === 'it') {
    data = await getDataPage(idIt, GET_HOME_PAGE)
    dataBookTour = await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idItBook, lang)
  }
  if (lang === 'fr') {
    data = await getDataPage(idFr, GET_HOME_PAGE)
    dataBookTour = await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idFrBook, lang)
  }
  const dataInit = await getDataPost(lang?.toUpperCase(), GET_INITIAL_FILTER)

  const metaDestination = dataInit?.data?.allDestination?.nodes
  const metaCategories = dataInit?.data?.categories?.nodes

  const arrayDesInit = []
  const arrayCateInit = []

  metaDestination?.map((des, index) => {
    arrayDesInit.push(des?.slug)
  })
  metaCategories.map((cate, index) => {
    arrayCateInit.push(cate?.slug)
  })

  const nextStep = await getDataPost(lang, GET_NEXT_STEP)
  const dataTaxonomiesCountry = await getDataPost(lang, DATA_TAXONOMIES_COUNTRY)
  const dataTaxonomiesStyleTour = await getDataPost(lang, DATA_TAXONOMIES_TOUR_STYLE)
  const dataTaxonomiesBudget = await getDataPost(lang, DATA_TAXONOMIES_BUDGET)
  const dataTaxonomiesDuration = await getDataPost(lang, DATA_TAXONOMIES_DURATION)
  return (
    <main>
      <Home
        nextStep={nextStep}
        lang={lang}
        data={data}
        dataTaxonomiesCountry={dataTaxonomiesCountry}
        dataTaxonomiesStyleTour={dataTaxonomiesStyleTour}
        dataTaxonomiesBudget={dataTaxonomiesBudget}
        dataTaxonomiesDuration={dataTaxonomiesDuration}
        dataBookTour={dataBookTour}
        arrayDesInit={arrayDesInit}
        arrayCateInit={arrayCateInit}
      />
    </main>
  )
}
