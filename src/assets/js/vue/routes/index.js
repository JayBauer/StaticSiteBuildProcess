import VueRouter from 'vue-router'

import SignUp from '@c/SignUp'
import LogIn from '@c/LogIn'

import Account from '@c/Account'
import Profile from '@c/account/Profile'
import OrderHistory from '@c/account/OrderHistory'

import Quiz from '@c/Quiz'
import BookingFor from '@c/quiz/BookingFor'
import Resident from '@c/quiz/Resident'
import BodyParts from '@c/quiz/BodyParts'
import Waiver from '@c/quiz/Waiver'

let routes = [
  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
    children: [
      {
        path: 'orderhistory',
        name: 'OrderHistory',
        component: OrderHistory
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile
      }
    ]
  },
  {
    path: '/booking',
    name: 'Booking',
    component: Quiz,
    children: [
      {
        path: 'booking-for',
        name: 'BookingFor',
        component: BookingFor
      },
      {
        path: 'resident',
        name: 'Resident',
        component: Resident
      },
      {
        path: 'body-parts',
        name: 'BodyParts',
        component: BodyParts
      },
      {
        path: 'waiver',
        name: 'Waiver',
        component: Waiver
      }
    ]
  }
]

export default new VueRouter({
  base: 'booking/index.html',
  // mode: 'history',
  routes,
})
