
<template>
  <pre style="color:white">
    {{ store }}
  </pre>
 <button @click="store.token = null">
  logout
 </button>
  <div v-if="!store.isAppReady">
    <form @submit.prevent="login">
      <p>
        {{ form }}
      </p>
     
      <div>
        <label for="">نام کاربری</label>
        <input v-model="form['username']" id="username" name="username" required/>
      </div>
      <div>
        <label for="">رمز عبور</label>
        <input v-model="form['password']" id="password" name="password" type="password" required/>
      </div>
      <div>
        <button type="submit">
          ورود
        </button>
      </div>
    </form>
  </div>
  <div v-else>
    <pre>
      {{ store.userInfo }}
        Welcome!
    </pre>
    <pre>
      {{ store.userDashboard }}
    </pre>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {useAppStore} from './store/app'
import useHttpPost from './composables/useHttpPost'

const form = ref({
  username : null,
  password : null
})
const store = useAppStore()
async function login() {
  try {

    const response = await useHttpPost('/login', {
      body: {
        UserPlatform: '0',
        Password: form.value.password,
        Username: form.value.username,
      },
    })

    const { Data } = response

    store.token = 'Bearer ' + Data.Key
    await store.initStore()

  } catch (error) {
    console.error(error)
  } finally {
  }
}


</script>


<style>
html,
body {
  width: 300px;
  height: 400px;
  padding: 0;
  margin: 0;
}

body {
  background-color: #333;
}

body > div {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
}

img {
  width: 200px;
  height: 200px;
}

h1 {
  font-size: 18px;
  color: white;
  font-weight: bold;
  margin: 0;
}

p {
  color: white;
  opacity: 0.7;
  margin: 0;
}
label { 
  color: white;
  opacity: 0.7;
  margin: 0;
}

code {
  font-size: 12px;
  padding: 2px 4px;
  background-color: #ffffff24;
  border-radius: 2px;
}
</style>

