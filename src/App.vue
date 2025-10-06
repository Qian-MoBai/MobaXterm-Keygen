<script setup lang="ts">
import { generateLicense, LicenseType } from '@/api/MobaXtermGenerater'
import JSZip from 'jszip'
import { ref, computed } from 'vue'
import { saveAs } from 'file-saver'
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'

const { t: $t, locale } = useI18n()

const language = ref('zh_CN');
type optionsType = {
  label: string
  value: number
}

const options = computed((): optionsType[] => [
  {
    label: $t('options.persional'),
    value: LicenseType.Persional,
  },
  {
    label: $t('options.professional'),
    value: LicenseType.Professional,
  },
  {
    label: $t('options.educational'),
    value: LicenseType.Educational,
  },
])

const formRef = ref()

const form = ref({
  type: null,
  userName: '',
  version: '',
  count: '',
})
const rules = computed(() => ({
  type: { required: true, message: $t('rules.type') },
  userName: { required: true, message: $t('rules.userName') },
  version: { required: true, message: $t('rules.version') },
  count: { required: true, message: $t('rules.count') },
}))
/** 生成许可证 */
const submitForm = async () => {
  try {
    await formRef.value.validate()
    const data = form.value
    const temp = data.version.split('.')
    const majorVersion = Number(temp[0])
    const minorVersion = Number(temp[1])
    const license = generateLicense(
      data.type!,
      Number(data.count),
      data.userName,
      majorVersion,
      minorVersion,
    )
    generateLicenseFile(license)
  } catch (error) {
    ElMessage.error($t('message.formError'))
  }
}
const generateLicenseFile = async (license: string) => {
  const zip = new JSZip()
  zip.file('Pro.key', license)
  try {
    const content = await zip.generateAsync({ type: 'blob' })
    saveAs(content, 'Custom.mxtpro')
    ElMessage.success($t('message.success'))
  } catch (error) {
    ElMessage.error($t('message.error'))
    console.log(error);
  }
}
const changeLanguage = (language: string) => {
  locale.value = language
}
</script>

<template>
  <el-container class="container-box">
    <el-switch v-model="language" active-text="简体中文" active-value="zh_CN" inactive-text="English" inactive-value="en_US"
      @change="changeLanguage(language)" />
    <el-header>
      <h1>{{ $t('title') }}</h1>
    </el-header>
    <el-main>
      <el-form ref="formRef" class="form" :rules="rules" :model="form" label-width="auto" label-suffix=":">
        <el-form-item :label="$t('label.type')" prop="type">
          <el-cascader :options="options" v-model="form.type" :placeholder="$t('input.type')" />
        </el-form-item>
        <el-form-item :label="$t('label.username')" prop="userName">
          <el-input type="input" v-model="form.userName" :placeholder="$t('input.username')" clearable />
        </el-form-item>
        <el-form-item :label="$t('label.version')" prop="version">
          <el-input type="input" v-model="form.version" :placeholder="$t('input.version')" clearable />
        </el-form-item>
        <el-form-item :label="$t('label.count')" prop="count">
          <el-input type="input" v-model="form.count" :placeholder="$t('input.count')" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @Click="submitForm">{{ $t('label.button') }}</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <el-footer class="footer">
      <el-link href="https://github.com/flygon2018/MobaXterm-keygen">{{ $t('footer.origin') }}</el-link>
      <el-link href="https://stuk.github.io/jszip">JSZip</el-link>
      <el-link href="https://github.com/eligrey/FileSaver.js">FileSaver</el-link>
    </el-footer>
  </el-container>
</template>

<style scoped>
.container-box,
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

:deep(.el-form-item__content) {
  flex-direction: column;
}
</style>
