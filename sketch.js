// defines sound variables
let song;
let markov = new Markov("numeric");
let monoSynth;
let genNote = 79

// define nose detection variables
let video;
let poseNet; 
let poses = [];
let skeletons = [];
let pg;
let noseX;
let noseY;
let pNoseX;
let pNoseY;

//--------------------------PRELOAD RESOURCES FUNCTION------------------------------------------

function preload() {  

  song = loadJSON('amelie.json');
  ambience = loadSound('space.mp3');
  bgmusic = loadSound('nature.mp3');
  bg = loadImage('bg2.png');
}

 //--------------------------------------FUNCTION SETUP----------------------------------------
function setup() {
  //general definitions
  var canvas= createCanvas(800, 600);
  canvas.parent('sketch-holder');
  frameRate(3);
  
  //audio definitions
  ambience.setVolume(0.1)
  ambience.loop();
  bgmusic.setVolume(0.1)
  bgmusic.loop();
  monoSynth = new p5.MonoSynth();
  reverb = new p5.Reverb();
  
  let nrEvents = song.tracks[20].notes.length - 1;
  for(let i=0; i < nrEvents; i++){
    note = song.tracks[20].notes[i].midi;
    nextNote = song.tracks[20].notes[i+1].midi;
    markov.addStates({ state: note, predictions: [nextNote]});       
  }
    markov.train(); // Train the Markov Chain (first order)
    //let possibilities = markov.getPossibilities();
    // print(possibilities);
  
  //VIDEO settings
   //creates Video Function
      video = createCapture(VIDEO);
      video.size(width, height);
      pixelDensity(1);
      pg = createGraphics(width, height);

      //Evokes ml5 that allows nose capture
      poseNet = ml5.poseNet(video, modelReady);
      poseNet.on('pose', function(results) {
        poses = results;
      });

      // Hide the video element, and just show the canvas
      video.hide();
}

 //--------------------------FUNCTION DRAW---------------------------------
function draw() {
  background(bg)

  
  
    //Markov and generates audio
  
    let frequency = midiToFreq(genNote);
    reverb.process(monoSynth,3,1);
    
      //inverts the lines to match real life
      push();
      translate(width,0);
      scale(-1, 1);
      image(pg, 0, 0, width, height);
  
      //Detects and drawsKeypoints
      drawKeypoints();
      function drawKeypoints() {
        // Loop through all the poses detected
        for (let i = 0; i < min(poses.length, 1); i++) {
          // For each pose detected, loop through all the keypoints
          for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = poses[i].pose.keypoints[j];
              // Only draw an ellipse is the pose probability is bigger than 0.2
              if (keypoint.score > 0.2) {
                if (j == 0) {
                  noseX = keypoint.position.x;
                  noseY = keypoint.position.y;
                  pg.strokeWeight(20);
                  pg.line(noseX, noseY, pNoseX, pNoseY);
                  pNoseX = noseX;
                  pNoseY = noseY;
                }
              }
            }
          }
        }
  
      //reverses the invert effect so it doesn't affect the other elements
      scale(-1, 1);
  
      //If noseX 0-100
      if(noseX>0 && noseX<100 && noseY>0 && noseY<100){
        notasC=60;
        genNote=random(notasC);
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 1, 0, 0);
        pg.stroke(129,187,252);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
      else if(noseX>0 && noseX<100 && noseY>100 && noseY<200){
        notasC=60;
        genNote=random(notasC);
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 0.8, 0, 0);
        pg.stroke(99,157,232);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>0 && noseX<100 && noseY>200 && noseY<300){
        notasC=60;
        genNote=random(notasC);
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 0.6, 0, 0);
        pg.stroke(73,127,212);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>0 && noseX<100 && noseY>300 && noseY<400){
        notasC=60;
        genNote=random(notasC);
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 0.4, 0, 0);
        pg.stroke(50,98,190);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>0 && noseX<100 && noseY>400 && noseY<500){
        notasC=60;
        genNote=random(notasC);
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 0.2, 0, 0);
        pg.stroke(29,69,167);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>0 && noseX<100 && noseY>500 && noseY<600){
        notasC=60;
        genNote=random(notasC);
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 0, 0, 0);
        pg.stroke(12,39,142);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
  
      //If noseX 100-200
      else if(noseX>100 && noseX<200 && noseY>0 && noseY<100){
        genNote=72;
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 1, 0, 0);
        pg.stroke(141,185,255);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>100 && noseX<200 && noseY>100 && noseY<200){
        genNote=72;
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 0.8, 0, 0);
        pg.stroke(114,156,237);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>100 && noseX<200 && noseY>200 && noseY<300){
        genNote=72;
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 0.6, 0, 0);
        pg.stroke(90,127,218);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>100 && noseX<200 && noseY>300 && noseY<400){
        genNote=72;
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 0.4, 0, 0);
        pg.stroke(70,99,198);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>100 && noseX<200 && noseY>400 && noseY<500){
        genNote=72;
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 0.2, 0, 0);
        pg.stroke(53,70,177);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>100 && noseX<200 && noseY>500 && noseY<600){
        genNote=72;
        genNote= markov.predict(genNote);
        monoSynth.play(frequency, 0, 0, 0);
        pg.stroke(39,40,154);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
  
      //If noseX 300-400
      else if(noseX>200 && noseX<300 && noseY>0 && noseY<100){
        genNote=76;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 1, 0, 0);
        pg.stroke(154,183,255);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>200 && noseX<300 && noseY>100 && noseY<200){
        genNote=76;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.8, 0, 0);
        pg.stroke(129,155,240);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>200 && noseX<300 && noseY>200 && noseY<300){
        genNote=76;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.6, 0, 0);
        pg.stroke(109,127,223);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>200 && noseX<300 && noseY>300 && noseY<400){
        genNote=76;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.4, 0, 0);
        pg.stroke(88,100,206);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>200 && noseX<300 && noseY>400 && noseY<500){
        genNote=76;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.2, 0, 0);
        pg.stroke(73,71,188);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>200 && noseX<300 && noseY>500 && noseY<600){
        genNote=76;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0, 0, 0);
        pg.stroke(59,41,166);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
  
    //If noseX 300-400
      else if(noseX>300 && noseX<400 && noseY>0 && noseY<100){
        genNote=84;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 1, 0, 0);
        pg.stroke(169,180,255);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
       else if(noseX>300 && noseX<400 && noseY>100 && noseY<200){
        genNote=84;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.8, 0, 0);
        pg.stroke(147,153,242);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>300 && noseX<400 && noseY>200 && noseY<300){
        genNote=84;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.6, 0, 0);
        pg.stroke(127,126,228);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
       else if(noseX>300 && noseX<400 && noseY>300 && noseY<400){
        genNote=84;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.4, 0, 0);
        pg.stroke(109,99,213);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>300 && noseX<400 && noseY>400 && noseY<500){
        genNote=84;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.2, 0, 0);
        pg.stroke(93,71,197);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>300 && noseX<400 && noseY>500 && noseY<600){
        genNote=84;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0, 0, 0);
        pg.stroke(79,40,178);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
      
  //If noseX 400-500
      else if(noseX>400 && noseX<500 && noseY>0 && noseY<100){
        genNote=79;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 1, 0, 0);
        pg.stroke(186,177,255);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>400 && noseX<500 && noseY>100 && noseY<200){
        genNote=79;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.8, 0, 0);
        pg.stroke(166,151,244);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>400 && noseX<500 && noseY>200 && noseY<300){
        genNote=79;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.6, 0, 0);
        pg.stroke(147,124,231);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>400 && noseX<500 && noseY>300 && noseY<400){
        genNote=79;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.4, 0, 0);
        pg.stroke(130,98,218);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>400 && noseX<500 && noseY>400 && noseY<500){
        genNote=79;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.2, 0, 0);
        pg.stroke(113,70,206);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>400 && noseX<500 && noseY>500 && noseY<600){
        genNote=79;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0, 0, 0);
        pg.stroke(98,37,188);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
  
   //If noseX 500-600
      else if(noseX>500 && noseX<600 && noseY>0 && noseY<100){
        genNote=81;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 1, 0, 0);
        pg.stroke(202,173,255);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>500 && noseX<600 && noseY>100 && noseY<200){
        genNote=81;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.8, 0, 0);
        pg.stroke(184,147,245);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>500 && noseX<600 && noseY>200 && noseY<300){
        genNote=81;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.6, 0, 0);
        pg.stroke(167,121,234);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>500 && noseX<600 && noseY>300 && noseY<400){
        genNote=81;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.4, 0, 0);
        pg.stroke(151,95,223);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>500 && noseX<600 && noseY>400 && noseY<500){
        genNote=81;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.2, 0, 0);
        pg.stroke(134,67,213);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>500 && noseX<600 && noseY>500 && noseY<600){
        genNote=81;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0, 0, 0);
        pg.stroke(118,32,198);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
  
     //If noseX 600-700
      else if(noseX>600 && noseX<700 && noseY>0 && noseY<100){
        genNote=69;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 1, 0, 0);
        pg.stroke(129,187,252);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>600 && noseX<700 && noseY>100 && noseY<200){
        genNote=69;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.8, 0, 0);
        pg.stroke(219,168,255);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>600 && noseX<700 && noseY>200 && noseY<300){
        genNote=69;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.6, 0, 0);
        pg.stroke(204,143,246);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>600 && noseX<700 && noseY>300 && noseY<400){
        genNote=69;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.4, 0, 0);
        pg.stroke(172,91,228);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>600 && noseX<700 && noseY>400 && noseY<500){
        genNote=69;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.2, 0, 0);
        pg.stroke(155,62,218);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>600 && noseX<700 && noseY>500 && noseY<600){
        genNote=69;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0, 0, 0);
        pg.stroke(138,23,208);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
  
    //If noseX 700-800
      else if(noseX>700 && noseX<800 && noseY>0 && noseY<100){
        genNote=71;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 1, 0, 0);
        pg.stroke(236,163,255);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>700 && noseX<8000 && noseY>100 && noseY<200){
        genNote=71;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.8, 0, 0);
        pg.stroke(222,138,247);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>700 && noseX<800 && noseY>200 && noseY<300){
        genNote=71;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.6, 0, 0);
        pg.stroke(297,112,239);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>700 && noseX<800 && noseY>300 && noseY<400){
        genNote=71;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.4, 0, 0);
        pg.stroke(192,86,231);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
       else if(noseX>700 && noseX<800 && noseY>400 && noseY<500){
        genNote=71;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0.2, 0, 0)
        pg.stroke(175,55,224);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
        else if(noseX>700 && noseX<800 && noseY>500 && noseY<600){
        genNote=71;
        genNote = markov.predict(genNote);
        monoSynth.play(frequency, 0, 0, 0);
        pg.stroke(158,0,216);
        pg.line(noseX, noseY, pNoseX, pNoseY);
      }
}
 //---------------------------OTHER FUNCTIONS-----------------------------


function modelReady() {
  select('#status').html('model Loaded');
}
