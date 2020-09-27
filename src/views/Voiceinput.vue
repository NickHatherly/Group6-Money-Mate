<template>
  <div class="vue-app">
    <h1>Voice Input</h1><br>
    <div class="voice">
        <p id="topText">Note: Enter information about the company name, date, description, amount and if the information is recurring</p> 
        <v-btn text large v-on:click="inputSpeech" id="start">Begin voice input</v-btn>
        <v-btn text large id="stop">Input in progress. Press to stop voice input.</v-btn>
        <div id="textBox">
            <v-textarea 
              id="output" 
              :rows="4" 
              :readonly="true"
              :no-resize="true"
              :outlined="true"
            ></v-textarea><br><br>
        </div>
        <v-chip-group
          column
          active-class="primary--text"
          id="resultChips"
        >
          <v-chip color="red" text-color="white" @click="chipClick"> Information Unavailable </v-chip>
          <v-chip v-for="tag in tags" :key="tag" @click="chipClick">
            {{ tag }}
          </v-chip>
        </v-chip-group>
        <v-btn text large v-on:click="goBack" id="backBtn">Go back a step</v-btn>
        <v-btn text large v-on:click="inputSpeech" id="restart">Re-enter voice input</v-btn>
        <v-btn text large id="submit" router :to="{ name: 'Textinput', query: { transactions } }">Submit</v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'voice',
    data() {
      return {
        tags: [],
        count: 0,
        transactions: []
      }
    },
    methods: {
      inputSpeech () {
        var outputTxt = document.getElementById('output');
        var startBtn = document.getElementById('start');
        var stopBtn = document.getElementById('stop');
        var restartBtn = document.getElementById('restart');
        var textBox = document.getElementById('textBox');
        var chipGroup = document.getElementById('resultChips');
        var descText = document.getElementById('topText');
        var backBtn = document.getElementById('backBtn');
        var context = this;

        startBtn.style.display = "none";
        restartBtn.style.display = "none";
        stopBtn.style.display = "inline";
        outputTxt.textContent = "";
        textBox.style.display = "inline";
        chipGroup.style.display = "none";
        backBtn.style.display = "none";
        descText.textContent = "Note: Enter information about the company name, date, description, amount and if the information is recurring";
        this.count = 0;
        this.transactions = [];
        this.tags = [];

        var recognition = new window.webkitSpeechRecognition
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.start();
        
        recognition.onresult = function() {
          outputTxt.textContent = event.results[0][0].transcript;
        };

        recognition.onspeechend = function() {
          startBtn.style.display = "none";
          stopBtn.style.display = "none";
          textBox.style.display = "none";
          restartBtn.style.display = "inline";
          var stringifyText = outputTxt.textContent.split(" ");
          stringifyText.forEach(function(value) {
            console.log(value);
            context.tags.push(value);
          })
          chipGroup.style.display = "inline";
          descText.textContent = "Please select the Total Amount from the chips below. If there is no applicable information, select the red chip."
        }

        recognition.onerror = function() {
          startBtn.style.display = "inline";
          stopBtn.style.display = "none";
          outputTxt.textContent = 'Error occurred in recognition: ' + event.error;
        }

        stopBtn.onclick = function() {
          recognition.stop();
        }
      },

      chipClick (event) {
        var descText = document.getElementById('topText');
        var backBtn = document.getElementById('backBtn');
        var restartBtn = document.getElementById('restart');
        var submitBtn = document.getElementById('submit');
        var chipGroup = document.getElementById('resultChips');

        var chipSingle = event.target;
        var chipContent = chipSingle.textContent.substring(1, chipSingle.textContent.length - 1); //Remove space that is always at the start and the end
        if (chipContent.localeCompare("Information Unavailable") == 0) {
          chipContent = "";
        }
        switch(this.count) {
          case 0:
            descText.textContent = "Please select the Date from the chips below. If there is no applicable information, select the red chip.";
            backBtn.style.display = "inline";
            break;
          case 1:
            descText.textContent = "Please select the Description from the chips below. If there is no applicable information, select the red chip.";
            break;
          case 2:
            descText.textContent = "Please select the Company Name from the chips below. If there is no applicable information, select the red chip.";
            break;
          case 3:
            descText.textContent = "Are you sure you want to submit?";
            restartBtn.style.display = "none";
            submitBtn.style.display = "inline";
            chipGroup.style.display = "none";
            backBtn.textContent = "Go back";
            break;
          }
        this.count++;
        this.transaction.push(chipContent);
        console.log(this.transactions);
      },

      goBack () {
        var descText = document.getElementById('topText');
        var backBtn = document.getElementById('backBtn');
        var restartBtn = document.getElementById('restart');
        var submitBtn = document.getElementById('submit');
        var chipGroup = document.getElementById('resultChips');

        this.transactions.splice(this.transactions.length - 1, 1);
        console.log(this.transactions);
        this.count--;
        switch(this.count) {
          case 0:
            descText.textContent = "Please select the Total Amount from the chips below. If there is no applicable information, select the red chip.";
            backBtn.style.display = "none";
            break;
          case 1:
            descText.textContent = "Please select the Date from the chips below. If there is no applicable information, select the red chip.";
            break;
          case 2:
            descText.textContent = "Please select the Description from the chips below. If there is no applicable information, select the red chip.";
            break;
          case 3:
            descText.textContent = "Please select the Company Name from the chips below. If there is no applicable information, select the red chip.";
            chipGroup.style.display = "inline";
            submitBtn.style.display = "none";
            restartBtn.style.display = "inline";
            backBtn.textContent = "Go back a step";
            break;
        }
      }
    }
  }
</script>

<style scoped>
  .vue-app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    margin-top: 60px;
  }
  #stop, #legend, #submit, #restart, #backBtn, #submit, #resultChips {
    display: none;
  }
  #textBox {
    margin: auto;
    width: 30%;
  }
</style>
