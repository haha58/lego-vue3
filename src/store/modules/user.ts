import { Module } from 'vuex'
import { GloabalDataProps } from '..'
import { LOGIN, LOGOUT } from '../mutation-type'

export interface UserProps {
  isLogin: boolean
  userName?: string
}

// 两个参数 第一个本地的interface，第二个是全局的interface
const user: Module<UserProps, GloabalDataProps> = {
  mutations: {
    [LOGIN](state) {
      state.isLogin = true
      state.userName = 'hahaya'
    },
    [LOGOUT](state) {
      state.isLogin = false
    }
  }
}

export default user
