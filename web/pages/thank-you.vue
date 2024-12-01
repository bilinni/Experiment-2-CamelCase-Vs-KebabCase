<template>
  <div class="flex flex-1 flex-col items-center justify-center px-4 sm:px-8">
    <div class="absolute inset-0 -z-10">
      <div class="absolute w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl top-10 left-10 animate-floating"></div>
      <div class="absolute w-56 h-56 sm:w-72 sm:h-72 bg-indigo-500/20 rounded-full blur-3xl bottom-10 right-10 animate-floating-slow"></div>
    </div>

    <div class="bg-gray-800/90 p-6 sm:p-10 rounded-3xl shadow-xl max-w-md sm:max-w-lg text-center animate-fade-in">
      <div class="flex justify-center mb-4">
        <i class="fas fa-check-circle text-5xl sm:text-6xl text-purple-400 animate-fade-in"></i>
      </div>
      <h1 class="text-4xl sm:text-5xl font-bold text-purple-400 mb-4 sm:mb-6">Thank You!</h1>
      <p class="text-gray-300 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
        Your responses have been successfully submitted. We appreciate your participation in this experiment.
      </p>
      <p class="text-gray-400 text-sm sm:text-base mb-6">
        Results will be available soon. Stay tuned!
      </p>
      <nuxt-link to="/" class="block">
        <button
          class="w-full sm:w-auto px-6 py-3 sm:px-8 bg-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-purple-600 transform hover:scale-105 animate-bounce-slow animate-pulse-delay"
        >
          Back to Home
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<style scoped>
/* Animations */
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

@keyframes bounce-slow {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(128, 90, 213, 0.6);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 25px 10px rgba(128, 90, 213, 0);
  }
}

.animate-fade-in {
  animation: fade-in 1.5s ease-out forwards;
}

.animate-floating {
  animation: floating 6s ease-in-out infinite;
}

.animate-floating-slow {
  animation: floating-slow 8s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s infinite;
}

.animate-pulse-delay {
  animation: bounce-slow 1.5s ease-out forwards, pulse 2s infinite ease-out 2s; 
}

button {
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease, font-size 0.3s ease;
  font-size: 1rem;
}

button:hover {
  font-size: 1.1rem;
}
</style>
