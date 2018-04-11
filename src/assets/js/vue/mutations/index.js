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
    $first_name: String!,
    $last_name: String!,
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
      first_name: $first_name,
      last_name: $last_name,
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
    $first_name: String,
    $last_name: String,
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
      first_name:$first_name,
      last_name:$last_name,
      phone:$phone,
      email:$email,
      address1:$address1,
      address2:$address2,
      city:$city,
      province:$province,
      postal:$postal
    ) {
      id
      first_name
      last_name
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

export const SAVE_QUIZ = gql `
  mutation NewQuiz(
    $user:UserCreateOneWithoutQuizzesInput!,
    $booking_for:Booking,
    $ontario_res:Boolean,
    $body_parts:[String!]!,
    $waiver:WaiverCreateInput!,
    $referral:String,
    $payment:Boolean
  ) {
    saveQuiz(
      user:$user
      booking_for:$booking_for
      ontario_res:$ontario_res
      body_parts:$body_parts
      waiver:$waiver
      referral:$referral
      payment:$payment
    ) {
      user {
        id
        email
        first_name
      }
      booking_for
      ontario_res
      body_parts
      waiver {
        agree
        first_name
        last_name
        date
      }
      referral
      payment
    }
  }
`

export const UPDATE_QUIZ = gql `
  mutation UpdateQuiz(
    $id:ID!,
    $booking_for:Booking,
    $ontario_res:Boolean,
    $body_parts:[String!]!,
    $waiver:WaiverCreateInput!,
    $referral:String,
    $payment:Boolean
  ) {
    updateQuiz(
      id:$id
      booking_for:$booking_for
      ontario_res:$ontario_res
      body_parts:$body_parts
      waiver:$waiver
      referral:$referral
      payment:$payment
    ) {
      user {
        id
        email
        first_name
      }
      booking_for
      ontario_res
      body_parts
      waiver {
        agree
        first_name
        last_name
        date
      }
      referral
      payment
    }
  }
`
