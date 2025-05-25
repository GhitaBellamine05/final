<template>
  <div v-if="item">
    <h2>{{ item.name }}</h2>
    <p>{{ item.description }}</p>

    <div class="rating-section">
      <h3>Average Rating: {{ averageRating.toFixed(1) }}</h3>
      <input
        type="number"
        min="1"
        max="5"
        v-model.number="newRating"
        placeholder="Rate 1 to 5"
      />
      <button @click="submitRating">Submit Rating</button>
    </div>

    <div class="comments-section">
      <h3>Comments</h3>

      <div v-if="item.comments.length > 0">
        <div class="comment" v-for="(comment, index) in item.comments" :key="index">
          <strong>{{ comment.author }}:</strong> {{ comment.text }}
        </div>
      </div>
      <p v-else>No comments yet.</p>

      <div class="add-comment">
        <textarea
          v-model="newComment"
          placeholder="Write your comment..."
          rows="3"
        ></textarea>
        <button @click="submitComment">Post Comment</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      item: null,
      newRating: null,
      newComment: ""
    };
  },
  computed: {
    averageRating() {
      if (!this.item || !this.item.ratings || this.item.ratings.length === 0)
        return 0;
      const sum = this.item.ratings.reduce((a, b) => a + b, 0);
      return sum / this.item.ratings.length;
    }
  },
  methods: {
    async fetchItem() {
      const id = this.$route.params.id;
      const res = await fetch(`http://localhost:3000/items/${id}`);
      this.item = await res.json();

      if (!this.item.ratings) {
        this.item.ratings = [];
      }
      if (!this.item.comments) {
        this.item.comments = [];
      }
    },
    async submitRating() {
      if (
        this.newRating === null ||
        this.newRating < 1 ||
        this.newRating > 5
      )
        return;
      const updatedRatings = [...this.item.ratings, this.newRating];
      try {
        await fetch(`http://localhost:3000/items/${this.item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ratings: updatedRatings })
        });
        this.item.ratings = updatedRatings;
        this.newRating = null;
      } catch (err) {
        console.error("Error submitting rating:", err);
      }
    },
    async submitComment() {
      if (!this.newComment.trim()) return;
      const currentUser = localStorage.getItem("currentUser") || "Anonymous";
      const updatedComments = [
        ...this.item.comments,
        { author: currentUser, text: this.newComment.trim() }
      ];
      try {
        await fetch(`http://localhost:3000/items/${this.item.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ comments: updatedComments })
        });
        this.item.comments = updatedComments;
        this.newComment = "";
      } catch (err) {
        console.error("Error adding comment:", err);
      }
    }
  },
  mounted() {
    this.fetchItem();
  }
};
</script>

<style scoped>
.rating-section {
  margin-bottom: 20px;
}
.comments-section {
  margin-top: 30px;
}
.comment {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
}
.add-comment {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
}
button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #2980b9;
}
</style>
