// eslint-disable-next-line no-undef
console.log('Up and running\n\n\n\n\n\n\n');
const feedWeight = 10;
const sleepWeight = 10;
const playWeight = 10;
const factor = 5;
let myTama = new Robovac('Roomba', 'RoboVac', 'images/Roomba.png');
let timePassing;
let seconds = 0;
let minutes = 0;
let level = 1;
let levelUpFlag = true;
let showStartupMsg = true;
let rotateMin = 10;
let rotateMax = 30;
let speedMultiplier = 1;
let message = '';
let hungryNum;
let sleepyNum;
let boredNum;

// Rotate animation function adapted from Ryan's example.
const rotate = ($target) => {
  let rotation = Math.floor(Math.random() * (rotateMax - rotateMin) + rotateMin);
  const tiltLeft = Math.random();
  if (tiltLeft < 0.5) {
    rotation *= -1;
  }
  $target.animate({
    right: '+=100px',
    transform: `${rotation}`,
  }, {
    step(now, fx) {
      $(this).css({
        'webkit-transform': `rotate(${now}deg)`,
        '-moz-transfrom': `rotate(${now}deg)`,
        transform: `rotate(${now}deg)`,
      });
    },
    duration: 3000,
  }, () => {
    //console.log('Rotate animation Done!');
  });
};

// Randomly animate movement around the screen from Stack Overflow move divs randomly
function makeNewPosition($container) {
  // Get viewport dimensions (remove the dimension of the div)
  const h = $container.height() - 50;
  const w = $container.width() - 50;
  const nh = Math.floor(Math.random() * h);
  const nw = Math.floor(Math.random() * w);
  return [nh, nw];
}

// Randomly animate movement around the screen from Stack Overflow move divs randomly
function calcSpeed(prev, next) {
  const x = Math.abs(prev[1] - next[1]);
  const y = Math.abs(prev[0] - next[0]);
  const greatest = x > y ? x : y;
  const speedModifier = 0.1 * speedMultiplier;
  const speed = Math.ceil(greatest / speedModifier);
  return speed;
}

// Randomly animate movement around the screen from Stack Overflow move divs randomly
function animateDiv($target) {
  const newq = makeNewPosition($target.parent());
  const oldq = $target.offset();
  const speed = calcSpeed([oldq.top, oldq.left], newq);
  $target.animate({
    top: newq[0],
    left: newq[1],
  }, speed, () => {
    animateDiv($target);
  });
}

const secondsGoUp = () => {
  seconds++;
  
  if (seconds < 10) {
    $('.sec').text(`0${seconds}`);
  } else {
    $('.sec').text(seconds);
  }

  if (boredNum <= (playWeight * 5)) {
    $('.boredom-meter').css('color', 'red');
  } else if (boredNum >= (playWeight * 10)) {
    $('.boredom-meter').css('color', 'green');
  } else {
    $('.boredom-meter').css('color', 'white');
  }

  if (hungryNum <= (feedWeight * 5)) {
    $('.hunger-meter').css('color', 'red');
  } else if (hungryNum >= (playWeight * 10)) {
    $('.hunger-meter').css('color', 'green');
  } else {
    $('.hunger-meter').css('color', 'white');
  }

  if (sleepyNum <= (sleepWeight * 5)) {
    $('.sleep-meter').css('color', 'red');
  } else if (sleepyNum >= (sleepWeight * 10)) {
    $('.sleep-meter').css('color', 'green');
  } else {
    $('.sleep-meter').css('color', 'white');
  }

  if (seconds % 2 === 0) {
    // Do stuff every two seconds
  }

  if (seconds % 3 === 0) {
    rotate($('.tamaA'));
    rotate($('.tamaB'));
    rotate($('.tamaC'));

    if (level >= 1 && level < 4) {
      $('.tamagotchi').prop('src', 'images/Roomba.png');
    } else if (level === 4) {
      $('.tamagotchi').prop('src', 'images/RoombaKnives.gif');
      message = `Level: ${level} Your ${myTama.type}s used machine learning to discover sharp implements! Watch out for the knives!`;
    } else if (level === 5) {
      $('.tamagotchi').prop('src', 'images/RoombaArson.gif');
      message = `Level: ${level} Your ${myTama.type}s built a mesh network to discover fire! Watch out for the flame-throwers!`;
    } else if (level >= 6) {
      $('.tamagatchi').prop({'src':'images/RoombaGun.gif', 'width':'150px'});
      message = `Level: ${level} Your ${myTama.type}s acquired human level intelligence and invented guns! Watch out for flying bullets!`;
    }
    // Do stuff every three seconds
  }

  if (seconds % 7 === 0) {
    hungryNum = parseInt(myTama.hunger, 10);
    myTama.hunger = hungryNum - (factor * level);
    $('.hunger-meter').text(`${myTama.hunger}`);
    // Do stuff that happens at 7 seconds
  }

  if (seconds % 5 === 0) {
    sleepyNum = parseInt(myTama.sleepiness, 10);
    myTama.sleepiness = sleepyNum - (factor * level);
    $('.sleep-meter').text(`${myTama.sleepiness}`);
    // do stuff that happens at 5 seconds
  }

  if (seconds % 8 === 0) {
    boredNum = parseInt(myTama.boredom, 10);
    myTama.boredom = boredNum - (factor * level);
    $('.boredom-meter').text(`${myTama.boredom}`);
    // do stuff that happens at 8 seconds
  }

  if (seconds % 15 === 0) {
    myTama.age++;
    $('.age-meter').text(myTama.age);
    levelUpFlag = true;
    // Do stuff that happens at 15 seconds
  }

  if (seconds % 60 === 0) {
    minutes++; // increment minutes
    $('.min').text(minutes);
    seconds = '00';
    $('.sec').text(seconds);
  }

  // handle increased difficulty and frenzy
  if (myTama.age % 5 === 0 && myTama.age !== '0') {
    $('.level-meter').text(level);
    if (levelUpFlag) {
      level++;
      speedMultiplier += 2;

      if (level === 2) {
        $('.tamaB').css('visibility', 'visible');
        message = `Level: ${level} Your ${myTama.type} is getting old. It now frequently gets clogged, does not hold a charge, and generally needs more attention than before.`;
        $('#nameB').text(prompt(`It's time to get a new ${myTama.type} to help out. What is the name of your new pet ${myTama.type}?`));
        $(myTama.$commsBar).text(message);
        console.log(message);
      } else if (level === 3) {
        $('.tamaC').css('visibility', 'visible');
        message = `Level: ${level} Your ${myTama.type}s are almost teenagers. They are starting to get snarky and want to hang out with their new friend more than you!`;
        $('#nameC').text(prompt(`What is the name of your new pet ${myTama.type}?`));
        $(myTama.$commsBar).text(message);
        console.log(message);
      } else if (level === 4) {
        $('.tamagatchi').prop('src', 'images/RoombaKnives.gif');
        message = `Level: ${level} Your ${myTama.type}s used machine learning to discover sharp tools! Watch out for the knives!`;
        $(myTama.$commsBar).text(message);
        console.log(message);
      } else if (level === 5) {
        $('.tamagatchi').prop('src', 'images/RoombaArson.gif');
        message = `Level: ${level} Your ${myTama.type}s built a mesh network to discover fire! Watch out for the flame-throwers!`;
        $(myTama.$commsBar).text(message);
        console.log(message);
      } else if (level === 6) {
        $('.tamagatchi').prop({'src':'images/RoombaGun.gif', 'width':'150px'});
        message = `Level: ${level} Your ${myTama.type}s acquired human-level AI and invented guns! Watch out for flying bullets!`;
        $(myTama.$commsBar).text(message);
        console.log(message);
      } else if (level >= 7) {
        message = `Level: ${level} !4!wneh fu@Q@evf3 qjenfvuqw  ebeeep!&97%93!!!; &#9794;!!beep!&# 9795;&#9 780;destroy!_&#976sdfas &#979; &798;beep!#979&#% 9779;&#973;;destroy!!!`;
        $(myTama.$commsBar).text(message);
        console.log(message);
      }

      // Increase animation frenzy;
      rotateMin += 20;
      rotateMax += 100;
      animateDiv($('.tamaA'));
      animateDiv($('.tamaB'));
      animateDiv($('.tamaC'));

      levelUpFlag = false;
    }
  }

  if (myTama.hunger <= 0 || myTama.sleepiness <= 0 || myTama.boredom <= 0) {
    $('.tamagotchi').prop('src', 'images/RoombaInnards.gif');
    if (level < 2) {
      message = `*** Your ${myTama.type} DIED! Game Over! ***`;
    } else {
      message = `*** Your ${myTama.type}s DIED! Game Over! ***`;
    }
    console.log(message);
    $(myTama.$commsBar).text(message);
    alert(message);
    clearInterval(timePassing);
    timePassing = 0;
    $('#stop').click();
    $('#start').prop('disabled', true);
  }
};

$('#start').on('click', () => {
  if (showStartupMsg) {
    message = `Congrats, you are the proud owner of a new Robot Vacuum! Say goodbye to that old broom and hello to more free time! I am confident this was a smart purchase... What is the name of your new pet ${myTama.type}?`;
    $('#nameA').text(prompt(message));
    myTama.name = $('#nameA').text();
    showStartupMsg = false;
  }
  message = `${myTama.name} ${myTama.type} is so excited to clean your many flat hard surfaces all day while you stream shows from your bed!`;
  $(myTama.$commsBar).text(message);
  console.log(message);
  timePassing = setInterval(secondsGoUp, 500);
  animateDiv($('.tamaA'));
  animateDiv($('.tamaB'));
  animateDiv($('.tamaC'));
  $('#start').prop('disabled', true);
  $('#feed').prop('disabled', false);
  $('#sleep').prop('disabled', false);
  $('#play').prop('disabled', false);
});

$('#stop').on('click', () => {
  clearInterval(timePassing);
  $('.tamagotchi').stop(true);
  $('.tamaA').stop(true);
  $('.tamaB').stop(true);
  $('.tamaC').stop(true);
  $('#start').prop('disabled', false);
  $('#feed').prop('disabled', true);
  $('#sleep').prop('disabled', true);
  $('#play').prop('disabled', true);
});

$('#feed').on('click', () => {
  myTama.feed(feedWeight);
  $('.hunger-meter').text(`${myTama.hunger}`);
  $('.tamagotchi').prop('src', 'images/RoombaFull.png');
});

$('#sleep').on('click', () => {
  myTama.sleep(sleepWeight);
  $('.sleep-meter').text(`${myTama.sleepiness}`);
  $('.tamagotchi').prop('src', 'images/RoombaCharge.gif');
});

$('#play').on('click', () => {
  myTama.play(playWeight);
  $('.boredom-meter').text(`${myTama.boredom}`);
  $('.tamagotchi').prop('src', 'images/RoombaPlay.png');
});

$('#start-over').on('click', () => {
  $(myTama.$commsBar).text(`You started over! ${myTama.name} is excited to play again!`);
  clearInterval(timePassing);
  $('.tamagotchi').stop(true);
  $('.tamaA').stop(true);
  $('.tamaB').stop(true);
  $('.tamaC').stop(true);
  myTama = null;
  myTama = new Robovac('Roomba', 'RoboVac', 'images/Roomba.png');
  timePassing = 0;
  seconds = 0;
  minutes = 0;
  myTama.age = '0';
  level = 1;
  rotateMin = 10;
  rotateMax = 30;
  speedMultiplier = 2;
  $('.sec').text(`0${seconds}`);
  $('.min').text(`${minutes}`);
  $('.age-meter').text(myTama.age);
  $('.level-meter').text(myTama.age);
  $('.hunger-meter').text(`${myTama.hunger}`);
  $('.hunger-meter').css('color', 'green');
  $('.sleep-meter').text(`${myTama.sleepiness}`);
  $('.sleep-meter').css('color', 'green');
  $('.boredom-meter').text(`${myTama.boredom}`);
  $('.boredom-meter').css('color', 'green');
  $('.tamagotchi').prop('src', 'images/Roomba.png');
  $('.tamaB').css('visibility', 'hidden');
  $('.tamaC').css('visibility', 'hidden');
  showStartupMsg = true;
  $('#start').click();
});
