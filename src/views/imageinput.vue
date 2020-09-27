<template>
  <div id="app">
    <v-file-input
      v-model="files"
      label="File input"
      filled
      prepend-icon="mdi-camera"
    ></v-file-input>

    <button v-on:click="recognize">recognize</button>
    <img id="text-img" prepend-icon="mdi-camera" src="imageUrl" />

    <p id="topText">
      Note: Enter information about the company name, date, description, amount
      and if the information is recurring
    </p>
    <v-chip-group column active-class="primary--text" id="resultChips">
      <v-chip color="red" text-color="white" @click="chipClick">
        Information Unavailable
      </v-chip>
      <v-chip v-for="tag in tags" :key="tag" @click="chipClick">
        {{ tag }}
      </v-chip>
    </v-chip-group>
    <v-btn text large v-on:click="goBack" id="backBtn">Go back a step</v-btn>
    <v-btn
      text
      large
      id="submit"
      router
      :to="{ name: 'Textinput', query: { transactions } }"
      >Submit</v-btn
    >
  </div>
</template>

<script>
import { createWorker, createScheduler, PSM, OEM } from "tesseract.js";

const scheduler = createScheduler();
const worker = createWorker({
  logger: (m) => console.log(m), // Add logger here
});

export default {
  props: {
    source: String,
  },
  name: "app",
  data: () => {
    return {
      file: null,
      imageUrl: null,
      myResult: "",
      transactions: [],
      testtext: "",
      textread: "",
      tags: [], //tags is the array where chips data is kept
      count: 0,
      files: [],
      name: null,
    };
  },
  methods: {
    //tesseract data read
    async recognize() {
      var chipGroup = document.getElementById("resultChips");
      var descText = document.getElementById("topText");
      //var submitBtn = document.getElementById("submit");

      chipGroup.style.display = "none";
      descText.textContent =
        "Note: Enter information about the company name, date, description, amount and if the information is recurring";
      //var tags;
      //const img = document.getElementById('text-img');
      console.log(this.files);
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng", OEM.LSTM_ONLY);
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });
      scheduler.addWorker(worker);
      const {
        data: { text },
      } = await worker.recognize(this.files); //text it the output from the image
      var mytext = JSON.stringify(text); //turn the text into a string
      var textread = mytext.split(" "); //split the stringified text to be turrned into tokens
      console.log(textread);

      textread.forEach((split) => {
        console.log(split);
        split = split.replace(/\\n/g, "");
        split = split.replace(/[^A-Za-z0-9.$/]/g, "");
        // if(split.indexOf(split) === -1) {
        //     split.push(split)
        //     return split;
        //   }
        console.log(split);
        this.tags.push(split);
      });

      chipGroup.style.display = "inline";
      //submitBtn.style.display ="none";
      descText.textContent =
        "Please select the Total Amount from the chips below. If there is no applicable information, select the red chip."; 
    },

    chipClick(event) {
      var descText = document.getElementById("topText");
      var backBtn = document.getElementById("backBtn");
      var submitBtn = document.getElementById("submit");
      var chipGroup = document.getElementById("resultChips");

      var chipSingle = event.target;
      var chipContent = chipSingle.textContent.substring(
        1,
        chipSingle.textContent.length - 1
      ); //Remove space that is always at the start and the end
      if (chipContent.localeCompare("Information Unavailable") == 0) {
        chipContent = "";
      }
      switch (this.count) {
        case 0:
          descText.textContent =
            "Please select the Date from the chips below. If there is no applicable information, select the red chip.";          
          backBtn.style.display = "inline";
          submitBtn.style.display = "inline";
          this.transactionsname = this.chipContent;
          break;
        case 1:
          descText.textContent =
            "Please select the Description from the chips below. If there is no applicable information, select the red chip.";
          break;
        case 2:
          descText.textContent =
             "Please select the Company Name from the chips below. If there is no applicable information, select the red chip.";
          break;
        case 3:
          descText.textContent =
            "If the selected informtaion is correct please click submit.";
          submitBtn.style.direction = "inline";
          chipGroup.style.direction = "inline";
          break;
      }
      this.count++;
      this.transactions.push(chipContent);
      console.log(this.transactions);
    },

    goBack() {
      var descText = document.getElementById("topText");
      var backBtn = document.getElementById("backBtn");
      var submitBtn = document.getElementById("submit");
      var chipGroup = document.getElementById("resultChips");
      this.transactions.splice(this.transactions.length - 1, 1);
      console.log(this.transactions);
      this.count--;
      switch (this.count) {
        case 0:
          descText.textContent =
           "Please select the Total Amount from the chips below. If there is no applicable information, select the red chip."; 
          backBtn.style.display = "none";
          break;
        case 1:
          descText.textContent =
            "Please select the Date from the chips below. If there is no applicable information, select the red chip.";
          break;
        case 2:
          descText.textContent =
            "Please select the Description from the chips below. If there is no applicable information, select the red chip.";
          break;
        case 3:
          descText.textContent =
            "If the selected informtaion is correct please click submit.";
          submitBtn.style.direction = "inline";
          chipGroup.style.direction = "inline";
          break;
      }
    },
  },
};
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
  filter: saturate(1.1) contrast(2) grayscale(1);
}
</style>
