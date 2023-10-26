/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
// import { loadFonts } from './webfontloader'
// import vuetify from './vuetify'
import pinia from '../store'
// import router from '../router'
// import i18n from "../i18n/i18n"
import moment from './moment'
// import enums from './enums'

export function registerPlugins (app) {
  // loadFonts()
  app
    // .use(vuetify)
    .use(pinia)
    // .use(router)
    // .use(i18n)
    .use(moment)
    // .use(enums)
}
