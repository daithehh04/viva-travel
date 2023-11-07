import { gql } from '@apollo/client'

export const GET_All_CUSTOMERS_REVIEW = gql`
query GetDataPageReview($language: LanguageCodeEnum!, $offset: Int!, $size: Int!, $yearSlug: [String!], $countrySlug: [String!]) {
  allCustomerReview(
    first: 100,
    where: {offsetPagination: {offset: $offset, size: $size}, orderby: {field: DATE, order: DESC}, taxQuery: {taxArray: [{taxonomy: YEARS, operator: IN, terms: $yearSlug, field: NAME}, {taxonomy: COUNTRIES, operator: IN, terms: $countrySlug, field: SLUG}]}}
  ) {
    nodes {
      translation(language: $language) {
        slug
        customerReview {
          content
          authorInformation {
            name
            country
            thumbnail {
              sourceUrl
            }
          }
          tours {
            ...on Tours {
              title
              slug
              tourDetail {
                banner {
                  gallery {
                    altText
                    title
                    sourceUrl
                  }
                  location
                  title
                }
                numberDay
              }
            }
          }
        }
      }
    }
    pageInfo {
      offsetPagination {
        total
      }
    }
  }
}
`
export const GET_REVIEWS = `query ($language: LanguageCodeEnum!) {
  allCustomerReview(first: 4) {
    nodes {
      translation(language: $language) {
        customerReview {
          authorInformation {
            country
            name
            thumbnail {
              altText
              sourceUrl
            }
          }
          content
        }
      }
    }
  }
}`

export const GET_ALL_REVIEWS = `query GetAllCustomersReview($language: LanguageCodeFilterEnum!) {
  allCustomerReview(where: {language: $language}) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      offsetPagination {
        hasMore
        hasPrevious
        total
      }
    }
    nodes {
      customerReview {
        content
        authorInformation {
          country
          name
          thumbnail {
            altText
            sourceUrl
          }
        }
        tours {
          ... on Tours {
            slug
            tourDetail {
              banner {
                gallery {
                  altText
                  title
                  sourceUrl
                }
                location
                title
              }
              numberDay
            }
            countries {
              nodes {
                slug
              }
            }
          }
        }
      }
    }
  }
}`

export const REVIEW_DETAIl = `
query getReviewDetail($slug: ID!, $language: LanguageCodeEnum!){
  customerReview(id:$slug,idType: URI) {
    translation(language:$language) {
			slug
        customerReview {
          content
          authorInformation {
            name
            country
            thumbnail {
              sourceUrl
            }
          }
          tours {
            ...on Tours {
              title
              slug
              tourDetail {
                banner {
                  gallery {
                    altText
                    title
                    sourceUrl
                  }
                  location
                  title
                }
                numberDay
              }
            }
          }
        }
    }
  }
}
`