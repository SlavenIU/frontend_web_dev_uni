<template>
  <div>
    <h3>Select an Entity</h3>
    <div class="cards">
      <div class="card" @click="selectEntity('repairJobs')">Repair Jobs</div>
      <div class="card" @click="selectEntity('customers')">Customers</div>
      <div class="card" @click="selectEntity('devices')">Devices</div>
      <div class="card" @click="selectEntity('technicians')">Technicians</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EntitySelector",
  methods: {
    selectEntity(entity) {
      this.$router.push(`/entities/${entity}`); // Navigate to the selected entity's route
    },
  },
};
</script>

<style scoped>
.cards {
  display: flex;
  justify-content: space-around;
  gap: 10px;
}
.card {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  min-height: 200px;
  width: 150px; /* Added width for consistency */
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.2s;
  font-size: 1.2rem; /* Increased font size */
  font-weight: bold; /* Made text bolder */
}
.card:hover {
  background-color: #e0e0e0;
}
</style>
