import getTourDetail from "@/data/tourDetail/getTourDetail"
import { REVIEW_DETAIl } from "@/graphql/customersReview/queries"
import ReviewDetail from "@/pageComponent/ReviewDetail/ReviewDetail"

async function page({ params: { lang, slug } }) {
  const data = await getTourDetail(REVIEW_DETAIl,slug,lang)
  const dataReview = data?.data?.customerReview?.translation
  return (
    <ReviewDetail data={dataReview} lang={lang}/>
  )
}

export default page