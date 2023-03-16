var Prediction = "";


Webcam.set({
    width : 350,    
    height: 300,
    image_format:"png",
    png_quality: 90
});
var camera = document.getElementById("camera");
Webcam.attach("#camera");
function capture_image(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = "<img id='image' src='"+data_uri+"'>";
    
    });
}
console.log("ml5.version",ml5.version);
var classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/dDTx89eh8/model.json",modelLoaded);
function modelLoaded(){
    console.log("model has been loaded");
}
function speak(){
    var synth=window.speechSynthesis;
    var speak_1="The  prediction is "+Prediction;
    
    var utterthis=new SpeechSynthesisUtterance(speak_1);
    synth.speak(utterthis);
}
function Snapshot(){
    var img = document.getElementById("image");
    classifier.classify(img, gotresult);
}
function gotresult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_1").innerHTML=results[0].label;
        
        Prediction=results[0].label;
        
        speak();
        if(Prediction=="amazing"){
            document.getElementById("emoji_1").innerHTML="&#128076";
        }
        if(Prediction=="best"){
            document.getElementById("emoji_1").innerHTML="&#128077";
        }
        if(Prediction=="victory"){
            document.getElementById("emoji_1").innerHTML="&#9996";
        }
        
    }
}
