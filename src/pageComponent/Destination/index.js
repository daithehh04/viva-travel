import Banner from './Banner'
import SlideDestination from './SlideDestination'
import SectionActions from './SectionActions'
import CustomerReview from './CustomerReview'
import OurBlog from './OurBlog'
import FilterPopup from './FilterPopup'
import {
  DATA_COUNTRY,
  DATA_SLIDE_OTHER_TOUR,
  GET_DATA_BEST_SELLER_OURTOUR
} from '@/graphql/country/queries'
import getDataWithTaxonomy from '@/data/getDataWithTaxonomy'
import getDataPost from '@/data/getDataPost'
import {
  DATA_TAXONOMIES_BUDGET,
  DATA_TAXONOMIES_COUNTRY,
  DATA_TAXONOMIES_DURATION,
  DATA_TAXONOMIES_TOUR_STYLE
} from '@/graphql/filter/queries'
import { GET_ALL_REVIEWS } from '@/graphql/customersReview/queries'
import NotFound from '@/components/Common/NotFound'
import { DATA_ICONS_COUNTRY } from '@/graphql/country/queries'
import getDataDetail from '@/data/getDataDetail'
async function index({ lang, slug }) {
  const dataCountry = await getDataWithTaxonomy(
    {
      taxonomyValue: slug,
      lang: lang?.toUpperCase()
    },
    DATA_COUNTRY
  )

  const dataIcons = await getDataDetail(lang?.toUpperCase(),
    "cG9zdDozMDQ1", DATA_ICONS_COUNTRY
  )
  
  const dataOtherTypeTrip = await getDataWithTaxonomy(
    {
      taxonomyValue: slug,
      taxonomyName: 'COUNTRIES',
      lang: lang
    },
    DATA_SLIDE_OTHER_TOUR
  )
  const dataOtherTypeTripNotNull = dataOtherTypeTrip?.data?.allTours?.nodes.filter(item => {
    return item?.translation !== null && item?.translation?.slug !== null
  })
  //get all reviews
  const res = await getDataPost(lang, GET_ALL_REVIEWS)
  const reviewsList = res?.data?.allCustomerReview?.nodes

  const dataReviews = reviewsList?.filter((item) =>
    item?.translation?.customerReview?.tours?.countries?.nodes?.some((subItem) => subItem?.slug === slug)
  )
  // const dataBestSeller = await getDataPost(lang, GET_DATA_BEST_SELLER_OURTOUR)
  const dataBestSeller = await getDataWithTaxonomy(
    {
      taxonomyValue: slug,
      taxonomyName: 'COUNTRIES',
      lang: lang
    },
    GET_DATA_BEST_SELLER_OURTOUR
  )

  const dataBestSellerNoNull = dataBestSeller?.data?.allTours?.nodes?.filter(item => {
    return item?.translation !== null && item?.translation?.slug !== null
  })
  
  const data = dataCountry?.data?.countries?.translation
  // ==== Get name filter ====
  const dataTaxonomiesStyleTour = await getDataPost(lang, DATA_TAXONOMIES_TOUR_STYLE)
  const dataTaxonomiesBudget = await getDataPost(lang, DATA_TAXONOMIES_BUDGET)
  const dataTaxonomiesDuration = await getDataPost(lang, DATA_TAXONOMIES_DURATION)
  const dataTaxonomiesCountry = await getDataPost(lang, DATA_TAXONOMIES_COUNTRY)
  const arrDataTaxonomiesBudget = dataTaxonomiesBudget?.data?.allBudget?.nodes
  const arrDataTaxonomiesDuration = dataTaxonomiesDuration?.data?.allDuration?.nodes
  const arrDataTaxonomiesStyleTour = dataTaxonomiesStyleTour?.data?.allTourStyle?.nodes
  const arrDataTaxonomiesCountry = dataTaxonomiesCountry?.data?.allCountries?.nodes
  function handleTaxonomies(data) {
    const newArrDataTaxonomies = []
    data?.map((item) => {
      newArrDataTaxonomies.push(item)
    })
    return newArrDataTaxonomies
  }
  const newArrDataTaxonomiesStyleTravel = handleTaxonomies(arrDataTaxonomiesStyleTour)
  const newArrDataTaxonomiesBudget = handleTaxonomies(arrDataTaxonomiesBudget)
  const newArrDataTaxonomiesDuration = handleTaxonomies(arrDataTaxonomiesDuration)
  const newArrDataTaxonomiesCountry = handleTaxonomies(arrDataTaxonomiesCountry)
  const dataFilter = {
    style: newArrDataTaxonomiesStyleTravel,
    budget: newArrDataTaxonomiesBudget,
    duration: newArrDataTaxonomiesDuration,
    country: newArrDataTaxonomiesCountry
  }

  if (!data) {
    return <NotFound lang={lang} />
  }
  return (
    <div>
      <Banner
        data={data?.country?.banner}
        slug={slug}
        dataFilter={dataFilter}
        lang={lang}
      />
      <FilterPopup
        dataFilter={dataFilter}
        slug={slug}
        lang={lang}
      />
      <SectionActions listActions={dataIcons?.data?.page?.translation} infoCountry={data?.country?.info}/>
      <SlideDestination
        // data={dataOtherTrip?.data?.allTours?.nodes}
        data={dataBestSellerNoNull}
        dataOtherType={dataOtherTypeTripNotNull}
        dataTitle={data}
        lang={lang}
      />
      <CustomerReview
        data={dataReviews?.slice(0,4)}
        dataInfo={data?.ourTour}
        lang={lang}
      />
      <OurBlog
        data={data}
        lang={lang}
      />
    </div>
  )
}

export default index
