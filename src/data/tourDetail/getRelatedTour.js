import { GET_RELATED_TOUR } from '@/graphql/tourDetail/queries'
import fetchPonyfill from 'fetch-ponyfill'

export default async function getRelatedTour(taxonomyValue, taxonomyName, lang, usePonyfill = true) {
  const res = await (usePonyfill ? fetchPonyfill() : { fetch }).fetch(process.env.NEXT_PUBLIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: GET_RELATED_TOUR,
      variables: { taxonomyValue: taxonomyValue, taxonomyName: taxonomyName, language: lang?.toUpperCase() }
    }),
    next: { revalidate: 60 }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
