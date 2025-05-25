
<template>
  <div class="add-item">
    <h2>Add New Item</h2>
    <form @submit.prevent="addItem">
      <label>Name:</label>
      <input v-model="name" type="text" required />

      <label>Category:</label>
      <input v-model="category" type="text" required />

      <label>Price:</label>
      <input v-model.number="price" type="number" required />

      <button type="submit">Add Item</button>
    </form>

    <p v-if="success" class="success"> Item added successfully!</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      category: "",
      price: null,
      success: false,
    };
  },
  methods: {
    async addItem() {
      const newItem = {
        name: this.name,
        category: this.category,
        price: this.price,
        addedBy : localStorage.getItem("currentUser")
      };

      try {
        await fetch("http://localhost:3000/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem)
        });

        this.success = true;
        this.name = "";
        this.category = "";
        this.price = null;

        this.$router.push('/dash');
      } catch (err) {
        console.error("Error adding item:", err);
      }
    },
  },
};
</script>

<style scoped>
.add-item {
  max-width: 400px;
  margin: 30px auto;
  padding: 20px;
  border: 2px solid #aaa;
  border-radius: 10px;
}
label {
  display: block;
  margin-top: 10px;
}
input {
  width: 100%;
  padding: 6px;
  margin-top: 5px;
}
button {
  margin-top: 15px;
  padding: 8px 16px;
}
.success {
  color: green;
  margin-top: 10px;
}
</style>
