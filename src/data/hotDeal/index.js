import { GET_HOT_DEAL_DATA } from '@/graphql/hotDeal/queries'
import fetchPonyfill from 'fetch-ponyfill'

export default async function getHotDealHeader(lang, usePonyfill = true) {
  const res = await (usePonyfill ? fetchPonyfill() : { fetch }).fetch(process.env.NEXT_PUBLIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: GET_HOT_DEAL_DATA,
      variables: { language: lang?.toUpperCase() }
    }),
    next: { revalidate: 60 }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
