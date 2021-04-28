// modern Navigation bar code start here
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  //toggle nav
  burger.addEventListener("click", () => {
    console.log(nav.classList.contains("nav-active"));
    nav.classList.toggle("nav-active");

    //animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.6
        }s`;
      }
    });

    //burger animation
    burger.classList.toggle("toggle");
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches(".navigation")) return;
    nav.classList.remove("nav-active");
    burger.classList.remove("toggle");
    navLinks.forEach((link) => {
      link.style.animation = "";
    });
  });
};
navSlide();
// modern Navigation bar code stop here

//drum app start here

class Drum {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.clapAudio = document.querySelector(".clap-sound");
    this.effectAudio = document.querySelector(".effect-sound");
    this.currentKick = "./sounds/kick8.mp3";
    this.currentSnare = "./sounds/snare9.mp3";
    this.currentHihat = "./sounds/hihat4.mp3";
    this.currentClap = "./sounds/clap1.mp3";
    this.currentEffect = "./sounds/effect7.mp3";
    this.selectS = document.querySelectorAll("select");
    this.playBtn = document.querySelector(".play");
    this.index = 0;
    this.bpm = 200;
    this.play = null;
    this.muteBtnS = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.randomizeBtnS = document.querySelectorAll(".randomize");
    this.randomizeAllBtn = document.querySelector(".randomize-all");
    this.increaseBtn = document.querySelector(".increase");
    this.decreaseBtn = document.querySelector(".decrease");
    this.saveBtn = document.querySelector(".save");
  }

  // return true/false doe to the random number is odd or not
  random(x) {
    return Math.random() < x;
    // return (Math.random()*1000000000).toFixed(0) %2 ===0;
  }

  // repeating the pads in a loop.  reminder of 10 will make the step start from 0 to 9
  //and active bars will show the column of bars that they currently active
  // this keyword reffer to this object here
  repeat() {
    const padNum = document.querySelectorAll(".kick-pad").length;

    let step = this.index % padNum;
    const activeBars = document.querySelectorAll(`.b${step}`);

    // appending an animation style to the current pads and then remove them after  finishing animation by an eventlistener to repeat again

    activeBars.forEach((pad) => {
      pad.style.animation = `boomBoom 0.25s alternate ease-in-out 2`;

      // fixing the issue with repeating the song in every pad
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
        if (pad.classList.contains("clap-pad")) {
          this.clapAudio.currentTime = 0;
          this.clapAudio.play();
        }
        if (pad.classList.contains("effect-pad")) {
          this.effectAudio.currentTime = 0;
          this.effectAudio.play();
        }
      }
    });
    this.index++;
  }

  // start the loop by an interval. bpm will handle the speed of the loop
  // the arrow function here allow us to use this keyword reffering to the current object
  // this.index will reffer to the times of the loop running. so by deviding to 10 the reminder will looping between 0 - 9
  start() {
    const interval = (60 / this.bpm) * 1000;

    //check if the track now is playing or not to avoid running multiple intervals by clicking on the start btn
    //adding class active that can be usefull in when we want to check if the tracks are playing or not
    if (!this.play) {
      this.playBtn.innerText = "Stop";
      this.playBtn.classList.add("active");
      this.play = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      this.playBtn.innerText = "Play";
      this.playBtn.classList.remove("active");
      clearInterval(this.play);
      this.play = null;
    }
  }

  // toggle the class active to the pads after clicking on them
  activePad() {
    this.classList.toggle("active");
  }

  //add an eventLisener to the selects and change the songs src
  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;

    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
      case "clap-select":
        this.clapAudio.src = selectionValue;
        break;
      case "effect-select":
        this.effectAudio.src = selectionValue;
        break;
    }
  }

  // muting a song when it isn't mute and unmuting them
  //and add toggle the class active to the mute btn
  mute(e) {
    const muteName = e.target.getAttribute("data-track");
    const muteClass = e.target.classList;
    muteClass.toggle("active");
    if (muteClass.contains("active")) {
      switch (muteName) {
        case "kick":
          this.kickAudio.volume = 0;
          break;
        case "snare":
          this.snareAudio.volume = 0;
          break;
        case "hihat":
          this.hihatAudio.volume = 0;
          break;
        case "clap":
          this.clapAudio.volume = 0;
          break;
        case "effect":
          this.effectAudio.volume = 0;
          break;
      }
    } else {
      switch (muteName) {
        case "kick":
          this.kickAudio.volume = 1;
          break;
        case "snare":
          this.snareAudio.volume = 1;
          break;
        case "hihat":
          this.hihatAudio.volume = 1;
          break;
        case "clap":
          this.clapAudio.volume = 1;
          break;
        case "effect":
          this.effectAudio.volume = 1;
          break;
      }
    }
  }

  //change the bpm of the track by a slider
  //change the text parameter of the tempo in the same time
  changeTempo(e) {
    document.querySelector(".tempo-num").innerText = e.target.value;
  }
  // change the actual bpm after that user changed the slider
  // we reset all the parameter and then check if the song is now playing? if yes then we start it with new bpm and else we do nothing
  updateTempo(e) {
    this.bpm = e.target.value;
    clearInterval(this.play);
    this.play = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.classList.contains("active")) {
      this.start();
    }
  }

  // by cliking the randomize btn at first we have to undrstand which track randomized that we can know it by data-track
  //then we will get all pads of thath track and make it randomize
  randomizer(e) {
    const randomName = e.target.getAttribute("data-track");
    const randomPad = document.querySelectorAll(`.${randomName}-pad`);
    //at first we have to remove all the active classes from the track or no after 2 or 3 times all of pads will be active
    randomPad.forEach((pad) => pad.classList.remove("active"));
    //then we can randomize our pads by a very ugly way. when a pad is active, the next pad have a less chance to be active
    //by this approach we can handle over-active pads
    randomPad.forEach((el, index) => {
      if (index >= 1) {
        if (randomPad[index - 1].classList.contains("active")) {
          if (this.random(0.2)) {
            el.classList.add("active");
          }
        } else {
          if (this.random(0.5)) {
            el.classList.add("active");
          }
        }
      } else {
        if (this.random()) {
          el.classList.add("active");
        }
      }
    });
  }

  // randomize all pads. just like the randomizer()
  randomizeAll() {
    const randomPad = document.querySelectorAll(".pad");
    //at first we have to remove all the active classes from the track or no after 2 or 3 times all of pads will be active
    randomPad.forEach((pad) => pad.classList.remove("active"));
    //then we can randomize our pads by a very ugly way. when a pad is active, the next pad have a less chance to be active
    //by this approach we can handle over-active pads
    randomPad.forEach((el, index) => {
      if (index >= 1) {
        if (randomPad[index - 1].classList.contains("active")) {
          if (this.random(0.2)) {
            el.classList.add("active");
          }
        } else {
          if (this.random(0.5)) {
            el.classList.add("active");
          }
        }
      } else {
        if (this.random()) {
          el.classList.add("active");
        }
      }
    });
  }

  //increasing pads one by one . at first we get number of pads in each row and then append a new pad to them
  //to the point the new pad could toggle the active class, we have to call the active method in this method again
  increasePad() {
    let padNumber = document.querySelectorAll(".kick-pad").length;
    let trackNumber = document.querySelectorAll(".track");
    if (padNumber <= 15) {
      trackNumber.forEach((track) => {
        let dataTrack = track.getAttribute("data-track");
        let newPads = document.createElement("div");
        newPads.classList = `pad ${dataTrack}-pad b${padNumber}`;
        document.querySelector(`.${dataTrack}`).appendChild(newPads);
      });
    }
  }

  //just like the increasePad() method but we remove the last Pad every time
  decreasePad() {
    let padNumber = document.querySelectorAll(".kick-pad").length;
    let trackNumber = document.querySelectorAll(".track");

    if (padNumber >= 5) {
      trackNumber.forEach((track) => {
        track.children[padNumber - 1].remove();
      });
    }
  }

  //saving the current track
  save() {}
}

//////////////////////////////////////////
/////////////////////////////////////
////////////////////////////////
///////////////////////////
//////////////////////
/////////////////

// making a new object of the class Drum
const drum = new Drum();

//increasing the pads by click
drum.increaseBtn.addEventListener("click", function () {
  drum.increasePad();
  //update drum.pads and call the activePad eventLisener again
  drum.pads = document.querySelectorAll(".pad");
  drum.pads.forEach((pad) => {
    pad.addEventListener("click", drum.activePad);
    pad.addEventListener("animationend", function () {
      this.style.animation = "";
    });
  });
});

// just like the increase btn
drum.decreaseBtn.addEventListener("click", function () {
  drum.decreasePad();
});

//add event listener to every pad that had been clicked and make them active

drum.pads.forEach((pad) => {
  pad.addEventListener("click", drum.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

// start the loop by clicking on the play button
// we use a normal function BCS the if we just use drum.start here, the this keyword will reffer to the button in the ...
// ... start() method
drum.playBtn.addEventListener("click", function () {
  drum.start();
});

//changing the sounds when the user change it trough the select options
drum.selectS.forEach((select) => {
  select.addEventListener("change", function (e) {
    drum.changeSound(e);
  });
});

//muting the track when user clicked on the mute btn
drum.muteBtnS.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drum.mute(e);
  });
});

//changing the text of tempo slider in every moment
drum.tempoSlider.addEventListener("input", function (e) {
  drum.changeTempo(e);
});

//changing the bpm when the user changed the tempo slider
drum.tempoSlider.addEventListener("change", function (e) {
  drum.updateTempo(e);
});

//randomize every track that had been clicked on the randomize btn
drum.randomizeBtnS.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drum.randomizer(e);
  });
});

//randomize all pads
drum.randomizeAllBtn.addEventListener("click", function () {
  drum.randomizeAll();
});

drum.saveBtn.addEventListener("click", function () {
  drum.save();
});
