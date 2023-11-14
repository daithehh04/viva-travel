import fetchPonyfill from 'fetch-ponyfill'

export default async function getDataFilterTour(data, query, usePonyfill = true) {
  const res = await (usePonyfill ? fetchPonyfill() : { fetch }).fetch(process.env.NEXT_PUBLIC_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: {
        language: data?.lang?.toUpperCase(),
        countrySlug: data?.countrySlug,
        styleTourSlug: data?.styleTourSlug
      }
    }),
    next: { revalidate: 60 }
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}
