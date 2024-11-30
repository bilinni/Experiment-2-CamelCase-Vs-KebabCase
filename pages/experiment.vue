<template>
  <div class="flex flex-col items-center justify-center flex-1 px-4">
    <div v-if="loading" class="text-purple-400 text-lg">
      Loading questions...
    </div>
    <div
      v-else
      class="bg-gray-800/90 p-8 rounded-lg shadow-lg max-w-lg w-full relative"
    >
      <p class="text-gray-400 absolute top-2 right-3">
        {{ currentIndex + 1 }}/{{ questions.length }}
      </p>
      <h1 class="text-3xl font-bold text-purple-400 mb-6 text-center">
        Experiment Task
      </h1>
      <p v-if="currentTask" class="text-gray-300 mb-6 text-center">
        Match the identifier to the phrase:
        <strong>{{ currentTask.sentence }}</strong>
      </p>

      <p v-else class="text-gray-300 mb-6 text-center">No task available.</p>

      <div class="space-y-4">
        <button
          v-for="(option, index) in currentTask.options"
          :key="index"
          :class="[
            'w-full px-6 py-3 font-semibold rounded-full shadow-lg transform transition-all',
            selectedAnswer
              ? option === currentTask.correct
                ? 'bg-green-500 text-white'
                : option === selectedAnswer
                ? 'bg-red-500 text-white'
                : 'bg-gray-900 text-white'
              : 'bg-gray-900 text-white hover:bg-purple-500 hover:scale-105',
          ]"
          :disabled="!!selectedAnswer"
          @click="selectOption(option)"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useDataStore } from "@/stores/data";

export default {
  data() {
    return {
      questions: [],
      currentIndex: 0,
      loading: true,
      selectedAnswer: null,
      startTime: null,
    };
  },
  computed: {
    currentTask() {
      return this.questions[this.currentIndex] || null;
    },
  },
  methods: {
    async fetchQuestions() {
      try {
        const response = await fetch("/api/questions");
        this.questions = await response.json();
        this.loading = false;
        this.startTime = Date.now(); 
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    },
    selectOption(option) {
      const store = useDataStore();
      const timeTaken = Date.now() - this.startTime;

      store.addAnswer({
        task: this.currentTask.sentence,
        type: this.currentTask.type,
        selected: option,
        correct: option === this.currentTask.correct,
        timeTaken,
      });

      this.selectedAnswer = option;

      setTimeout(() => {
        this.nextTask();
      }, 300);
    },
    nextTask() {
      this.selectedAnswer = null;

      if (this.currentIndex + 1 < this.questions.length) {
        this.currentIndex++;
        this.startTime = Date.now(); 
      } else {
        this.submitResults(); 
      }
    },
    async submitResults() {
      console.log("Submitting results...");
      const store = useDataStore();
      try {
        await store.submitData();
        this.$router.push("/thank-you");
      } catch (error) {
        console.error("Error submitting results:", error);
        alert("There was an error submitting your results. Please try again.");
      }
    },
    checkDemographics() {
      const store = useDataStore();
      const user = store.user;

      if (!user) {
        alert("Please fill out the demographics information before proceeding.");
        this.$router.push("/demographics");
      }
    },
  },
  mounted() {
    this.checkDemographics(); 
    this.fetchQuestions();
  },
};
</script>

<style scoped>
button {
  transition: transform 0.3s ease, background-color 0.3s ease;
}
button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(128, 90, 213, 0.7);
}
</style>
