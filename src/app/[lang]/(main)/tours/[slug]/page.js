import getDataPost from '@/data/getDataPost'
import { getMeta } from '@/data/metaData/getMeta'
import getMetaDataTour from '@/data/metaData/getMetaData'
import getRandomTour from '@/data/tourDetail/getRandomTour'
import getRelatedTour from '@/data/tourDetail/getRelatedTour'
import getTourDetail from '@/data/tourDetail/getTourDetail'
import getTourDetailHeader from '@/data/tourDetail/getTourDetailHeader'
import { GET_ALL_REVIEWS } from '@/graphql/customersReview/queries'
import { GET_TOUR_META_DATA } from '@/graphql/metaData/queries'
import { GET_RANDOM_TOUR, GET_TOUR_DETAIL } from '@/graphql/tourDetail/queries'
import TourDetail from '@/pageComponent/TourDetail'
import getDataFormBookTour from '@/data/formBookTour/getDataFormBookTour'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
import NotFound from '@/components/Common/NotFound'

export async function generateMetadata({ params: { slug, lang } }) {
  const res = await getMetaDataTour(GET_TOUR_META_DATA, lang, slug)
  const tourDetail = res?.data?.tours?.translation?.tourDetail
  const featuredImage = res?.data?.tours?.translation?.featuredImage
  const title = tourDetail?.meta?.title
  const excerpt = tourDetail?.meta?.description
  return getMeta(title, excerpt, featuredImage)
}

export default async function page({ params: { lang, slug } }) {
  const idEnBook = 'cG9zdDoxNDIy'
  const idFrBook = 'cG9zdDoxNDIy'
  const idItBook = 'cG9zdDoxNDIy'

  const getBookTour = async () => {
    return lang === 'en'
      ? await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idEnBook, lang)
      : lang === 'it'
        ? await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idItBook, lang)
        : await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idFrBook, lang)
  }

  const [headerData, result, res, result4, dataBookTour] = await Promise.all([
    getTourDetailHeader(lang),
    getTourDetail(GET_TOUR_DETAIL, slug, lang),
    getRandomTour(GET_RANDOM_TOUR, lang),
    getDataPost(lang, GET_ALL_REVIEWS),
    getBookTour()
  ])

  const styleTourArr = result?.data?.tours?.translation?.tourStyle?.nodes
  const countriesTourArr = result?.data?.tours?.translation?.countries?.nodes
  const tourDetailData = result?.data?.tours?.translation?.tourDetail || {}
  const tourId = result?.data?.tours?.translation?.id
  const tourContent = result?.data?.tours?.translation?.content
  const country = result?.data?.tours?.translation?.countries?.nodes[0]?.slug
  const reviewsList = result4?.data?.allCustomerReview?.nodes
  const randomTour = res?.data?.allTours?.nodes.filter((item, index) => item?.translation?.id !== tourId)

  const result2 = await getRelatedTour(country, 'COUNTRIES', lang)
  const relatedTours = result2?.data?.allTours?.nodes?.filter((item) => item?.translation?.id !== tourId)
  if (!tourId) {
    return <NotFound lang={lang} />
  }
  return (
    <TourDetail
      data={tourDetailData}
      tourContent={tourContent}
      headerData={headerData?.data?.page?.translation?.tourDetailHeading}
      relatedTours={!relatedTours || relatedTours?.length === 0 ? randomTour : relatedTours}
      tourId={tourId}
      reviewsList={reviewsList}
      lang={lang}
      dataBookTour={dataBookTour}
      slug={slug}
      styleTourArr={styleTourArr}
      countriesTourArr={countriesTourArr}
    />
  )
}
