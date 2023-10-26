
<template>
  <div v-if="!store.key">
    <form>
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
        <button @click="onSubmit">
          ورود
        </button>
      </div>
    </form>
  </div>
  <div v-else>
    <div>
        Welcome!
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {useAppStore} from '../store/app'
import useHttpPost from '../composables/useHttpPost'
import useHttpGet from '../composables/useHttpGet'

const form = ref({
  username : null,
  password : null
})
const store = useAppStore()
const onSubmit = async()=>{
  const data = {
    UserPlatform : "0",
    Username : form.value.username,
    Password : form.value.password
  }
  try{
    const response = await useHttpPost('/login', data)
    const {key ,TwoAuthentication,UserInfo} = response.Data
    store.key = key
    store.userInfo = UserInfo
    await getUserDashboard()
    await getUserProfile()
  }catch(e){
    console.log(e)
  }
}
console.log('again')
async function getUserDashboard(){
  const res = await useHttpGet('api/public/v2/get-user-dashboard')
  store.userDashboard = res.Data
} 
async function getUserProfile(){
  const res = await useHttpGet('api/user/get-user-profile')
  store.userProfile = res.Data
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
