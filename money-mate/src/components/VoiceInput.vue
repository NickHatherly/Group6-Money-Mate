<template>
  <div class="vue-app">
    <h1>Voice Input</h1>
    <div class="voice">
        <button v-on:click="inputSpeech" id="start">Begin voice input</button>
        <button id="stop">Input in progress. Press to stop voice input.</button><br><br>
        <textarea id="output" name="output" rows="4" cols="50"></textarea><br><br>
        <button id="legend">Show legend</button><br><br>
        <button v-on:click="submitInput" id="submit">Submit</button><br><br>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'voice',
    methods: {
      inputSpeech: function() {
        var outputTxt = document.getElementById('output');
        var startBtn = document.getElementById('start');
        var stopBtn = document.getElementById('stop');
        var legendBtn = document.getElementById('legend');
        var submitBtn = document.getElementById('submit');

        startBtn.style.display = "none";
        stopBtn.style.display = "inline";
        outputTxt.textContent = '';
        outputTxt.style.fontWeight = "normal";
        legendBtn.style.display = "none";
        submitBtn.style.display = "none";

        var recognition = new window.webkitSpeechRecognition
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.start();
        
        recognition.onresult = function() {
          outputTxt.textContent = event.results[0][0].transcript;
        };

        recognition.onspeechend = function() {
          outputTxt.style.fontWeight = "bold";
          startBtn.style.display = "inline";
          stopBtn.style.display = "none";
          legendBtn.style.display = "inline";
          submitBtn.style.display = "inline";
          var stringifyText = outputTxt.textContent.split(" ");
          var i;
          for (i = 0; i < stringifyText.length; i++) {
            console.log(stringifyText[i]);
          }
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
      submitInput: function() {
        
      }
    }
  }
</script>

<style scoped>
  #stop, #legend, #submit {
    display: none;
  }
</style>