import VueRouter from 'vue-router'

import SignUp from '@c/SignUp'
import LogIn from '@c/LogIn'

import Account from '@c/Account'
import Profile from '@c/account/Profile'
import OrderHistory from '@c/account/OrderHistory'

import Quiz from '@c/Quiz'

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
    path: '/booking/:id',
    name: 'Booking',
    component: Quiz,
  }
]

export default new VueRouter({
  base: 'booking/index.html',
  // mode: 'history',
  routes,
})
