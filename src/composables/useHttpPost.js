import { ofetch } from 'ofetch'
// import { useStorage } from '@vueuse/core'
import { useAppStore } from '../store/app'
import router from '../router'


// let token = useStorage('token').value
 const useHttpPost = ofetch.create({
  baseURL: '/api',
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Cache-Control': 'no-cache',
  },
  async onRequest({ request, options }) {
    options.headers.Authorization = useAppStore().token
  },
  async onResponse({ request, response, options }) {
    if (response.status === 401 && useAppStore.isLoggedIn === true) {
      useAppStore().resetIdentityData()
      router.push('/login')
    }
  },
})
export default useHttpPost
