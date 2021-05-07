// modern Navigation bar code start here
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  //toggle nav
  burger.addEventListener("click", () => {
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

// modal form for saving start here

const modal = document.querySelector(".main-modal");
const modalCloseBtn = document.querySelector(".modal-close");

//closing modal
function modalClose() {
  modal.classList.remove("fadeIn");
  modal.classList.add("fadeOut");
  setTimeout(() => {
    modal.style.display = "none";
  }, 800);
}
//openning modal
document.querySelector(".save").addEventListener("click", function () {
  modal.classList.remove("fadeOut");
  modal.classList.add("fadeIn");
  modal.style.display = "flex";
});

modalCloseBtn.addEventListener("click", function (e) {
  modalClose();
});

window.addEventListener("click", function (e) {
  if (e.target == modal) {
    modalClose();
  }
});

// modal form for saving finish here

// modal form for loading start here

const modalLoad = document.querySelector(".main-modal-load");
const modalLoadCloseBtn = document.querySelector(".modal-close-load");

function modalCloseLoad() {
  modalLoad.classList.remove("fadeIn");
  modalLoad.classList.add("fadeOut");
  setTimeout(() => {
    modalLoad.style.display = "none";
  }, 800);
}

document.querySelector(".load").addEventListener("click", function () {
  modalLoad.classList.remove("fadeOut");
  modalLoad.classList.add("fadeIn");
  modalLoad.style.display = "flex";
});

modalLoadCloseBtn.addEventListener("click", function (e) {
  modalCloseLoad();
});

window.addEventListener("click", function (e) {
  if (e.target == modalLoad) {
    modalCloseLoad();
  }
});

// modal form for loading finish here

// modal for confirm clearing start here

const modalConfirm = document.querySelector(".main-modal-confirm");
const modalConfirmCloseBtn = document.querySelector(".modal-close-confirm");

function modalConfirmClose() {
  modalConfirm.classList.remove("fadeIn");
  modalConfirm.classList.add("fadeOut");
  setTimeout(() => {
    modalConfirm.style.display = "none";
  }, 800);
}

document.querySelector(".clear-all").addEventListener("click", function () {
  modalConfirm.classList.remove("fadeOut");
  modalConfirm.classList.add("fadeIn");
  modalConfirm.style.display = "flex";
});

modalConfirmCloseBtn.addEventListener("click", function (e) {
  modalConfirmClose();
});

window.addEventListener("click", function (e) {
  if (e.target == modalConfirm) {
    modalConfirmClose();
  }
});

// modal for confirm clearing finish here

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
    this.volumeBtnS = document.querySelectorAll(".volume");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.randomizeBtnS = document.querySelectorAll(".randomize");
    this.randomizeAllBtn = document.querySelector(".randomize-all");
    this.increaseBtn = document.querySelector(".increase");
    this.decreaseBtn = document.querySelector(".decrease");
    this.saveBtn = document.querySelector("#save-btn-form");
    this.clearBtn = document.querySelector("#confirm-clear");
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

  //hovering sound icon will showing a tooltip that will open a range slider for volume
  //we take the volume by input listener and change it via this method
  volume(e) {
    const dataTrack = e.target.getAttribute("data-track");
    //we have to make it a number between 0 to 1 to assign it to the volume
    const volume = e.target.value / 100;
    switch (dataTrack) {
      case "kick":
        this.kickAudio.volume = volume;
        break;
      case "snare":
        this.snareAudio.volume = volume;
        break;
      case "hihat":
        this.hihatAudio.volume = volume;
        break;
      case "clap":
        this.clapAudio.volume = volume;
        break;
      case "effect":
        this.effectAudio.volume = volume;
        break;
    }
  }

  //changing the text of span to show input value oninput
  volumeNum(e) {
    let volumeNum = e.target.nextElementSibling;
    volumeNum.innerText = e.target.value;
  }

  //change the bpm of the track by a slider
  //change the text parameter of the tempo in the same time
  changeTempo(e) {
    document.querySelector(".tempo-num").innerText = e;
  }
  // change the actual bpm after that user changed the slider
  // we reset all the parameter and then check if the song is now playing? if yes then we start it with new bpm and else we do nothing
  updateTempo(e) {
    this.bpm = e;
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
  //BCS of complication of this method we add comment to every section
  save(trackName) {
    // we get all the pad when the method execute
    const currentPads = document.querySelectorAll(".pad");
    //we cant push a nodeList into Local storage . so we have to change it to an array by this mehtod first
    //we push the outer html to an array
    //we added new-save class to add the new saved track to add an eventListener to them
    const newArr = [];
    currentPads.forEach((el) => {
      el.classList.remove("new-save");
      newArr.push(el.outerHTML);
    });

    //then we push volume and tracknumbers to end of the array and then we push tempo
    newArr.push(document.querySelector(".effect-volume").value / 100);
    newArr.push(document.querySelector(".clap-volume").value / 100);
    newArr.push(document.querySelector(".hihat-volume").value / 100);
    newArr.push(document.querySelector(".snare-volume").value / 100);
    newArr.push(document.querySelector(".kick-volume").value / 100);
    newArr.push(document.querySelector("#kick-select").value);
    newArr.push(document.querySelector("#snare-select").value);
    newArr.push(document.querySelector("#hihat-select").value);
    newArr.push(document.querySelector("#clap-select").value);
    newArr.push(document.querySelector("#effect-select").value);
    let tempo = document.querySelector(".tempo-num").textContent;
    tempo = Number(tempo);
    newArr.push(tempo);
    //after pushing all value we need. then we save it to local storage by the chosen name
    localStorage.setItem(`${trackName}`, JSON.stringify(newArr));

    //showing the saved track in loading page
    //after loading the page all saved track will be shown in the load page but if we want to show the new saved track too, then we need to add it here
    const item = document.createElement("div");
    item.innerText = trackName;
    item.classList.add("track-load-style");
    item.classList.add("new-save");
    document.querySelector(".your-tracks-content").appendChild(item);
    //add the event listener to the new saved track
    const loadContent = document.querySelectorAll(".new-save");
    loadContent.forEach((el) => {
      el.addEventListener("click", (track) => {
        const loadTrack = track.target.textContent;
        //then we call the load method if user click on the track name
        this.load(loadTrack);
      });
    });
  }

  //loading a track
  //this is a complicated method so we will add comment in every section
  load(trackName) {
    //we get all current pads to prepare the stage for loading
    let pads = document.querySelectorAll(".pad");
    //we will remove all the current activated pad to prepare the stage for loading
    pads.forEach((pad) => {
      pad.classList.remove("active");
    });
    //then we get the clicked track from local storage and make it an array again
    let trackArray = JSON.parse(localStorage.getItem(trackName));
    //removing the last element and assign it to a varible
    let tempo = trackArray.pop();
    let effectSrc = trackArray.pop();
    this.effectAudio.src = effectSrc;
    let clapSrc = trackArray.pop();
    this.clapAudio.src = clapSrc;
    let hihatSrc = trackArray.pop();
    this.hihatAudio.src = hihatSrc;
    let snareSrc = trackArray.pop();
    this.snareAudio.src = snareSrc;
    let kickSrc = trackArray.pop();
    this.kickAudio.src = kickSrc;

    //changing the sound volume by loaded value and then changing the number that showing in the span
    let kickVolume = trackArray.pop();
    this.kickAudio.volume = kickVolume;
    document.querySelector(".kick-volume").value = kickVolume * 100;
    document.querySelector(".kick-volume").nextElementSibling.innerText =
      kickVolume * 100;

    let snareVolume = trackArray.pop();
    this.snareAudio.volume = snareVolume;
    document.querySelector(".snare-volume").value = snareVolume * 100;
    document.querySelector(".snare-volume").nextElementSibling.innerText =
      snareVolume * 100;

    let hihatVolume = trackArray.pop();
    this.hihatAudio.volume = hihatVolume;
    document.querySelector(".hihat-volume").value = hihatVolume * 100;
    document.querySelector(".hihat-volume").nextElementSibling.innerText =
      hihatVolume * 100;

    let clapVolume = trackArray.pop();
    this.clapAudio.volume = clapVolume;
    document.querySelector(".clap-volume").value = clapVolume * 100;
    document.querySelector(".clap-volume").nextElementSibling.innerText =
      clapVolume * 100;

    let effectVolume = trackArray.pop();
    this.effectAudio.volume = effectVolume;
    document.querySelector(".effect-volume").value = effectVolume * 100;
    document.querySelector(".effect-volume").nextElementSibling.innerText =
      effectVolume * 100;

    // change what the select input showing to us
    document.querySelectorAll("select").forEach((select) => {
      //taking number of options
      let optionLength = select.options.length;
      //evaluate every options and if the option src was equal to the loaded one then we assign the i to the input selectedIndex
      for (let i = 0; i < optionLength; i++) {
        if (select.options[i].value == kickSrc) {
          select.options.selectedIndex = i;
        } else if (select.options[i].value == snareSrc) {
          select.options.selectedIndex = i;
        } else if (select.options[i].value == hihatSrc) {
          select.options.selectedIndex = i;
        } else if (select.options[i].value == clapSrc) {
          select.options.selectedIndex = i;
        } else if (select.options[i].value == effectSrc) {
          select.options.selectedIndex = i;
        }
      }
    });

    //we want to make number of pads as number of the loaded track to activate them
    //so first we calculate the number of pad in every row
    let loadLength = trackArray.length;
    let lengthDiffrence = (loadLength - pads.length) / 5;
//then we check if the pads are more than the loaded one we call the increasePad() method by a for loop and same for less pad than loaded one
    if (lengthDiffrence > 0) {
      for (let i = lengthDiffrence; i > 0; i--) {
        this.increasePad();
      }
    } else {
      for (let i = lengthDiffrence; i < 0; i++) {
        this.decreasePad();
      }
    }
    //after increasing or decreasing pads then we have to get current pads again
    pads = document.querySelectorAll(".pad");
    //then for every element in trackArray that have active  class we add active class to the same index pad in pads nodeList
    //BCS if the element not contain the active class will return a negative value (-1) so we put this if statement to get active pads
    trackArray.forEach((el, index) => {
      if (el.indexOf("active") >= 0) {
        pads[index].classList.add("active");
      }
    });

    //change the tempo value by the value of the loaded track
    this.changeTempo(tempo);
    this.updateTempo(tempo);
    this.tempoSlider.value = tempo;
    //we will close the modal after user clicking on a track name
    modalCloseLoad();

    //update drum.pads and call the activePad eventLisener again
    //BCS the new pads that added by increasePad() method have not the click listener so we have to add this event listener again (and the animation listener too)
    drum.pads = document.querySelectorAll(".pad");
    drum.pads.forEach((pad) => {
      pad.addEventListener("click", drum.activePad);
      pad.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });
  }

  //remove the active class from all pads
  clearActive() {
    let pads = document.querySelectorAll(".pad");
    pads.forEach((pad) => {
      pad.classList.remove("active");
    });
  }

  //this method is same as the load() method. so we just add comment to new option here
  loadSamples(trackName) {
    //we add some song for example
    const weWillRockYou = [
      "pad kick-pad b0 active",
      "pad kick-pad b1 active",
      "pad kick-pad b2",
      "pad kick-pad b3",
      "pad kick-pad b4 active",
      "pad kick-pad b5 active",
      "pad kick-pad b6",
      "pad kick-pad b7",
      "pad snare-pad b0",
      "pad snare-pad b1",
      "pad snare-pad b2 active",
      "pad snare-pad b3",
      "pad snare-pad b4",
      "pad snare-pad b5",
      "pad snare-pad b6 active",
      "pad snare-pad b7",
      "pad hihat-pad b0",
      "pad hihat-pad b1",
      "pad hihat-pad b2",
      "pad hihat-pad b3 active",
      "pad hihat-pad b4",
      "pad hihat-pad b5",
      "pad hihat-pad b6",
      "pad hihat-pad b7",
      "pad clap-pad b0",
      "pad clap-pad b1",
      "pad clap-pad b2 active",
      "pad clap-pad b3",
      "pad clap-pad b4",
      "pad clap-pad b5",
      "pad clap-pad b6 active",
      "pad clap-pad b7",
      "pad effect-pad b0",
      "pad effect-pad b1",
      "pad effect-pad b2",
      "pad effect-pad b3 active",
      "pad effect-pad b4",
      "pad effect-pad b5",
      "pad effect-pad b6",
      "pad effect-pad b7",
      1,
      1,
      1,
      1,
      1,
      "./sounds/kick8.mp3",
      "./sounds/snare5.mp3",
      "./sounds/hihat4.mp3",
      "./sounds/clap1.mp3",
      "./sounds/effect7.mp3",
      170,
    ];
    const hipHop68 = [
      "pad kick-pad b0",
      "pad kick-pad b1 active",
      "pad kick-pad b2",
      "pad kick-pad b3",
      "pad kick-pad b4 active",
      "pad kick-pad b5",
      "pad kick-pad b6",
      "pad kick-pad b7 active",
      "pad snare-pad b0",
      "pad snare-pad b1 active",
      "pad snare-pad b2",
      "pad snare-pad b3",
      "pad snare-pad b4",
      "pad snare-pad b5 active",
      "pad snare-pad b6",
      "pad snare-pad b7",
      "pad hihat-pad b0",
      "pad hihat-pad b1 active",
      "pad hihat-pad b2",
      "pad hihat-pad b3",
      "pad hihat-pad b4",
      "pad hihat-pad b5 active",
      "pad hihat-pad b6",
      "pad hihat-pad b7",
      "pad clap-pad b0",
      "pad clap-pad b1",
      "pad clap-pad b2",
      "pad clap-pad b3",
      "pad clap-pad b4",
      "pad clap-pad b5",
      "pad clap-pad b6",
      "pad clap-pad b7",
      "pad effect-pad b0",
      "pad effect-pad b1",
      "pad effect-pad b2",
      "pad effect-pad b3",
      "pad effect-pad b4",
      "pad effect-pad b5",
      "pad effect-pad b6",
      "pad effect-pad b7",
      1,
      1,
      1,
      1,
      1,
      "./sounds/kick1.mp3",
      "./sounds/snare4.mp3",
      "./sounds/hihat7.mp3",
      "./sounds/clap1.mp3",
      "./sounds/effect7.mp3",
      300,
    ];
// Atefeh is my girlfriend and all of these sample songs created by her. she is a good musician. her musical instrument is Daf.
    const heartOfAtefeh = [
      "pad kick-pad b0 active",
      "pad kick-pad b1",
      "pad kick-pad b2",
      "pad kick-pad b3 active",
      "pad kick-pad b4",
      "pad kick-pad b5",
      "pad kick-pad b6",
      "pad kick-pad b7",
      "pad kick-pad b8 active",
      "pad kick-pad b9",
      "pad kick-pad b10",
      "pad kick-pad b11 active",
      "pad kick-pad b12",
      "pad kick-pad b13",
      "pad kick-pad b14",
      "pad kick-pad b15",
      "pad snare-pad b0",
      "pad snare-pad b1 active",
      "pad snare-pad b2",
      "pad snare-pad b3",
      "pad snare-pad b4",
      "pad snare-pad b5",
      "pad snare-pad b6 active",
      "pad snare-pad b7",
      "pad snare-pad b8",
      "pad snare-pad b9 active",
      "pad snare-pad b10",
      "pad snare-pad b11",
      "pad snare-pad b12 active",
      "pad snare-pad b13",
      "pad snare-pad b14",
      "pad snare-pad b15",
      "pad hihat-pad b0",
      "pad hihat-pad b1",
      "pad hihat-pad b2 active",
      "pad hihat-pad b3",
      "pad hihat-pad b4 active",
      "pad hihat-pad b5 active",
      "pad hihat-pad b6",
      "pad hihat-pad b7",
      "pad hihat-pad b8",
      "pad hihat-pad b9",
      "pad hihat-pad b10 active",
      "pad hihat-pad b11",
      "pad hihat-pad b12",
      "pad hihat-pad b13",
      "pad hihat-pad b14",
      "pad hihat-pad b15",
      "pad clap-pad b0",
      "pad clap-pad b1",
      "pad clap-pad b2",
      "pad clap-pad b3",
      "pad clap-pad b4 active",
      "pad clap-pad b5",
      "pad clap-pad b6",
      "pad clap-pad b7",
      "pad clap-pad b8",
      "pad clap-pad b9",
      "pad clap-pad b10",
      "pad clap-pad b11",
      "pad clap-pad b12",
      "pad clap-pad b13",
      "pad clap-pad b14",
      "pad clap-pad b15",
      "pad effect-pad b0",
      "pad effect-pad b1",
      "pad effect-pad b2",
      "pad effect-pad b3",
      "pad effect-pad b4",
      "pad effect-pad b5",
      "pad effect-pad b6 active",
      "pad effect-pad b7",
      "pad effect-pad b8",
      "pad effect-pad b9",
      "pad effect-pad b10",
      "pad effect-pad b11",
      "pad effect-pad b12",
      "pad effect-pad b13",
      "pad effect-pad b14",
      "pad effect-pad b15",
      1,
      1,
      1,
      1,
      1,
      "./sounds/kick2.mp3",
      "./sounds/snare3.mp3",
      "./sounds/hihat2.mp3",
      "./sounds/clap2.mp3",
      "./sounds/effect7.mp3",
      300,
    ];
    const tryAgain = [
      "pad kick-pad b0",
      "pad kick-pad b1",
      "pad kick-pad b2",
      "pad kick-pad b3 active",
      "pad kick-pad b4",
      "pad kick-pad b5",
      "pad kick-pad b6",
      "pad kick-pad b7",
      "pad snare-pad b0",
      "pad snare-pad b1 active",
      "pad snare-pad b2",
      "pad snare-pad b3",
      "pad snare-pad b4",
      "pad snare-pad b5",
      "pad snare-pad b6",
      "pad snare-pad b7",
      "pad hihat-pad b0 active",
      "pad hihat-pad b1",
      "pad hihat-pad b2 active",
      "pad hihat-pad b3",
      "pad hihat-pad b4 active",
      "pad hihat-pad b5",
      "pad hihat-pad b6",
      "pad hihat-pad b7",
      "pad clap-pad b0",
      "pad clap-pad b1",
      "pad clap-pad b2",
      "pad clap-pad b3",
      "pad clap-pad b4 active",
      "pad clap-pad b5",
      "pad clap-pad b6",
      "pad clap-pad b7",
      "pad effect-pad b0",
      "pad effect-pad b1",
      "pad effect-pad b2",
      "pad effect-pad b3",
      "pad effect-pad b4",
      "pad effect-pad b5",
      "pad effect-pad b6 active",
      "pad effect-pad b7",
      1,
      1,
      1,
      1,
      1,
      "./sounds/kick1.mp3",
      "./sounds/snare7.mp3",
      "./sounds/hihat6.mp3",
      "./sounds/clap5.mp3",
      "./sounds/effect1.mp3",
      200,
    ];
    const crazyDeveloper = [
      "pad kick-pad b0 active",
      "pad kick-pad b1",
      "pad kick-pad b2",
      "pad kick-pad b3",
      "pad kick-pad b4 active",
      "pad kick-pad b5",
      "pad kick-pad b6",
      "pad kick-pad b7",
      "pad kick-pad b8 active",
      "pad kick-pad b9",
      "pad kick-pad b10",
      "pad kick-pad b11",
      "pad kick-pad b12 active",
      "pad kick-pad b13",
      "pad kick-pad b14",
      "pad kick-pad b15",
      "pad snare-pad b0",
      "pad snare-pad b1",
      "pad snare-pad b2 active",
      "pad snare-pad b3",
      "pad snare-pad b4",
      "pad snare-pad b5",
      "pad snare-pad b6 active",
      "pad snare-pad b7",
      "pad snare-pad b8",
      "pad snare-pad b9",
      "pad snare-pad b10 active",
      "pad snare-pad b11",
      "pad snare-pad b12",
      "pad snare-pad b13",
      "pad snare-pad b14 active",
      "pad snare-pad b15",
      "pad hihat-pad b0",
      "pad hihat-pad b1",
      "pad hihat-pad b2",
      "pad hihat-pad b3 active",
      "pad hihat-pad b4",
      "pad hihat-pad b5",
      "pad hihat-pad b6",
      "pad hihat-pad b7 active",
      "pad hihat-pad b8",
      "pad hihat-pad b9",
      "pad hihat-pad b10",
      "pad hihat-pad b11 active",
      "pad hihat-pad b12",
      "pad hihat-pad b13",
      "pad hihat-pad b14",
      "pad hihat-pad b15",
      "pad clap-pad b0",
      "pad clap-pad b1",
      "pad clap-pad b2",
      "pad clap-pad b3",
      "pad clap-pad b4",
      "pad clap-pad b5 active",
      "pad clap-pad b6",
      "pad clap-pad b7",
      "pad clap-pad b8",
      "pad clap-pad b9 active",
      "pad clap-pad b10",
      "pad clap-pad b11",
      "pad clap-pad b12",
      "pad clap-pad b13",
      "pad clap-pad b14",
      "pad clap-pad b15",
      "pad effect-pad b0",
      "pad effect-pad b1",
      "pad effect-pad b2",
      "pad effect-pad b3",
      "pad effect-pad b4",
      "pad effect-pad b5",
      "pad effect-pad b6",
      "pad effect-pad b7 active",
      "pad effect-pad b8",
      "pad effect-pad b9",
      "pad effect-pad b10",
      "pad effect-pad b11 active",
      "pad effect-pad b12",
      "pad effect-pad b13",
      "pad effect-pad b14",
      "pad effect-pad b15",
      1,
      1,
      1,
      1,
      1,
      "./sounds/kick2.mp3",
      "./sounds/snare6.mp3",
      "./sounds/hihat9.mp3",
      "./sounds/clap5.mp3",
      "./sounds/effect7.mp3",
      200,
    ];
    const mayasWedding = [
      "pad kick-pad b0 active",
      "pad kick-pad b1",
      "pad kick-pad b2",
      "pad kick-pad b3 active",
      "pad kick-pad b4",
      "pad kick-pad b5",
      "pad kick-pad b6 active",
      "pad kick-pad b7",
      "pad snare-pad b0",
      "pad snare-pad b1 active",
      "pad snare-pad b2",
      "pad snare-pad b3",
      "pad snare-pad b4 active",
      "pad snare-pad b5 active",
      "pad snare-pad b6",
      "pad snare-pad b7 active",
      "pad hihat-pad b0",
      "pad hihat-pad b1",
      "pad hihat-pad b2",
      "pad hihat-pad b3",
      "pad hihat-pad b4",
      "pad hihat-pad b5",
      "pad hihat-pad b6",
      "pad hihat-pad b7",
      "pad clap-pad b0",
      "pad clap-pad b1",
      "pad clap-pad b2",
      "pad clap-pad b3",
      "pad clap-pad b4",
      "pad clap-pad b5",
      "pad clap-pad b6",
      "pad clap-pad b7",
      "pad effect-pad b0",
      "pad effect-pad b1",
      "pad effect-pad b2 active",
      "pad effect-pad b3",
      "pad effect-pad b4",
      "pad effect-pad b5",
      "pad effect-pad b6",
      "pad effect-pad b7",
      1,
      1,
      1,
      1,
      1,
      "./sounds/kick4.mp3",
      "./sounds/snare4.mp3",
      "./sounds/hihat1.mp3",
      "./sounds/clap5.mp3",
      "./sounds/effect7.mp3",
      200,
    ];
    const danceOfLovers = [
      "pad kick-pad b0",
      "pad kick-pad b1",
      "pad kick-pad b2 active",
      "pad kick-pad b3 active",
      "pad kick-pad b4",
      "pad kick-pad b5 active",
      "pad kick-pad b6",
      "pad kick-pad b7",
      "pad kick-pad b8",
      "pad kick-pad b9",
      "pad kick-pad b10",
      "pad kick-pad b11",
      "pad kick-pad b12",
      "pad kick-pad b13",
      "pad kick-pad b14",
      "pad kick-pad b15",
      "pad snare-pad b0",
      "pad snare-pad b1 active",
      "pad snare-pad b2",
      "pad snare-pad b3",
      "pad snare-pad b4",
      "pad snare-pad b5",
      "pad snare-pad b6 active",
      "pad snare-pad b7",
      "pad snare-pad b8",
      "pad snare-pad b9",
      "pad snare-pad b10",
      "pad snare-pad b11",
      "pad snare-pad b12",
      "pad snare-pad b13",
      "pad snare-pad b14",
      "pad snare-pad b15",
      "pad hihat-pad b0 active",
      "pad hihat-pad b1",
      "pad hihat-pad b2",
      "pad hihat-pad b3",
      "pad hihat-pad b4",
      "pad hihat-pad b5",
      "pad hihat-pad b6",
      "pad hihat-pad b7",
      "pad hihat-pad b8 active",
      "pad hihat-pad b9",
      "pad hihat-pad b10",
      "pad hihat-pad b11",
      "pad hihat-pad b12",
      "pad hihat-pad b13",
      "pad hihat-pad b14",
      "pad hihat-pad b15 active",
      "pad clap-pad b0",
      "pad clap-pad b1",
      "pad clap-pad b2",
      "pad clap-pad b3 active",
      "pad clap-pad b4",
      "pad clap-pad b5",
      "pad clap-pad b6",
      "pad clap-pad b7",
      "pad clap-pad b8",
      "pad clap-pad b9 active",
      "pad clap-pad b10",
      "pad clap-pad b11 active",
      "pad clap-pad b12",
      "pad clap-pad b13",
      "pad clap-pad b14 active",
      "pad clap-pad b15",
      "pad effect-pad b0",
      "pad effect-pad b1",
      "pad effect-pad b2",
      "pad effect-pad b3",
      "pad effect-pad b4",
      "pad effect-pad b5",
      "pad effect-pad b6",
      "pad effect-pad b7",
      "pad effect-pad b8",
      "pad effect-pad b9",
      "pad effect-pad b10 active",
      "pad effect-pad b11",
      "pad effect-pad b12",
      "pad effect-pad b13 active",
      "pad effect-pad b14",
      "pad effect-pad b15",
      1,
      1,
      1,
      1,
      1,
      "./sounds/kick3.mp3",
      "./sounds/snare5.mp3",
      "./sounds/hihat2.mp3",
      "./sounds/clap5.mp3",
      "./sounds/effect7.mp3",
      300,
    ];

    let pads = document.querySelectorAll(".pad");
    pads.forEach((pad) => {
      pad.classList.remove("active");
    });
    
    //one of deffrence between this method and load method
    //we get clicked name and evaluate by a Switch then we assign the right sample to trackArray and the rest of things are same as load method
    let trackArray;
    switch (trackName) {
      case "we will rock you":
        trackArray = weWillRockYou;
        break;
      case "hip hop 6&8":
        trackArray = hipHop68;
        break;
      case "heart of Atefeh":
        trackArray = heartOfAtefeh;
        break;
      case "try again":
        trackArray = tryAgain;
        break;
      case "crazy developer":
        trackArray = crazyDeveloper;
        break;
      case "maya's wedding":
        trackArray = mayasWedding;
        break;
      case "dance of lovers":
        trackArray = danceOfLovers;
        break;
    }

    //removing the last element and assign it to a varible
    //changing the sound by loaded value
    let tempo = trackArray.pop();
    let effectSrc = trackArray.pop();
    this.effectAudio.src = effectSrc;
    let clapSrc = trackArray.pop();
    this.clapAudio.src = clapSrc;
    let hihatSrc = trackArray.pop();
    this.hihatAudio.src = hihatSrc;
    let snareSrc = trackArray.pop();
    this.snareAudio.src = snareSrc;
    let kickSrc = trackArray.pop();
    this.kickAudio.src = kickSrc;

    //changing the volume of the every row by loaded value
    let kickVolume = trackArray.pop();
    this.kickAudio.volume = kickVolume;
    document.querySelector(".kick-volume").value = kickVolume * 100;
    document.querySelector(".kick-volume").nextElementSibling.innerText =
      kickVolume * 100;

    let snareVolume = trackArray.pop();
    this.snareAudio.volume = snareVolume;
    document.querySelector(".snare-volume").value = snareVolume * 100;
    document.querySelector(".snare-volume").nextElementSibling.innerText =
      snareVolume * 100;

    let hihatVolume = trackArray.pop();
    this.hihatAudio.volume = hihatVolume;
    document.querySelector(".hihat-volume").value = hihatVolume * 100;
    document.querySelector(".hihat-volume").nextElementSibling.innerText =
      hihatVolume * 100;

    let clapVolume = trackArray.pop();
    this.clapAudio.volume = clapVolume;
    document.querySelector(".clap-volume").value = clapVolume * 100;
    document.querySelector(".clap-volume").nextElementSibling.innerText =
      clapVolume * 100;

    let effectVolume = trackArray.pop();
    this.effectAudio.volume = effectVolume;
    document.querySelector(".effect-volume").value = effectVolume * 100;
    document.querySelector(".effect-volume").nextElementSibling.innerText =
      effectVolume * 100;

    // change what the select input showing to us
    document.querySelectorAll("select").forEach((select) => {
      let optionLength = select.options.length;
      for (let i = 0; i < optionLength; i++) {
        if (select.options[i].value == kickSrc) {
          select.options.selectedIndex = i;
        } else if (select.options[i].value == snareSrc) {
          select.options.selectedIndex = i;
        } else if (select.options[i].value == hihatSrc) {
          select.options.selectedIndex = i;
        } else if (select.options[i].value == clapSrc) {
          select.options.selectedIndex = i;
        } else if (select.options[i].value == effectSrc) {
          select.options.selectedIndex = i;
        }
      }
    });

    //we want to make number of pads as number of the loaded track to activate them
    let loadLength = trackArray.length;
    let lengthDiffrence = (loadLength - pads.length) / 5;

    if (lengthDiffrence > 0) {
      for (let i = lengthDiffrence; i > 0; i--) {
        this.increasePad();
      }
    } else {
      for (let i = lengthDiffrence; i < 0; i++) {
        this.decreasePad();
      }
    }
    pads = document.querySelectorAll(".pad");
    trackArray.forEach((el, index) => {
      if (el.indexOf("active") >= 0) {
        pads[index].classList.add("active");
      }
    });

    //change the tempo value by the value of the loaded track
    this.changeTempo(tempo);
    this.updateTempo(tempo);
    this.tempoSlider.value = tempo;
    modalCloseLoad();

    //update drum.pads and call the activePad eventLisener again
    drum.pads = document.querySelectorAll(".pad");
    drum.pads.forEach((pad) => {
      pad.addEventListener("click", drum.activePad);
      pad.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });
  }
}

//////////////////////////////////////////////
////////////////////////////////////////
///////////////////////////////////
//////////////////////////////
/////////////////////////
////////////////////
//EventListeners

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

//changing the sounds when the user change it through the select options
drum.selectS.forEach((select) => {
  select.addEventListener("change", function (e) {
    drum.changeSound(e);
  });
});

//change the volume of every row by range input
drum.volumeBtnS.forEach((btn) => {
  btn.addEventListener("input", function (e) {
    drum.volume(e);
  });
  //change the volume number that showed in the span
  btn.addEventListener("input", function (e) {
    drum.volumeNum(e);
  });
});

//changing the text of tempo slider in every moment
drum.tempoSlider.addEventListener("input", function (e) {
  drum.changeTempo(e.target.value);
});

//changing the bpm when the user changed the tempo slider
drum.tempoSlider.addEventListener("change", function (e) {
  drum.updateTempo(e.target.value);
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

//saving a track
//at first we pop-up a form to get a name from user
//then we evaluate the name (for empty ones) and then close the modal then we sed this name to the save() method
drum.saveBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const savingError = document.querySelector(".saving-error");
  let trackName = document.querySelector("#saved-name");
  if (trackName.value !== "") {
    modalClose();
    drum.save(trackName.value);
    trackName.value = "";
  } else {
    savingError.style.display = "block";
  }
  setTimeout(() => {
    savingError.style.display = "none";
  }, 3000);
});

//load contents in the load page from localstorage
{
  // get the track names that saved in LS and show them in the load page
  for (let i = 0; i < localStorage.length; i++) {
    const trackName = localStorage.key(i);
    const item = document.createElement("div");
    item.innerText = trackName;
    item.classList.add("track-load-style");
    document.querySelector(".your-tracks-content").appendChild(item);
  }
  //add click listener to the element and then call the load method if user click
  const loadContentS = document.querySelectorAll(".track-load-style");
  loadContentS.forEach((item) => {
    item.classList.remove("new-save");
    item.addEventListener("click", function (track) {
      const loadTrack = track.target.textContent;
      drum.load(loadTrack);
    });
  });

  // load the samples and add click listener, if user clicked
  const sampleContentS = document.querySelectorAll(".sample-load-style");
  sampleContentS.forEach((item) => {
    item.addEventListener("click", function (track) {
      // use trim() method to avoid white space in html element
      const loadTrack = track.target.textContent.trim();
      drum.loadSamples(loadTrack);
    });
  });
}

//add a confirm form by modal for clearing the stage
drum.clearBtn.addEventListener("click", function (e) {
  e.preventDefault();
  drum.clearActive();
  modalConfirmClose();
});
// add event listener if user clicked on cancel in clear confirmation
document.querySelector("#cancel-clear").addEventListener("click", function (e) {
  e.preventDefault();
  modalConfirmClose();
});
