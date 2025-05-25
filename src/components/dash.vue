<template>
  <div>
    <!-- NAVBAR -->
    <nav class="navbar">
      <h1>GH Shop</h1>
      <div class="nav-info">
        <span>👤 {{ currentUserEmail }}</span>
        <router-link to="/addItem" class="add-link">➕ Add Item</router-link>
      </div>
    </nav>

    <!-- SEARCH + FILTERS -->
    <div class="filters">
      <input v-model="searchQuery" type="text" placeholder="Search by name..." />

      <select v-model="selectedCategory">
        <option value="">All Categories</option>
        <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
      </select>

      <select v-model="selectedPrice">
        <option value="">All Prices</option>
        <option value="low">Low (&lt; $50)</option>
        <option value="mid">Mid ($50-$100)</option>
        <option value="high">High (&gt; $100)</option>
      </select>
    </div>

    <!-- ITEM LIST -->
    <div class="item-grid">
      <div
        class="item-card"
        v-for="item in filteredItems"
        :key="item.id"
        @click="goToDetails(item.id)"
      >
        <img :src="item.image" alt="item image" class="item-img" />
        <h3>{{ item.name }}</h3>
        <p>{{ item.category }}</p>
        <p class="price">${{ item.price }}</p>
        <button
          v-if="item.addedBy === currentUserEmail"
          @click.stop="deleteItem(item.id)"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      items: [],
      searchQuery: "",
      selectedCategory: "",
      selectedPrice: "",
      currentUserEmail: localStorage.getItem("currentUser")
    };
  },
  computed: {
    uniqueCategories() {
      return [...new Set(this.items.map(item => item.category))];
    },
    filteredItems() {
      return this.items.filter(item => {
        const queryMatch =
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase());

        const categoryMatch = this.selectedCategory
          ? item.category === this.selectedCategory
          : true;

        const price = parseFloat(item.price);
        const priceMatch =
          this.selectedPrice === "low"
            ? price < 50
            : this.selectedPrice === "mid"
            ? price >= 50 && price <= 100
            : this.selectedPrice === "high"
            ? price > 100
            : true;

        return queryMatch && categoryMatch && priceMatch;
      });
    }
  },
  methods: {
    async fetchItems() {
      try {
        const res = await fetch("http://localhost:3000/items");
        this.items = await res.json();
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    },
    async deleteItem(id) {
      try {
        await fetch(`http://localhost:3000/items/${id}`, {
          method: "DELETE"
        });
        this.items = this.items.filter(item => item.id !== id);
      } catch (error) {
        console.error("Failed to delete:", error);
      }
    },
    goToDetails(id) {
      this.$router.push(`/item/${id}`);
    }
  },
  mounted() {
    this.fetchItems();
  }
};

</script>

<style scoped>
/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  color: #fff;
  padding: 10px 20px;
}
.nav-info {
  display: flex;
  gap: 20px;
  align-items: center;
}
.add-link {
  background-color: #4caf50;
  color: white;
  padding: 6px 12px;
  border-radius: 5px;
  text-decoration: none;
}

/* SEARCH BAR */
.search-bar {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.search-bar input {
  width: 50%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* ITEM GRID */
.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 20px;
  padding: 0 20px;
}
.item-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  background-color: #fff;
}
.item-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}
.price {
  font-weight: bold;
  margin: 5px 0;
}
button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #c0392b;
}
</style>
