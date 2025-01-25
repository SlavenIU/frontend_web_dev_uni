<template>
  <div id="app">
    <h1>PostgreSQL API Tester</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
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
