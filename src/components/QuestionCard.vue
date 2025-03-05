<template>
    <div 
      class="question-card" 
      @click="toggleQuestion"
    >
      <div class="question-text">{{ question.question_text }}</div>
      <div v-if="question.expanded" class="answer-section">
        <div v-if="question.loading">Loading...</div>
        <div v-else-if="question.error">{{ question.error }}</div>
        <div v-else>{{ question.answer }}</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      question: {
        type: Object,
        required: true
      }
    },
    methods: {
      toggleQuestion() {
        if (!this.question.expanded) {
          this.question.loading = true;
          this.question.error = null;
  
          fetch("http://localhost:8000/server.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ query: this.question.sql_query }),
          })
            .then((response) => response.json())
            .then((data) => {
              this.question.loading = false;
              if (data.error) {
                this.question.error = data.error;
              } else {
                this.question.answer = JSON.stringify(data, null, 2);
              }
            })
            .catch((error) => {
              this.question.loading = false;
              this.question.error = error.message;
            });
        }
        this.question.expanded = !this.question.expanded;
      }
    }
  };
  </script>
  
  <style scoped>
  .question-card {
    padding: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .question-card:hover {
    background-color: #f5f5f5;
  }
  
  .question-text {
    font-weight: bold;
  }
  
  .answer-section {
    margin-top: 10px;
    padding: 10px;
    background-color: #f9f9f9;
    border-top: 1px solid #ccc;
  }
  </style>
  