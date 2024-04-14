Webcam.set 
({ width:350, 
    height:300, 
    image_format : 'png', 
    png_quality:90 
}); 
camera = document.getElementById("camera");
 Webcam.attach( '#camera' );
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image"src="'+data_uri+'"/>';
    })
}
console.log("ml5 version",ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/hNSmBrJkR/model.json',modelLoaded);
function modelLoaded() { 
    console.log('Model Loaded!'); 
} function check() { 
    img = document.getElementById('captured_image'); 
    classifier.classify(img, gotResult); 
}

function gotResult(error, results) {
     if 
     (error) 
     { console.error(error); 
    } 
     else { console.log(results); 
        document.getElementById("result_object_name").innerHTML = results[0].label; 
        document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3);
        document.getElementById("result_object_remedies").innerHTML = getRemedie(results[0].label);
    }
}


function getRemedie(emotion){
    var remedies = {
        "Happy":["Be happy like this always"],
        "Sad" : ["Listen to music like :- Heat waves or any song you like","Share your feelings with somebody","Do meditation"],
        "Angry":["Count till 100","going for a walk","Read a book"],
        "Crying":["Excuse yourself and release your emotions in private","Think about something repetitious, like a poem you memorized","Focus on something else like memories,etc."]
    };
    var selectedRemedie=remedies[emotion];
    if(selectedRemedie){
        var random = Math.floor(Math.random()*selectedRemedie.length);
        return selectedRemedie[random];
    }
    else{
        return "No Remedie available"
    }
}


