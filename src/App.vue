<template>
  <div id="app">
    <h1>PostgreSQL API Tester</h1>

    <div class="test-case">
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

    <div class="test-case">
      <h3>Execute SQL Query</h3>
      <p>Enter a SQL query below and click "Execute Query."</p>
      <form @submit.prevent="executeQuery">
        <textarea v-model="query" placeholder="SELECT * FROM users"></textarea>
        <button type="submit">Execute Query</button>
      </form>
      <div class="output">
        <pre>{{ queryResult }}</pre>
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
      query: "",
      queryResult: "",
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
          } else {
            this.connectionMessage = `Error: ${data.error}`;
          }
        })
        .catch((error) => {
          this.connectionMessage = `Error: ${error.message}`;
        });
    },
    executeQuery() {
      fetch("http://localhost:8000/server.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include credentials for session handling
        body: JSON.stringify({
          action: "query",
          query: this.query,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.queryResult = `Error: ${data.error}`;
          } else {
            this.queryResult = JSON.stringify(data, null, 2);
          }
        })
        .catch((error) => {
          this.queryResult = `Error: ${error.message}`;
        });
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
.output {
  margin-top: 10px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  padding: 10px;
  white-space: pre-wrap;
}
</style>
