<template>
    <div>
      <h3>Create a New Connection</h3>
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
      <p>{{ connectionMessage }}</p>
    </div>
  </template>
  
  <script>
  import { EventBus } from "@/eventBus";

  export default {
    props: ["onConnectionSuccess"],
    data() {
      return {
        connectionDetails: {
          host: "localhost",
          user: "",
          password: "",
          database: "",
        },
        connectionMessage: "",
      };
    },
    methods: {
        createConnection() {
  fetch("http://localhost:8000/server.php?action=login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({
      credentials: this.connectionDetails,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("Emitting connection-success event"); // Debugging
        EventBus.isConnected = true; // Set the state in EventBus
        console.log("EventBus.isConnected", EventBus.isConnected);
        this.$router.push("/"); // Redirect to home
      } else {
        this.connectionMessage = `Error: ${data.error}`;
      }
    })
    .catch((error) => {
      this.connectionMessage = `Error: ${error.message}`;
    });
}

    },
  };
  </script>
  

  