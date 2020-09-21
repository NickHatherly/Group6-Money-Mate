<template>
  <div id="app">
    <button v-on:click="recognize">recognize</button>
    <img id="text-img" alt="Vue logo" src="./assets/low.jpg">

    <v-chip-group multiple active-class="primary--text">
      <v-chip v-for="tag in tags" :key="tag">
        {{ tag }}
      </v-chip>
    </v-chip-group>
    <v-file-input
      label="File input"
      filled
      prepend-icon="mdi-camera"
    ></v-file-input>

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
      testtext: '',
      tags: [] //tags is the array where chips data is kept
    }
  },
  methods: {

    //tesseract data read
    recognize: async () => {
      var tags;
      const img = document.getElementById('text-img');
      console.log(img);
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng', OEM.LSTM_ONLY);
      await worker.setParameters ({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });
      scheduler.addWorker(worker);
      const {data: { text } } = await worker.recognize(img);//text it the output from the image
      var mytext = JSON.stringify(text); //turn the text into a string
      var textread = mytext.split(" "); //split the stringified text to be turrned into tokens
      console.log(textread);

      var i;
      for (i = 0; i < textread.length; i++) {//goes through each token and seperates it into individual pieces of data 
        console.log(textread[i])
      }
      this.textread = [tags] //this is where we are trying to place the data into the chips array but can't

    },
    
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
 img {
  filter: saturate(1.1) contrast(2) grayscale(1) ; 
} 
</style>