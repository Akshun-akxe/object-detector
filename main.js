video = "";
status = "";
objects = [];

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    //canvas.center();
    canvas.parent('div-canvas');
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 480, 380);

    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (let index = 0; index < objects.length; index++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are: " + objects.length;

            fill('#FF0000');
            percent = floor(objects[index].confidence * 100);
            text(objects[index].label + " " + percent + "%", objects[index].x + 15, objects[index].y + 15);
            noFill();
            stroke('#FF0000');
            rect(objects[index].x, objects[index].y, objects[index].width, objects[index].height);
        }
    }
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecing Objects";
}

function modelLoaded() {
    console.log('Model Loaded');
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}