import { defineStore , getActivePinia } from 'pinia'
import { toggleTimer , initTimer , timer, loadingTimer } from './timer'
// import { useRouter } from 'vue-router'
import {ref} from 'vue'
import moment from '../plugins/moment'
import {useLocalStorage} from '@vueuse/core'
import useHttpGet from '../composables/useHttpGet'

export const useAppStore = defineStore('karsu', ()=>{
  // const router = useRouter()

  // state
  let token = ref(useLocalStorage('token', ''))
  let userInfo = ref(null)
  let workspace = ref(null)
  let permits = ref([])
  let WID = ref(null)
  let productInTerm = ref(null)
  let activePlugins = ref(null)
  let isAppReady = ref(false)
  let isLoggedIn = ref(false)
  let drawer = ref(true)
  let additionalTime = "00:00:00"
  let isTimerRunning = false
  let isTableFilterVisible = ref(false)
  let historyTabs = ref([])
  let lastItem  = ref(null)
  let showDeactiveUser = ref(null)
  let badges = ref({})
  let messages = ref([])

  // action
  const getUserInfo = async () => {
    try {
      const res = await useHttpGet('/user/get-user-profile')

      userInfo.value = res.Data

      return true
    } catch (err) {
      return false
    }
  }

  const getUserData =async ()=>{
    try {
      const res = await useHttpGet('/public/v2/get-user-dashboard')

      workspace.value = res.Data.Workspace.find(workspace => workspace.IsDefault === true)
      showDeactiveUser.value = workspace.value.ShowDeactiveUser
      WID.value = workspace.value.Id
      permits.value.push(...res.Data.PermissionAndProduct.Permission.flatMap(permitGroup => permitGroup.Permission.map(permit => permit.Value)))
      productInTerm.value = res.Data.PermissionAndProduct.ProductInTerm.map(product => product.Value.toUpperCase())
      activePlugins.value = res.Data.PermissionAndProduct.Plugin.map(plugin => plugin.Value)

      const todayTime = res.Data.IO.filter(day => moment().isDateToday(day.Date))[0]

      badges.value = res.Data.Badge.reduce(function(acc, cur, i) {
        acc[cur.Kay] = cur.Value

        return acc
      }, {})
      messages.value = res.Data.Message
      additionalTime = todayTime.AdditionalInfo.AdditionalTime
      isTimerRunning = todayTime?.AdditionalInfo.IsPlay

      return true
    }catch (err) {
      return false
    }
  }

  const resetIdentityData = ()=>{
    token.value = ''
    userInfo.value = null
    workspace.value = null
    WID.value = null
    permits.value = []
    productInTerm.value = []
    activePlugins.value = []
    isAppReady.value = true
    isLoggedIn.value = false
  }

  const getUserBadges = async ()=>{
    let params = {
      workspaceCode :WID.value,
    }
    try {
      const res = await useHttpGet('public/get-user-badge',{ params })
      let obj = res.Data.reduce(function(acc, cur, i) {
        acc[cur.Kay] = cur.Value

        return acc
      }, {})
      badges.value = obj
      console.log(obj)
    }catch (err) {
      return false
    }
  }

  async function initStore() {
    isLoggedIn.value = await getUserData() && await getUserInfo() && initTimer(additionalTime, isTimerRunning)
    isAppReady.value = true
  }

  const logout =async ()=>{

    await useHttpGet('user/logout')
    resetIdentityData()
    // router.push('/login')
  }


  return {
    // state
    token,
    userInfo,
    workspace,
    WID,
    permits,
    activePlugins,
    productInTerm,
    isAppReady,
    isLoggedIn,
    timer,
    isTableFilterVisible,

    // action
    resetIdentityData,
    initStore,
    drawer,
    toggleTimer,
    loadingTimer,
    historyTabs,
    logout,
    lastItem,
    showDeactiveUser,
    badges,
    messages
  }
})
