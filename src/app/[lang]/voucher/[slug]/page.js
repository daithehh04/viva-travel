import getHotDealHeader from "@/data/hotDeal"
import getTourDetail from "@/data/tourDetail/getTourDetail"
import { DATA_VOUCHER_DETAIL } from "@/graphql/hotDeal/queries"
import DetailVocher from "@/pageComponent/HotDeal/DetailVoucher"

async function page({ params: { lang, slug } }) {
  const result = await getHotDealHeader(lang)
  const hotDeals = result?.data?.page?.translation?.hotDeals

  const data = await getTourDetail(DATA_VOUCHER_DETAIL,slug,lang)
  const dataVoucher = data?.data?.vouchers?.translation?.voucher
  return (
      <>
        <div className='w-full h-full bg-white overflow-y-auto md:rounded-[16px] overflow-x-hidden'>
          <DetailVocher
            headerData={hotDeals?.voucherHeader?.detailHeader}
            data={dataVoucher}
          />
        </div>
        </>
  )
}

export default page