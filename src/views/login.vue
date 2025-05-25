<template>
    <div id="border">
    <div class="login">
        <h1 id="title">Welcome Back !</h1>
        <label for="email">Email</label>
        <input  v-model="email" type="email" placeholder="Enter your email">
        <label for="password">Password</label>
        <input v-model="password" type="password" min="6" placeholder="password" >
        <button @click="verifyLoginOperation">login</button>
        <router-link to ='/'>  Back to home </router-link>
    </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      email: '',
      password: '',

    }
  },
  methods: {
    verifyLoginOperation() {
      const users = JSON.parse(localStorage.getItem('users')) || []
      const found = users.find(user => user.email === this.email && user.password === this.password)

      if (found) {
        localStorage.setItem('currentUser', this.email)
        this.$router.push('/dash') 
      } else {alert('You do not have an account yet.\nPlease Sign Up!')      }
    }
  }
}
</script>

<style scoped>
#title{
    text-align :center;
}
#border {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f4f4f4;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  width: 400px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.login input {
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login label {
  align-self: flex-start;
  margin: 5px 0 3px;
  font-weight: bold;
}

.login button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
  font-size: 16px;
}

.login button:hover {
  background-color: #357abd;
}
</style>