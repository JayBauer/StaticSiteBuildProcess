import gql from 'graphql-tag'

export const LOGIN = gql `
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`

export const SIGNUP = gql `
  mutation Signup(
    $email: String!,
    $password: String!,
    $firstName: String!,
    $lastName: String!,
    $phone: String!,
    $address1: String!,
    $address2: String!,
    $city: String!,
    $province: String!,
    $postal: String!
  ) {
    signup (
      email: $email,
      password: $password,
      isAdmin: true,
      firstName: $firstName,
      lastName: $lastName,
      phone: $phone,
      address1: $address1,
      address2: $address2,
      city: $city,
      province: $province,
      postal: $postal
    ) {
      token
      user {
        id
      }
    }
  }
`

export const UPDATE_USER = gql `
  mutation UpdateUser(
    $id:ID!,
    $firstName: String,
    $lastName: String,
    $phone: String,
    $email: String!,
    $address1: String,
    $address2: String,
    $city: String,
    $province: String,
    $postal: String
  ) {
    updateUser(
      id:$id,
      firstName:$firstName,
      lastName:$lastName,
      phone:$phone,
      email:$email,
      address1:$address1,
      address2:$address2,
      city:$city,
      province:$province,
      postal:$postal
    ) {
      id
      firstName
      lastName
      phone
      email
      address1
      address2
      city
      province
      postal
    }
  }
`

export const UPDATE_PASSWORD = gql `
  mutation UpdatePassword(
    $id:ID!,
    $password:String!
  ) {
    updatePassword(
      id:$id,
      password:$password
    ) {
      id
      password
    }
  }
`

// export const UPLOAD = gql `
//
// `

export const SAVE_QUIZ = gql `
mutation UpsertQuiz(
  $id: ID!,
  $user: ID!,
  $bookingFor: Booking!,
  $ontarioRes: IsResident!,
  $bodyParts: Json!,
  $waiver: WaiverCreateInput!,
  $referral: ReferralCreateInput!,
  $payment: Boolean!
) {
  saveQuiz(
    id:$id
    user:$user
    bookingFor:$bookingFor
    ontarioRes:$ontarioRes
    bodyParts:$bodyParts
    waiver:$waiver
    referral:$referral
    payment:$payment
  ) {
    id
    bookingFor
    ontarioRes
    bodyParts
    waiver {
      firstName
      lastName
      date
      agree
    }
    referral {
      maple
      upload
    }
    payment
  }
}
`
export const SAVE_CUSTOMER = gql `
  mutation NewCustomer(
    $source:String!,
    $email:String!
  ) {
    saveCustomer(
      source:$source
      email:$email
    ) {
      stripeId
    }
  }
`

// export const PAYMENT = gql `
//   mutation NewPayment(
//     customer:
//   ) {
//     newPayment(
//
//     ) {
//
//     }
//   }
// `
