<template>
  <div class="flex flex-1 flex-col items-center justify-center px-4 pb-5">
    <h1 class="text-3xl sm:text-5xl font-extrabold mb-4 text-center animate-fade-in">
      <span class="block sm: mt-5">Which is Easier to Read?</span>
      <span class="block text-purple-400">camelCase or kebab-case?</span>
    </h1>

    <p
      class="text-base sm:text-lg mb-6 sm:mb-8 text-center max-w-md sm:max-w-2xl animate-fade-in-delay text-gray-300"
    >
      Help us discover the more readable style by participating in this
      structured experiment. Your feedback matters!
    </p>

    <nuxt-link to="/demographics">
      <button
        class="px-6 py-3 bg-purple-500 text-white font-bold rounded-full shadow-lg transform transition hover:scale-105 animate-pulse-button mb-8 sm:mb-12 w-full sm:w-auto"
      >
        Start the Experiment
      </button>
    </nuxt-link>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-md sm:max-w-4xl animate-fade-in-cards"
    >
      <CardComponent
        icon="fa-info-circle"
        title="Instructions"
        description="Learn how the experiment works and follow step-by-step instructions to ensure accurate participation."
      />
      <CardComponent
        icon="fa-user"
        title="Demographics"
        description="Provide some basic details about yourself to help us analyze trends and improve experiment outcomes."
      />
      <CardComponent
        icon="fa-tasks"
        title="Tasks"
        description="Perform simple tasks by selecting identifiers in camelCase or kebab-case formats. Your choices matter."
      />
      <CardComponent
        icon="fa-chart-bar"
        title="Results"
        description="Your responses and timings will help us analyze which style is easier to read and more efficient."
      />
    </div>
  </div>
</template>

<script>
import CardComponent from "@/components/CardComponent.vue";

export default {
  components: {
    CardComponent,
  },
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-delay {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-cards {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(128, 90, 213, 0.6);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px 10px rgba(128, 90, 213, 0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fade-in-delay 1s ease-out forwards;
  animation-delay: 0.5s;
}

.animate-fade-in-cards {
  animation: fade-in-cards 1s ease-out forwards;
  animation-delay: 1s;
}

.animate-pulse-button {
  animation: pulse 2s infinite;
}

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

.bg-dark-gray {
  background-color: #1c1c28;
}

.hover\:bg-purple-700\/90:hover {
  background-color: rgba(128, 90, 213, 0.9);
}

.text-purple-400 {
  color: #a855f7;
}
</style>
