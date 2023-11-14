import { GET_TOUR_DETAIL_HEADER } from '@/graphql/tourDetail/queries'
import fetchPonyfill from 'fetch-ponyfill'

export default async function getTourDetailHeader(lang, usePonyfill = true) {
  const res = await (usePonyfill ? fetchPonyfill() : { fetch }).fetch(process.env.NEXT_PUBLIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: GET_TOUR_DETAIL_HEADER,
      variables: { language: lang?.toUpperCase() }
    }),
    next: { revalidate: 60 }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
