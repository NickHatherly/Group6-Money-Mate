<template>
  <div id="app">
    <h1>Image Input</h1><br>
<div> 
  <label for="upload-image">Select Image</label>
  <input type="file" v-on:click="chooseFile" @change="previewImage" accept="image/*" id="upload-image" >
  </div>
     <div class="image-preview" v-if="imageData.length > 0">
                <img id="imagepreview" class="preview"  :src="imageData" style="width:250px;height:400px;">
            </div>
    <img id="text-img" src="/assets/imageholder.png">
    <v-spacer></v-spacer>
    <v-col></v-col>
    <v-btn color= "#1565c0" dark large elevation="4" v-on:click="recognize">Recognize Image</v-btn>
    <v-spacer></v-spacer>
    <v-col></v-col>
    <v-btn outlined color="#1565c0" large elevation="4" id="newImage" v-on:click="newImage">New image</v-btn>
    <v-spacer></v-spacer>
    <v-col></v-col>

    <p id="topText">
      Note: Please select a file to be scanned and once prompted enter information about the company amount, date, description and Company name
    </p>
    <v-chip-group column center-active active-class="primary--text" id="resultChips">
      <v-chip color="red" text-color="white" @click="chipClick">
        Information Unavailable
      </v-chip>
      <v-chip v-for="tag in tags" :key="tag" @click="chipClick">
        {{ tag }}
      </v-chip>
    </v-chip-group>
    <v-btn outlined color="#1565c0" large v-on:click="goBack" id="backBtn">Go back a step</v-btn>
    <v-row></v-row>
    <div id = "submit">
    <v-btn color= "#1565c0" dark large id="submit" router :to="{ name: 'Textinput', query: { transactions } }">Submit</v-btn>
    </div>
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
      imageData: "",
     // file: null,
     // imageUrl: null,
      myResult: "",
      transactions: [],
      testtext: "",
      textread: "",
      tags: [], //tags is the array where chips data is kept
      count: 0,
      //files: [],
      name: null,
    };
  },
  methods: {

    chooseFile(){
      var textimg = document.getElementById("text-img");
      var chipGroup = document.getElementById("resultChips");
      var backBtn = document.getElementById("backBtn");
      var submitBtn = document.getElementById("submit");
      var imagepreview  = document.getElementById("imagepreview" );
      var newImage = document.getElementById("newImage");
      newImage.style.display = "inline"; 
      imagepreview.style.display = "inline"; 
      textimg.style.display = "none"; 
      backBtn.style.display = "none";
      chipGroup.style.display = "none";
      submitBtn.style.display = "none";
    },

    newImage(){
      var imagepreview  = document.getElementById("imagepreview" );
      imagepreview.style.display = "none"; 
      this.count = 0;
      this.transactions = [];
      this.tags = [];
    },

    previewImage: function(event) {
      var input = event.target;
      var textimg = document.getElementById("text-img");
      var chipGroup = document.getElementById("resultChips");
      var backBtn = document.getElementById("backBtn");
      var submitBtn = document.getElementById("submit");

      textimg.style.display = "none";
      backBtn.style.display = "none";
      chipGroup.style.display = "none";
      submitBtn.style.display = "none";

      if (input.files) {
        var reader = new FileReader(); // create a veriable to convert to base64 format
        reader.onload = (e) => { // Define a callback function to run, when FileReader finishes 
        this.imageData = e.target.result;
        }
        reader.readAsDataURL(input.files[0]); // Start the reader and reads it as URL form 
       }
    },

    //tesseract data read
    async recognize() {
      var chipGroup = document.getElementById("resultChips");
      var descText = document.getElementById("topText");
      
      chipGroup.style.display = "none";
      descText.textContent =
        "Note: Enter information about the company name, date, description and amount";
      console.log(this.imageData);
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng", OEM.LSTM_ONLY);
      await worker.setParameters({
        tessedit_pageseg_mode: PSM.SINGLE_BLOCK,
      });
      scheduler.addWorker(worker);
      const {
        data: { text },
      } = await worker.recognize(this.imageData); //text it the output from the image
      var mytext = JSON.stringify(text); //turn the text into a string
      var textread = mytext.split(" "); //split the stringified text to be turrned into tokens
      console.log(textread);

      textread.forEach((split) => {
        console.log(split);
        split = split.replace(/\\n/g, "");
        split = split.replace(/[^A-Za-z0-9.$/]/g, "");
        console.log(split);
        this.tags.push(split);
        this.tags = [ ...new Set(this.tags) ]; //duplicate data is removed from the tags array, the ... expands a new list as an array
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
          //this.transactionsname = this.chipContent;
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

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px 20%;
}
#resultChips, #backBtn, #newImage {
    display: none;
  }
/* img {
  filter: saturate(1.1) contrast(2) grayscale(1);
} */
upload-image{
font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    padding: 20px;
}
</style>
