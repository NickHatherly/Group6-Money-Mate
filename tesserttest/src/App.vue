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
   props: {
      source: String,
    },
  name: 'app',
   data: () => {
      return {
      double: null,
      myResult: '',
      transactions: [],
      /*date: null,
      picker: null,
      drawer: null */
    }
    },
  methods: { 
    
  recognize: async () => {
  const img = document.getElementById('text-img');
  console.log(img);

  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng', OEM.LSTM_ONLY);
  await worker.setParameters({
      tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });
  scheduler.addWorker(worker);
  const { data: { text } } = await worker.recognize(img);
  var mytext = JSON.stringify(text);
  var test123 = mytext.split(" ");
  console.log(mytext);
  var i;
  for (i = 0; i < test123.length; i++) {
    console.log(test123[i]);
  }
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