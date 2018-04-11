import gql from 'graphql-tag'

export const ME = gql `
  query {
    me {
      id
      email
      password
      first_name
      last_name
      phone
      address1
      address2
      city
      province
      postal
    }
  }
`

export const USER_QUIZZES = gql`
  query UserQuizzes($user: UserWhereUniqueInput!) {
    quizzes(user: $user) {
      id
      booking_for
      body_parts
      waiver {
        agree
      }
    }
  }
`
