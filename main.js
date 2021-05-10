Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("webcam-view");

Webcam.attach('webcam-view');

function takePicture(){
    Webcam.snap(function(data_uri){
        document.getElementById("webcam-result").innerHTML = '<img id="captured_image" src="'+data_uri+'">';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tSDg8qd6-/model.json",modelLoaded);

function modelLoaded(){
    console.log("model is loaded")
}

function checkPicture(){
    img = document.getElementById('captured_image');
    classifier.classify(img, getResult);
}

function getResult(error, results){
    if (error){
        console.error(error);
    }
    if(results){
        console.log(results);
        document.getElementById("object_name").innerHTML = results[0].label;
        document.getElementById("object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}


