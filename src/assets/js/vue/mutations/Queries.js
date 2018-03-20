import gql from 'graphql-tag'

export const ME = gql `
  query {
    me {
      email
      name
      posts {
        id
        title
      }
    }
  }
`

export const DRAFTS = gql `
  query {
    drafts {
      id
      title
    }
  }
`

export const FEED = gql `
  query {
    feed {
      id
      title
    }
  }
`
