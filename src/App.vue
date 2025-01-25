<template>
  <div id="app">
    <h1>PostgreSQL API Tester</h1>

    <!-- Show connection form if the user is not connected -->
    <div v-if="!isConnected" class="test-case">
      <h3>Create a New Connection</h3>
      <p>Provide your database connection details below and click "Create Connection."</p>
      <form @submit.prevent="createConnection">
        <label>
          Host:
          <input v-model="connectionDetails.host" placeholder="localhost" />
        </label>
        <label>
          User:
          <input v-model="connectionDetails.user" placeholder="Enter username" />
        </label>
        <label>
          Password:
          <input v-model="connectionDetails.password" type="password" placeholder="Enter password" />
        </label>
        <label>
          Database:
          <input v-model="connectionDetails.database" placeholder="Enter database name" />
        </label>
        <button type="submit">Create Connection</button>
      </form>
      <p class="output">{{ connectionMessage }}</p>
    </div>

    <!-- Show entity selection if connected but no entity is selected -->
    <div v-else-if="!selectedEntity" class="test-case">
      <h3>Select an Entity</h3>
      <p>Choose an entity to view related questions:</p>
      <div class="cards">
        <div class="card" @click="selectEntity('article')">Articles</div>
        <div class="card" @click="selectEntity('section')">Sections</div>
        <div class="card" @click="selectEntity('stock')">Stocks</div>
      </div>
      <button class="change-connection" @click="resetConnection">Change Connection</button>
    </div>

    <!-- Show questions if an entity is selected -->
    <div v-else class="test-case">
      <h3>Questions for {{ selectedEntity }}</h3>
      <button @click="goBack">Go Back</button>
      <button class="change-connection" @click="resetConnection">Change Connection</button>
      <div class="output">
        <pre>{{ questions }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connectionDetails: {
        host: "localhost",
        user: "",
        password: "",
        database: "",
      },
      connectionMessage: "",
      isConnected: false,
      selectedEntity: null,
      questions: [],
    };
  },
  methods: {
    createConnection() {
      fetch("http://localhost:8000/server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include credentials for session handling
        body: JSON.stringify({
          action: "login",
          credentials: this.connectionDetails,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            this.connectionMessage = "Connection created successfully!";
            this.isConnected = true;
          } else {
            this.connectionMessage = `Error: ${data.error}`;
          }
        })
        .catch((error) => {
          this.connectionMessage = `Error: ${error.message}`;
        });
    },
    selectEntity(entity) {
      this.selectedEntity = entity;
      this.fetchQuestions(entity);
    },
    fetchQuestions(entity) {
      fetch("http://localhost:8000/server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include credentials for session handling
        body: JSON.stringify({
          action: "query",
          query: `SELECT * FROM questions WHERE target_entity = '${entity}'`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.questions = `Error: ${data.error}`;
          } else {
            this.questions = data.length
              ? JSON.stringify(data, null, 2)
              : "No questions found.";
          }
        })
        .catch((error) => {
          this.questions = `Error: ${error.message}`;
        });
    },
    goBack() {
      this.selectedEntity = null;
      this.questions = [];
    },
    resetConnection() {
      this.isConnected = false;
      this.selectedEntity = null;
      this.questions = [];
      this.connectionDetails = {
        host: "localhost",
        user: "",
        password: "",
        database: "",
      };
      this.connectionMessage = "";
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.test-case {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
}
label {
  display: block;
  margin: 5px 0;
}
textarea,
input {
  width: 100%;
  padding: 8px;
  margin: 5px 0;
}
button {
  background-color: #0078d7;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}
button:hover {
  background-color: #005cbf;
}
.change-connection {
  background-color: #e74c3c;
  margin-top: 10px;
}
.change-connection:hover {
  background-color: #c0392b;
}
.output {
  margin-top: 10px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 10px;
  white-space: pre-wrap;
}
.cards {
  display: flex;
  gap: 10px;
}
.card {
  flex: 1;
  border: 1px solid #ccc;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}
.card:hover {
  background-color: #f0f0f0;
}
</style>
