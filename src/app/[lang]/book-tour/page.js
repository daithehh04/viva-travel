import BookTour from '@/components/Common/BookTour'

import getDataFormBookTour from '@/data/formBookTour/getDataFormBookTour'
import getDataPost from '@/data/getDataPost'
import { COUNTRY_FROM } from '@/graphql/checkVisa/queries'
import { GET_DATA_FORM_BOOKTOUR } from '@/graphql/formBookTour/queries'
async function page({ params: { lang } }) {
  const idEn = 'cG9zdDoxNDIy'
  const idFr = 'cG9zdDoxODQ1'
  const idIt = 'cG9zdDoxODQz'
  let data
  if (lang === 'en') {
    data = await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idEn, lang)
  }
  if (lang === 'it') {
    data = await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idIt, lang)
  }
  if (lang === 'fr') {
    data = await getDataFormBookTour(GET_DATA_FORM_BOOKTOUR, idFr, lang)
  }
  const dataCountryFrom = await getDataPost(lang, COUNTRY_FROM)
  const arrCountryFrom = handleTaxonomies(dataCountryFrom?.data?.allFromCountry?.nodes)
  const handleFilter = (fn) => {
    fn?.sort(function(a, b) {
      var numA = parseInt(a?.description) || 100;
      var numB = parseInt(b?.description) || 100;
      return numA - numB;
    });
  }
  handleFilter(arrCountryFrom)
  return <BookTour data={data} lang={lang} listArrCountryFrom={arrCountryFrom}/>
}

export default page
