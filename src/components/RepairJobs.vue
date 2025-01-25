<template>
    <div>
      <h3>Repair Jobs</h3>
    
      <table v-if="repairJobs.length > 0">
        <thead>
          <tr>
            <th>Job ID</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Description</th>
            <th>Total Cost</th>
            <th>Customer</th>
            <th>Device</th>
            <th>Technician</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="job in repairJobs" :key="job.job_id">
            <td>{{ job.job_id }}</td>
            <td>{{ job.status }}</td>
            <td>{{ job.start_date }}</td>
            <td>{{ job.end_date || 'N/A' }}</td>
            <td>{{ job.job_description }}</td>
            <td>${{ parseFloat(job.total_cost).toFixed(2) }}</td>
            <td>{{ job.customer_name }}<br>{{ job.customer_email }}<br>{{ job.customer_phone }}</td>
            <td>{{ job.device_type }}<br>{{ job.device_brand }} {{ job.device_model }}<br>SN: {{ job.device_serial_number }}</td>
            <td>{{ job.technician_name || 'Not Assigned' }}<br>{{ job.technician_specialization || '' }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>No repair jobs available</p>
    </div>
  </template>
    
  <script>
  export default {
    data() {
      return {
        repairJobs: [],  // Array to hold fetched repair jobs
      };
    },
    created() {
      this.fetchRepairJobs();  // Fetch data when the component is created
    },
    methods: {
        fetchRepairJobs() {
  fetch("http://localhost:8000/server.php?action=getRepairJobs", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Include cookies/sessions
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.repairJobs) {
        this.repairJobs = data.repairJobs;  // Assuming the response contains an array of repair jobs
      } else {
        console.error('Error fetching repair jobs:', data.error);
      }
    })
    .catch((error) => {
      console.error("Error fetching repair jobs:", error);
    });
},

    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border: 1px solid #ccc;
  }
  
  td {
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  p {
    text-align: center;
  }
  </style>
  