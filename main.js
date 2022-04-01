prediction1="";
prediction2="";
Webcam.set({
    width:350,height:300,image_fornat:'png',png_quality:90
});
cam=document.getElementById("camera");
Webcam.attach('#camera');
function snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="A_angry"src="'+data_uri+'"/>';
    });
}
console.log('ml5',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6aEnc9TM2/model.json',modelLoaded);
function modelLoaded(){
    console.log('modalLoaded');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="you are"+prediction1;
    speak_data_2="you are"+prediction2;
    var utter=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utter);
}
function check(){
    img=document.getElementById('A_angry');
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
if(error){
    console.error(error);
}else{
    console.log(results);
    document.getElementById("emotion1").innerHTML=results[0].label;
    document.getElementById("emotion2").innerHTML=results[1].label;
    speak();
    if(results[0].label=="happy"){
        document.getElementById("emoji1").innerHTML="&#128522;";
    }
    if(results[0].label=="mad"){
        document.getElementById("emoji1").innerHTML="&#128548;";
    }
    if(results[0].label=="Laughing"){
        document.getElementById("emoji1").innerHTML="&#128514;";
    }
    if(results[0].label=="sad"){
        document.getElementById("emoji1").innerHTML="&#128532;";
    }

    if(results[1].label=="happy"){
        document.getElementById("emoji2").innerHTML="&#128522;";
    }
    if(results[1].label=="mad"){
        document.getElementById("emoji2").innerHTML="&#128548;";
    }
    if(results[1].label=="Laughing"){
        document.getElementById("emoji2").innerHTML="&#128514;";
    }
    if(results[1].label=="sad"){
        document.getElementById("emoji2").innerHTML="&#128532;";
    }
}
}