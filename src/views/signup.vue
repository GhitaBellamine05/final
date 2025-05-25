<template>
  <div id="border">
    <div class="login">
      <h1 id="title">Let's create your account!</h1>

      <label for="firstName">First Name</label>
      <input v-model="firstName" type="text" placeholder="Enter your first name" />

      <label for="lastName">Last Name</label>
      <input v-model="lastName" type="text" placeholder="Enter your last name" />

      <label for="email">Email</label>
      <input v-model="email" type="email" placeholder="Enter your email" />

      <label for="password">Password</label>
      <input v-model="password" type="password" placeholder="Enter your password" />

      <button @click="verifySignUpOperation">Sign Up</button>

      <p style="color:red" v-if="errorMessage">{{ errorMessage }}</p>
      <p style="color:green" v-if="successMessage">{{ successMessage }}</p>
      <router-link to="/">Back to home page</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    verifySignUpOperation() {
  if (!this.firstName || !this.lastName || !this.email || !this.password) {
    this.errorMessage = 'Please fill in all fields.';
    this.successMessage = '';
    return;
  }

  if (this.password.length < 6) {
    this.errorMessage = 'Password must be at least 6 characters.';
    this.successMessage = '';
    return;
  }

  let users = JSON.parse(localStorage.getItem('users'));

  if (!Array.isArray(users)) {
    users = [];
  }

  // Check if email already exists
  if (users.find(user => user.email === this.email)) {
    this.errorMessage = 'Email already registered.';
    this.successMessage = '';
    return;
  }

  // Add new user
  users.push({
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password
  });

  localStorage.setItem('users', JSON.stringify(users));

  this.errorMessage = '';
  this.successMessage = 'Account created successfully!';

  this.firstName = '';
  this.lastName = '';
  this.email = '';
  this.password = '';
localStorage.setItem('currentUser', this.email)

  this.$router.push('/dash') 
}

  }
};
</script>

<style scoped>
#title {
  text-align: center;
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
