// handlers for remove
const onCharacterBlock = function (event) {
  // set target, it's what the user clicked on
  let target = $(event.target);

  // remove char block
  if (target.hasClass('remove-btn')) {
    $(target).parent().parent().remove()
  }
};

//add a new character stat block
const onAddCharacter = function () {
  $('.good').append(`<div class="char">
      <div class="remove">
        <button type="button" class="btn btn-default remove-btn">Remove</button>
      </div>

      <div class="char-name">
        <p>Name: <input type="text" name="" value="CharacterName" maxlength="20" size="21"></p>
      </div>

      <div class="char-hp">
        <p>
          Health: <input type="text" name="" value="100" maxlength="3" size="5">
        </p>
      </div>

      <div class="char-dmg">
        <p>
          Damage:
          <input type="text" name="" value="2" maxlength="2" size="3">
          <input type="text" name="" value="d12" maxlength="4" size="5">
          + <input type="text" name="" value="4" maxlength="2" size="5">
        </p>
      </div>
    </div>`);
};

//add a new character stat block
const onAddEnemy = function () {
  $('.bad').append(`<div class="char">
    <div class="remove">
      <button type="button" class="btn btn-default remove-btn">Remove</button>
    </div>

    <div class="char-name">
      <p>Name: <input type="text" name="" value="EnemyName" maxlength="20" size="21"></p>
    </div>

    <div class="char-hp">
      <p>
        Health: <input type="text" name="" value="100" maxlength="3" size="5">
      </p>
    </div>

    <div class="char-dmg">
      <p>
        Damage:
        <input type="text" name="" value="2" maxlength="2" size="3">
        <input type="text" name="" value="d12" maxlength="4" size="5">
        + <input type="text" name="" value="4" maxlength="2" size="5">
      </p>
    </div>

  </div>`);
};

//create character objects
const buildCharacterObjs = function (nameArray, healthArray, numDiceArray, diceTypeArray, bonusArray, teamArray) {
  let charArray = [];

  for (let i = 0; i < nameArray.length; i++) {
    let charObject = {
      name: nameArray[i],
      team: teamArray[i],
      // turnOrder: 0,
      health: parseInt(healthArray[i]),
      damage: {
        number: parseInt(numDiceArray[i]),
        dice: diceTypeArray[i],
        bonus: parseInt(bonusArray[i])
      }
    };

    charArray[i] = charObject;
  }

  return charArray;
};

//shuffle array
function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

//insert good result
function addBadResult(charArray) {
  $('.results').append(`<div class="result-bad">
    <p>Bad Wins!</p>
  </div>`);
}

//insert bad result
function addGoodResult(charArray) {
  $('.results').append(`<div class="result-good">
    <p>Good Wins!</p>
  </div>`);
}

//display the results of fight
function displayResults(winner, charArray) {
  //hide main
  $('.main').css('display', 'none');

  //reveal main2
  $('.main2').css('display', 'block');

  //empty results
  $('.results').empty();

  if (winner == 'Good Wins') {
    console.log(winner);
    console.log(charArray);
    addGoodResult(charArray);
  }
  else if (winner == 'Bad Wins') {
    console.log(winner);
    console.log(charArray);
    addBadResult(charArray);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//start fighting!
const fight = function (charArray) {
  let goodHealth = 0;
  let badHealth = 0;

  for (let i = 0; i < charArray.length; i++) {
    if (charArray[i].team == 'good') {
      goodHealth += charArray[i].health;
    }
    else if (charArray[i].team == 'bad') {
      badHealth += charArray[i].health;
    }
  }

  /////////////////////////////////////
  //doesn't feel like it shuffles the arrays properly
  charArray = shuffle(charArray);
  /////////////////////////////////////

  let turns = 0;
  while (goodHealth > 0 && badHealth > 0) {
    let charTurn = turns % charArray.length;

    if (charArray[charTurn].health > 0) {
      //decide who to attack
      let validAttack = -1;
      while (validAttack < 0) {
        let rand = getRandomInt(0, charArray.length);
        if (charArray[charTurn].team != charArray[rand].team && charArray[rand].health > 0) {
          validAttack = rand;
        }
      }

      //calculate damage
      // let damage = 0;
      let numDice = charArray[charTurn].damage.number;
      let diceType = charArray[charTurn].damage.dice;
      diceType = parseInt(diceType.substring(1));
      let bonus = charArray[charTurn].damage.bonus;
      let damage = ( numDice * ( getRandomInt(0, diceType) + 1 ) ) + bonus;

      // console.log('--------------------');
      // console.log(charArray[charTurn].name);
      // console.log(damage);
      // console.log(charArray[validAttack].name);
      // console.log('HealthB: ' + charArray[validAttack].health);


      //apply damage
      let currentHealth = charArray[validAttack].health;
      if (currentHealth >= damage) {
        charArray[validAttack].health = currentHealth - damage;
        // console.log('HealthA1: ' + charArray[validAttack].health);

        if (charArray[validAttack].team == 'good') {
          goodHealth -= damage;
        }
        else if (charArray[validAttack].team == 'bad') {
          badHealth -= damage;
        }
      }
      else {
        charArray[validAttack].health = 0
        // console.log('HealthA2: ' + charArray[validAttack].health);

        if (charArray[validAttack].team == 'good') {
          goodHealth -= currentHealth;
        }
        else if (charArray[validAttack].team == 'bad') {
          badHealth -= currentHealth;
        }
      }
    }

    turns++;
  }

  if (goodHealth > 0) {
    displayResults('Good Wins', charArray);

    // return 'Good Wins';
  }
  else if (badHealth > 0) {
    displayResults('Bad Wins', charArray);

    // return 'Bad Wins'
  }
};

//add a new character stat block
const onRunSimulation = function () {
  //check if there's enough characters
  let numChar = $('.char').length;
  let numBad = $('.bad').children().length;
  let numGood = $('.good').children().length;

  //check validation
  //stuff for validation

  if (numBad > 1 && numGood > 1) {
    //make arrays to hold char info
    let nameArray = [];
    let healthArray = [];
    let numDiceArray = [];
    let diceTypeArray = [];
    let bonusArray = [];
    let charArray = [];
    let teamArray = [];

    //extract input info from each char block
    $('.char').each(function( index ) {
      let name = $(this).children('div.char-name').children('p').children('input').val();
      let health = $(this).children('div.char-hp').children('p').children('input').val();
      let numDice = $(this).children('div.char-dmg').children('p').children('input:nth-child(1)').val();
      let diceType = $(this).children('div.char-dmg').children('p').children('input:nth-child(2)').val();
      let bonus = $(this).children('div.char-dmg').children('p').children('input:nth-child(3)').val();
      let team = 'none';
      if ($(this).parent().hasClass('good')) {
        team = 'good';
      }
      else if ($(this).parent().hasClass('bad')) {
        team = 'bad';
      }

      nameArray[index] = name;
      healthArray[index] = health;
      numDiceArray[index] = numDice;
      diceTypeArray[index] = diceType;
      bonusArray[index] = bonus;
      teamArray[index] = team;
    });

    //build character objects
    charArray = buildCharacterObjs(nameArray, healthArray, numDiceArray, diceTypeArray, bonusArray, teamArray);

    //fight!
    fight(charArray);

    // console.log(winner);

  }
  else {
    console.log('Please add an enemy or character.');
  }

};

const onBack = function () {
  //reveal main
  $('.main').css('display', 'block');

  //hide main2
  $('.main2').css('display', 'none');

  //empty results
  $('.results').empty();
}

const addHandlers = () => {
  //hide these buttons on startup
  $('#sign-up').hide();
  $('#log-in').hide();
  $('#change-password').hide();
  $('#log-out').hide();

  //buttons
  $('#add-char').on('click', onAddCharacter);
  $('#add-enemy').on('click', onAddEnemy);
  $('#run-sim').on('click', onRunSimulation);
  $('#back').on('click', onBack);
  $('.main').on('click', onCharacterBlock); //only activates the remove button for now, uses bubble events

  //supposed to prevent showing the unstylized content, but doesn't work right?
  $('body').css('visibility', 'visible');
};

module.exports = {
  addHandlers,
};
