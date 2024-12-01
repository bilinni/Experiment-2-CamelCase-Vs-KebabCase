import { defineStore } from 'pinia';

export const useDataStore = defineStore('data', {
  state: () => ({
    user: {},
    experiment: {
      answers: [] as Record<string, any>[], 
      startTime: null as Date | null,
      endTime: null as Date | null
    },
    submissionStatus: null as 'pending' | 'success' | 'error' | null 
  }),
  getters: {
    experimentDuration(state): number | null {
      if (state.experiment.startTime && state.experiment.endTime) {
        return (
          new Date(state.experiment.endTime).getTime() -
          new Date(state.experiment.startTime).getTime()
        );
      }
      return null;
    }
  },
  actions: {
    setUser(user: Record<string, any>) {
      this.user = user;
    },
    addAnswer(answer: Record<string, any>) {
      this.experiment.answers.push(answer);
    },
    setStartTime(time: Date) {
      this.experiment.startTime = time;
    },
    setEndTime(time: Date) {
      this.experiment.endTime = time;
    },
    async submitData() {
      this.submissionStatus = 'pending';
    
      try {
        const payload = {
          user: this.user, 
          answers: this.experiment.answers, 
        };
    
        console.log('Submitting payload:', payload);
    
        const response = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload), 
        });
    
        const result = await response.json();
        console.log('Submission successful:', result);
    
        if (!result.success) {
          throw new Error(result.error);
        }
    
        this.submissionStatus = 'success';
        this.reset(); 
      } catch (error) {
        console.error('Submission error:', error);
        this.submissionStatus = 'error';
        throw error;
      }
    },
    
    
    reset() {
      this.user = {};
      this.experiment = {
        answers: [],
        startTime: null,
        endTime: null
      };
      this.submissionStatus = null;
    }
  }
});
