<template>
	<div class="vue-app">
		<h1>Voice Input</h1><br>
		<div class="voice">
			<p id="topText">Note: Input information about the company name, date, description, amount and if the information is recurring</p> 
			<v-btn color="#1565c0" dark large v-on:click="inputSpeech" id="start">Begin voice input</v-btn>
			<v-btn color="#1565c0" dark large id="stop">Input in progress. Press to stop voice input.</v-btn>
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
			<v-chip color="red" text-color="white" @click="chipClick">Information Unavailable</v-chip>
			<v-chip v-for="tag in tags" :key="tag" @click="chipClick">{{ tag }}</v-chip>
			</v-chip-group>
			<v-btn outlined color="#1565c0" large v-on:click="goBack" id="backBtn">Go back a step</v-btn>
			<v-btn outlined color="#1565c0" large v-on:click="inputSpeech" id="restart">Re-enter voice input</v-btn>
			<div id="submitStyle">
				<v-btn color="#1565c0" dark large id="submit" router :to="{ name: 'Textinput', query: { transactions } }">Submit</v-btn>
			</div>
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

			/*
			 * The following function begins and manages the SpeechRecognition interface
			 * based on user input.
			 */
			inputSpeech () {
				var outputTxt = document.getElementById('output');
				var startBtn = document.getElementById('start');
				var stopBtn = document.getElementById('stop');
				var restartBtn = document.getElementById('restart');
				var textBox = document.getElementById('textBox');
				var chipGroup = document.getElementById('resultChips');
				var descText = document.getElementById('topText');
				var backBtn = document.getElementById('backBtn');
				var submitBtn = document.getElementById('submitStyle');
				var context = this;

				// mostly resetting CSS and variables to default
				startBtn.style.display = "none";
				restartBtn.style.display = "none";
				stopBtn.style.display = "inline";
				textBox.style.display = "block";
				chipGroup.style.display = "none";
				backBtn.style.display = "none";
				submitBtn.style.display = "none";
				outputTxt.textContent = "";
				descText.textContent = "Note: Input information about the company name, date, description, amount and if the information is recurring";
				this.count = 0;
				this.transactions = [];
				this.tags = [];

				// setting SpeechRecognition settings
				var recognition = new window.webkitSpeechRecognition
				recognition.continuous = true;
				recognition.lang = 'en-US';
				recognition.interimResults = true;
				recognition.start();
				
				recognition.onresult = function() {
					outputTxt.textContent = event.results[0][0].transcript;
				};


				/*
				 * Triggers when recognition.stop() is ran
				 */
				recognition.onspeechend = function() {
					startBtn.style.display = "none";
					stopBtn.style.display = "none";
					textBox.style.display = "none";
					restartBtn.style.display = "inline";

					// splits voice input and puts into array
					var stringifyText = outputTxt.textContent.split(" ");
					stringifyText.forEach(function(value) {
						context.tags.push(value);
					});
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


			/*
			 * The following function runs when a chip is clicked and manages functionality
			 * such as writing to the array which is passed to the next screen
			 */
			chipClick (event) {
				var descText = document.getElementById('topText');
				var backBtn = document.getElementById('backBtn');
				var restartBtn = document.getElementById('restart');
				var submitBtn = document.getElementById('submitStyle');
				var chipGroup = document.getElementById('resultChips');
				var chipSingle = event.target;
				var chipContent = chipSingle.textContent;

				// empty variable is passed if the user selects "Information Unavailable" chip
				if (chipContent.localeCompare("Information Unavailable") == 0) {
					chipContent = "";
				}

				// tracks stages of selection (eg select date, desc, company name etc)
				switch(this.count) {
					case 0:
						descText.textContent = "Please select the Date from the chips below. If there is no applicable information, select the red chip.";
						backBtn.style.display = "inline";
						submitBtn.style.display = "inline";
						break;
					case 1:
						descText.textContent = "Please select the Description from the chips below. If there is no applicable information, select the red chip.";
						break;
					case 2:
						descText.textContent = "Please select the Company Name from the chips below. If there is no applicable information, select the red chip.";
						break;
					case 3:
						descText.textContent = "Are you sure you want to submit?";
						backBtn.textContent = "Go back";
						restartBtn.style.display = "none";
						chipGroup.style.display = "none";
						break;
					}

				// validation for amount, removes the $
				if (("$".localeCompare(chipContent.charAt(0)) == 0) && (this.count == 0)) {
					chipContent = chipContent.substring(1);
				}

				this.transactions.push(chipContent);
				this.count++;
			},


			/*
			 * The following function runs when the back button is clicked and manages functionality
			 * such as removing elementss from the array which is later passed to the next screen
			 */
			goBack () {
				var descText = document.getElementById('topText');
				var backBtn = document.getElementById('backBtn');
				var restartBtn = document.getElementById('restart');
				var submitBtn = document.getElementById('submitStyle');
				var chipGroup = document.getElementById('resultChips');

				// remove last element from array
				this.transactions.splice(this.transactions.length - 1, 1);
				this.count--;

				// tracks stages of selection (eg select date, desc, company name etc)
				switch(this.count) {
					case 0:
						descText.textContent = "Please select the Total Amount from the chips below. If there is no applicable information, select the red chip.";
						backBtn.style.display = "none";
						submitBtn.style.display = "none";
						break;
					case 1:
						descText.textContent = "Please select the Date from the chips below. If there is no applicable information, select the red chip.";
						break;
					case 2:
						descText.textContent = "Please select the Description from the chips below. If there is no applicable information, select the red chip.";
						break;
					case 3:
						descText.textContent = "Please select the Company Name from the chips below. If there is no applicable information, select the red chip.";
						backBtn.textContent = "Go back a step";
						chipGroup.style.display = "inline";
						restartBtn.style.display = "inline";
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
		margin: 60px 20%;
	}
	#stop, #submitStyle, #restart, #backBtn, #resultChips {
		display: none;
	}
	#textBox {
		margin: auto;
		width: 500px;
	}
</style>
