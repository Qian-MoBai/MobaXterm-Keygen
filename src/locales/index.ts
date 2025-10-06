import { createI18n } from 'vue-i18n'
import en_US from '@/locales/language/en_US'
import zh_CN from '@/locales/language/zh_CN'
const i18n = createI18n({
  legacy: false,
  locale: 'zh_CN',
  messages: {
    en_US,
    zh_CN,
  },
  globalInjection: true,
})
export default i18n
