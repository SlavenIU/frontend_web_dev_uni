<template>
  <div>
    <h3>Repair Jobs</h3>

    <!-- Loading spinner for repair jobs -->
    <div v-if="loadingRepairJobs" class="loading-spinner">Loading...</div>

    <div class="table-container" @scroll="onScroll">
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

    <div class="questions-section">
      <h3>Questions</h3>

      <!-- Loading spinner for questions -->
      <div v-if="loadingQuestions" class="loading-spinner">Loading Questions...</div>

      <div class="question-cards">
        <QuestionCard 
          v-for="question in questions" 
          :key="question.id" 
          :question="question" 
        />
      </div>
    </div>
  </div>
</template>


<script>
import QuestionCard from '../components/QuestionCard.vue';  // Import the new component

export default {
  components: {
    QuestionCard,  // Register the component
  },
  data() {
    return {
      repairJobs: [],  // Array to hold fetched repair jobs
      questions: [],    // Array to hold fetched questions
      loadingRepairJobs: false, // Flag for loading repair jobs
      loadingQuestions: false, // Flag for loading questions
      loadingMore: false,  // Flag to avoid multiple API calls at the same time
      loadedAllJobs: false, // Flag to track if all jobs have been loaded
      page: 1,  // Page number for API calls
    };
  },
  created() {
    this.fetchRepairJobs();  // Initial data fetch
    this.fetchQuestions();    // Fetch questions
  },
  methods: {
    fetchRepairJobs() {
      if (this.loadingMore || this.loadedAllJobs) return;  // Prevent API calls if already loading or all data is fetched

      this.loadingRepairJobs = true;  // Set loading flag to true
      this.loadingMore = true;  // Prevent multiple calls during loading
      fetch(`http://localhost:8000/server.php?action=getRepairJobs&page=${this.page}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies/sessions
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.repairJobs && data.repairJobs.length > 0) {
            this.repairJobs = [...this.repairJobs, ...data.repairJobs];  // Append new data
            this.page++;  // Increment page number for next call
          } else {
            this.loadedAllJobs = true;  // Set flag to true if no more jobs are available
          }
          this.loadingRepairJobs = false;  // Reset loading flag
          this.loadingMore = false;  // Reset loadingMore flag
        })
        .catch((error) => {
          console.error("Error fetching repair jobs:", error);
          this.loadingRepairJobs = false;  // Reset loading flag in case of error
          this.loadingMore = false;  // Reset loadingMore flag in case of error
        });
    },
    fetchQuestions() {
      this.loadingQuestions = true;  // Set loading flag for questions
      fetch("http://localhost:8000/server.php?action=getQuestions&entity=repair_job", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies/sessions
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.questions) {
            this.questions = data.questions.map(q => ({ ...q, expanded: false, loading: false, answer: null, error: null }));
          } else {
            console.error('Error fetching questions:', data.error);
          }
          this.loadingQuestions = false;  // Reset loading flag after data is fetched
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          this.loadingQuestions = false;  // Reset loading flag in case of error
        });
    },
    onScroll(event) {
      const container = event.target;
      // Check if we're at the bottom of the container
      if (container.scrollHeight - container.scrollTop === container.clientHeight) {
        this.fetchRepairJobs();  // Load more jobs when at the bottom
      }
    },
  },
};
</script>


<style scoped>
.table-container {
  max-height: 400px;  /* Set the max height of the table */
  overflow-y: auto;   /* Add vertical scroll */
}

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

.questions-section {
  margin-top: 50px;
}

.question-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Spinner styles */
.loading-spinner {
  text-align: center;
  font-size: 1.5rem;
  color: #007bff;
  margin: 20px 0;
}
</style>

