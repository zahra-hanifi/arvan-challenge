<script setup>
import CInput from '../../components/general/CInput.vue'
import CBtn from '../../components/general/CBtn.vue'
import CForm from '../../components/general/CForm.vue'
import { ref } from 'vue'
import { hasValue, isEmail } from '../../utils/validations.js'

const formData = ref({
  username: '',
  email: '',
  password: '',
})

const validations = ref({
  username: [
    {
      rule: hasValue,
      message: 'Required field',
    },
  ],
  email: [
    {
      rule: hasValue,
      message: 'Required field',
    },
    {
      rule: isEmail,
      message: 'Wrong email format',
    },
  ],
  password: [
    {
      rule: hasValue,
      message: 'Required field',
    },
  ],
})
const formRef = ref(null)

async function register() {
  const formIsValid = await formRef.value?.validateAll()
  if (!formIsValid) return
}
</script>

<template>
  <div class="min-h-screen flex justify-center items-center">
    <CForm
      ref="formRef"
      class="p-5 bg-grey-300 rounded flex flex-col gap-y-5 w-full sm:max-w-[450px]"
      @submit="register"
    >
      <div class="text-[#707070] text-5xl my-4 text-center">Register</div>

      <CInput
        v-model="formData.username"
        label="User"
        :validations="validations.username"
      />

      <CInput
        v-model="formData.email"
        label="Email"
        :validations="validations.email"
      />

      <CInput
        v-model="formData.password"
        label="Password"
        type="password"
        :validations="validations.password"
      />

      <div class="flex flex-col gap-y-2">
        <CBtn @click="register">Register</CBtn>

        <div class="text-base flex items-center gap-x-1 text-grey-800">
          Already Registered?

          <a href="/auth/login" class="font-bold">Login</a>
        </div>
      </div>
    </CForm>
  </div>
</template>
