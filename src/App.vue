<script setup lang="ts">
import { generateLicense, LicenseType } from '@/api/MobaXtermGenerater'
import { ref, version } from 'vue'

type optionsType = {
    label: string
    value: number
}

const options: optionsType[] = [
    {
        label: 'Persional',
        value: LicenseType.Persional,
    },
    {
        label: 'Professional',
        value: LicenseType.Professional,
    },
    {
        label: 'Educational',
        value: LicenseType.Educational,
    },
]

const formRef = ref()

const form = ref({
    type: null,
    userName: '',
    version: '',
    count: '',
})
const rules = {
    type: { required: true, message: '版本是必要的' },
    userName: { required: true, message: '用户名是必要的' },
    version: { required: true, message: '版本号是必要的' },
    count: { required: true, message: '用户数是必要的' },
}
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
    } catch (error) {
        alert('表单验证失败')
    }
}
</script>

<template>
    <el-container class="container-box">
        <el-header>
            <h1>MobaXterm 生成器</h1>
        </el-header>
        <el-main>
            <el-form ref="formRef" class="form" :rules="rules" :model="form" label-width="auto" label-suffix=":">
                <el-form-item label="版本" prop="type">
                    <el-cascader :options="options" v-model="form.type" placeholder="请选择版本" />
                </el-form-item>
                <el-form-item label="用户名" prop="userName">
                    <el-input type="input" v-model="form.userName" placeholder="请输入用户名" clearable />
                </el-form-item>
                <el-form-item label="版本号" prop="version">
                    <el-input type="input" v-model="form.version" placeholder="请输入版本号" clearable />
                </el-form-item>
                <el-form-item label="用户数" prop="count">
                    <el-input type="input" v-model="form.count" placeholder="请输入用户数" clearable />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @Click="submitForm">立即生成</el-button>
                </el-form-item>
            </el-form>
        </el-main>
        <el-footer> </el-footer>
    </el-container>
</template>

<style scoped>
.container-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

:deep(.el-form-item__content) {
    flex-direction: column;
}
</style>
