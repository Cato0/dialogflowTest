function say(text) {
    responsiveVoice.speak(text, "UK English Male");
}

function listen() {
    var recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;
    recognition.onresult = function(event) {
        if(event.results.length > 0) {
            $("#stuff").text(results[0][0].transcript);
        }
    }
    recognition.onend = function(event) {
        say($("#stuff").text());
    }
}

function postVoice(message) {
    $.ajax({
        type: "POST",
        url: "localhost:8000/voice",
        data: 
            message: message
        },
        success: function(data) {
            $("#stuff").text(data.message)
            say(data.message)
        }
    })
}
