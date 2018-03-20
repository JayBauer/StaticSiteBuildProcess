import gql from 'graphql-tag'

export const SIGNUP = gql `
  mutation SignupUser($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      user {
        email
        name
      }
    }
  }
`

export const LOGIN = gql `
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        name
      }
    }
  }
`

export const NEW_POST = gql `
  mutation CreateNewDraft($title: String!, $text: String!) {
    createDraft(title: $title, text: $text) {
      id
      title
      text
    }
  }
`

export const PUBLISH_POST = gql `
  mutation PublishDraft($id:ID!) {
    publish(id:$id) {
      title
      text
    }
  }
`

export const DELETE_POST = gql `
  mutation DeletePost($id:ID!) {
    deletePost(id:$id) {
      title
    }
  }
`
