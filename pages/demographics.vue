<template>
  <div class="flex flex-col items-center justify-center flex-1 px-4 sm:px-8 relative">
    <div class="absolute inset-0 -z-10">
      <div class="absolute w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl top-10 left-10 animate-floating"></div>
      <div class="absolute w-56 h-56 sm:w-72 sm:h-72 bg-indigo-500/20 rounded-full blur-3xl bottom-10 right-10 animate-floating-slow"></div>
    </div>

    <div class="bg-gray-800/90 p-6 sm:p-8 rounded-lg shadow-lg max-w-md sm:max-w-lg w-full relative">
      <div class="flex justify-center mb-4">
        <i class="fas fa-users text-4xl sm:text-5xl text-purple-400 animate-fade-in"></i>
      </div>
      <h1 class="text-2xl sm:text-3xl font-bold text-purple-400 mb-4 sm:mb-6 text-center">
        Participant Demographics
      </h1>
      <form @submit.prevent="saveDemographics">
        <label class="block mb-4">
          <span class="text-gray-300">Age:</span>
          <input
            type="number"
            v-model="age"
            required
            class="w-full mt-2 px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:border-purple-500 hover:border-purple-400 transition"
          />
        </label>

        <label class="block mb-4">
          <span class="text-gray-300">Programming Experience (years):</span>
          <input
            type="number"
            v-model="experience"
            required
            class="w-full mt-2 px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:border-purple-500 hover:border-purple-400 transition"
          />
        </label>

        <label class="block mb-6">
          <span class="text-gray-300">Preferred Style:</span>
          <select
            v-model="preferredStyle"
            required
            class="w-full mt-2 px-4 py-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:border-purple-500 hover:border-purple-400 transition"
          >
            <option value="camelCase">camelCase</option>
            <option value="kebab-case">kebab-case</option>
          </select>
        </label>

        <button
          type="submit"
          class="w-full px-6 py-3 bg-purple-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform transition hover:scale-105"
        >
          Next
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useDataStore } from "@/stores/data";

export default {
  data() {
    return {
      age: null,
      experience: null,
      preferredStyle: "camelCase",
    };
  },
  methods: {
    saveDemographics() {
      const store = useDataStore();

      store.setUser({
        age: this.age,
        experience: this.experience,
        preferredStyle: this.preferredStyle,
      });

      this.$router.push("/experiment");
    },
  },
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes floating {
  0% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-15px) translateX(15px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

@keyframes floating-slow {
  0% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(10px) translateX(-10px);
  }
  100% {
    transform: translateY(0) translateX(0);
  }
}

/* Utility Classes for Animations */
.animate-fade-in {
  animation: fade-in 1.5s ease-out forwards;
}

.animate-floating {
  animation: floating 6s ease-in-out infinite;
}

.animate-floating-slow {
  animation: floating-slow 8s ease-in-out infinite;
}

/* General Styling */
body {
  font-family: "Inter", "Roboto", sans-serif;
  margin: 0;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 4px rgba(128, 90, 213, 0.5);
}

.shadow-lg {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.shadow-md {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
