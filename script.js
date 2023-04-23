this.chatArray = [];

function processUserInput() {
  const vApiKey = "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";
  var theprompt = document.getElementById("userInput").value;
  document.getElementById("output").innerHTML = "Processing...";
  fetch(`https://api.openai.com/v1/completions`, {
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: theprompt,
      temperature: 0,
      max_tokens: 200,
    }),
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer  " + vApiKey,
    },
  }).then((response) => {
    if (response.ok) {
      response.json().then((json) => {
        console.log(json);
        // chat array
        this.chatArray.push(document.getElementById("userInput").value);
        this.chatArray.push(json.choices[0].text);
        this.chatArray.push(document.querySelector("#formatting").checked);
        // start
        document.getElementById("output").innerHTML="";

        for (let i = 0; i < this.chatArray.length; i = i + 3) {
           //make new element
        if (this.chatArray[i+2]==true) {
          this.newQues = document.createElement("pre");
          this.newAns = document.createElement("pre");
        } else {
          this.newQues = document.createElement("p");
          this.newAns = document.createElement("p");
        }
        //let output = document.querySelector("#output");
        this.newQues.innerHTML = this.chatArray[i];
        this.newAns.innerHTML = this.chatArray[i+1];
        document.getElementById("output").appendChild(newQues);
        document.getElementById("output").appendChild(newAns);
        document.getElementById("output").appendChild(document.createElement("br"));
        }
        //end 
        //output.appendChild(newQues);
        //output.appendChild(newAns);
      });
    } else {
      document.getElementById("output").innerHTML =
        "There was some error when connecting GPT-3. Check your API key or retry later.";
    }
  });
}
