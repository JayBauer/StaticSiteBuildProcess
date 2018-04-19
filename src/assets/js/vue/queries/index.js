import gql from 'graphql-tag'

export const ME = gql `
  query {
    me {
      id
      email
      password
      firstName
      lastName
      phone
      address1
      address2
      city
      province
      postal
    }
  }
`

export const USER_QUIZZES = gql `
  query UserQuizzes($user: UserWhereUniqueInput!) {
    quizzes(user: $user) {
      id
      createdAt
      updatedAt
      payment
    }
  }
`

export const GET_QUIZ = gql `
  query Quiz($id: ID!) {
    quiz(id:$id) {
      id
      createdAt
      updatedAt
      bookingFor
      ontarioRes
      bodyParts
      waiver {
        party
        otherParty
        agree
        firstName
        lastName
        date
      }
      referral {
        maple
        upload
      }
      payment
    }
  }
`
