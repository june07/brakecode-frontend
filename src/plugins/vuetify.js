/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
// import 'vuetify/styles';
import '@/settings.scss'

// Composables
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

const app = createApp()

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const vuetifyInstance = createVuetify({
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    components: {
        ...components
    },
    directives
})

// ✅ Export as a plugin-style object so it works with `.use(vuetify)`
export default {
    install(app) {
        app.use(vuetifyInstance)
    },
}
