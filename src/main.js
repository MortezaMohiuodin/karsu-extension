import {useAppStore} from './store/app'
// import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
// Plugins
import { registerPlugins } from './plugins'

const app = createApp(App)

registerPlugins(app)

app.mount('body')

// To begin, access the app store to retrieve user information, including permissions, products, and plugins.


useAppStore()

export default app


