<template>
    <div>
      <h1>Welcome to the PostgreSQL API Tester</h1>
      <p>
        This application allows you to test your PostgreSQL API by creating
        connections, selecting entities, and querying data.
      </p>
      <div class="cards">
        <div class="card" @click="navigateToConnection">
          <h3>{{ connectionCardTitle }}</h3>
          <p>{{ connectionCardDescription }}</p>
        </div>
        <div v-if="isConnected" class="card" @click="$router.push('/entities')">
          <h3>Select Entities</h3>
          <p>Choose an entity to interact with and test queries.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { EventBus } from "@/eventBus";
  
  export default {
    name: "HomeView",
    computed: {
      isConnected() {
        return EventBus.isConnected;
      },
      connectionCardTitle() {
        return this.isConnected ? "Connect to a Different Database" : "Setup Connection";
      },
      connectionCardDescription() {
        return this.isConnected
          ? "Switch to a different database connection."
          : "Start by setting up a database connection.";
      },
    },
    methods: {
      navigateToConnection() {
        this.$router.push("/connection");
      },
    },
  };
  </script>
  