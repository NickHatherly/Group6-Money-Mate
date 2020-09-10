<template>
  <div id="app">
    <button v-on:click="recognize">recognize</button>
    <img id="text-img" alt="Vue logo" src="./assets/agagagagag.jpg">
  </div>
</template>

<script>
import { createWorker, createScheduler, PSM, OEM } from 'tesseract.js';


const scheduler = createScheduler();
const worker = createWorker({
  logger: m => console.log(m), // Add logger here
});
export default {
  name: 'app',
  methods: { 
    recognize: async () => {
      const img = document.getElementById('text-img');
      console.log(img);
   await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng', OEM.LSTM_ONLY);
  await worker.setParameters({
    tessedit_char_whitelist: '$.1234567890',
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });
  scheduler.addWorker(worker);
  const { data: { text } } = await worker.recognize(img);
  console.log(text);
  await scheduler.terminate();
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* img {
  filter: saturate(1.1) contrast(2) grayscale(1) ; 
} */
</style>