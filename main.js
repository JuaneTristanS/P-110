prediction1 = "";
prediction2 = "";

Webcam.set({
    height: 300,
    width: 320,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("cam");

Webcam.attach(camera);

function snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_img" src=" ' + data_uri + ' "> ';
    });

}

console.log("ml5 version :", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Gge6jqmHy/model.json', loaded);

function loaded() {
    console.log("model is loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    data_prediction1 = prediction1 + "is prediction 1";
    data_prediction2 = prediction2 + "is prediction 2";
    var utterance = new SpeechSynthesisUtterance(data_prediction1+data_prediction2);
    synth.speak(utterance);
}

function identify() {
    img = document.getElementById('captured_img');
    classifier.classify(img, gotImage);
}

function gotImage(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById('result_emotion_name').innerHTML = results[0].label;
        document.getElementById('result_emotion_name2').innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(result[0].label == "angry") {
            document.getElementById("emoji1").innerHTML = "😡";
        }
        if(result[0].label == "sad") {
            document.getElementById("emoji1").innerHTML = "😞";
        }
        if(result[0].label == "happy") {
            document.getElementById("emoji1").innerHTML = "😄";
        }
        if(result[0].label == "crying") {
            document.getElementById("emoji1").innerHTML = "😢";
        }

        if(result[1].label == "angry") {
            document.getElementById("emoji2").innerHTML = "😡";
        }
        if(result[1].label == "sad") {
            document.getElementById("emoji2").innerHTML = "😞";
        }
        if(result[1].label == "happy") {
            document.getElementById("emoji2").innerHTML = "😄";
        }
        if(result[1].label == "crying") {
            document.getElementById("emoji2").innerHTML = "😢";
        }
    }

}