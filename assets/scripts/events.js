//add a new character stat block
const makeCharacter = function (name, health, armorClass, attackModifier, numDice, diceType, bonus, team) {
  let teamClass = `.${team}`;
  let d4 = '';
  let d6 = '';
  let d8 = '';
  let d10 = '';
  let d12 = '';
  let d20 = '';
  let d100 = '';

  if (diceType == 4) {
    d4 = 'selected';
  }
  else if (diceType == 6) {
    d6 = 'selected';
  }
  else if (diceType == 8) {
    d8 = 'selected';
  }
  else if (diceType == 10) {
    d10 = 'selected';
  }
  else if (diceType == 12) {
    d12 = 'selected';
  }
  else if (diceType == 20) {
    d20 = 'selected';
  }
  else if (diceType == 100) {
    d100 = 'selected';
  }


  $(teamClass).append(`<div class="char">

      <div class="buttons">
        <div class="remove">
          <button type="button" class="btn btn-default remove-btn">Remove</button>
        </div>

        <div class="copy">
          <button type="button" class="btn btn-default copy copy-btn">Copy</button>
        </div>
      </div>

      <div class="stats">
        <div class="char-name">
          <p>
            Name: <span class="name">${name}</span>
          </p>
        </div>

        <div class="char-hp">
          <p>
            Health: <span class="health">${health}</span>
          </p>
        </div>

        <div class="char-ac">
          <p>
            Armor Class: <span class="armor-class">${armorClass}</span>
          </p>
        </div>

        <div class="char-am">
          <p>
            Attak Modifier: <span class="attack-modifier">${attackModifier}</span>
          </p>
        </div>

        <div class="char-dmg">
          <p>
            Damage:
            <span class="num-dice">${numDice}</span>
            <span class="dice-type">d${diceType}</span>
            + <span class="bonus">${bonus}</span>
          </p>
        </div>
      </div>

    </div>`);
};

//bubble events for remove and copy
const onCharacterBlock = function (event) {
  // set target, it's what the user clicked on
  let target = $(event.target);

  // remove char block
  if (target.hasClass('remove-btn')) {
    $(target).parent().parent().remove()
  }

  // copy char block
  if (target.hasClass('copy-btn')) {
    //get inputs
    let name = $(target).parent().parent().children('div.char-name-hp').children('p').children('input.name').val();
    let health = $(target).parent().parent().children('div.char-name-hp').children('p').children('input.health').val();
    let armorClass = $(target).parent().parent().children('div.char-ac-am').children('p').children('input.armor-class').val();
    let attackModifier = $(target).parent().parent().children('div.char-ac-am').children('p').children('input.attack-modifier').val();
    let numDice = $(target).parent().parent().children('div.char-dmg').children('p').children('input.numDice').val();
    let diceType = $(target).parent().parent().children('div.char-dmg').children('p').children('select').val();
    let bonus = $(target).parent().parent().children('div.char-dmg').children('p').children('input.bonus').val();
    let team = 'none';
    if ($(target).parent().parent().parent().hasClass('good')) {
      team = 'good';
    }
    else if ($(target).parent().parent().parent().hasClass('bad')) {
      team = 'bad';
    }

    //make char block
    makeCharacter(name, health, armorClass, attackModifier, numDice, diceType, bonus, team);
  }
};

//add new character
const onNewChar = function () {
  let name = $('.new-char-form').children('div.char-name').children('p').children('input.name').val();
  let health = parseInt($('.new-char-form').children('div.char-hp').children('p').children('input.health').val());
  let armorClass = parseInt($('.new-char-form').children('div.char-ac').children('p').children('input.armor-class').val());
  let attackModifier = parseInt($('.new-char-form').children('div.char-am').children('p').children('input.attack-modifier').val());
  let numDice = parseInt($('.new-char-form').children('div.char-dmg').children('p').children('input.numDice').val());
  let diceType = $('.new-char-form').children('div.char-dmg').children('p').children('select').val();
  let bonus = parseInt($('.new-char-form').children('div.char-dmg').children('p').children('input.bonus').val());
  let team = $('.new-char-form').children('div.char-team').children('select').val();

  if (Number.isInteger(health) && Number.isInteger(armorClass) &&
      Number.isInteger(attackModifier) && Number.isInteger(numDice) &&
      Number.isInteger(bonus)) {
    $('.main').css('display', 'block');
    $('.main3').css('display', 'none');
    makeCharacter(name, health, armorClass, attackModifier, numDice, diceType, bonus, team);
  }
  else {
    console.log('please check your inputs');
  }
};

//add a new character stat block
const onAddCharacter = function () {
  $('.main').css('display', 'none');
  $('.main3').css('display', 'block');
  $('.new-char-form').empty();

  $('.new-char-form').append(`
    <div class="char-name">
      <p>
        Name: <input class="name" type="text" name="" value="" maxlength="15" size="15">
      </p>
    </div>
    <div class="char-hp">
      <p>
        Health: <input class="health" type="text" name="" value="" maxlength="3" size="3">
      </p>
    </div>

    <div class="char-ac">
      <p>
        Armor Class: <input class="armor-class" type="text" name="" value="" maxlength="2" size="3">
      </p>
    </div>

    <div class="char-am">
      <p>
        Attack Modifier: <input class="attack-modifier" type="text" name="" value="" maxlength="2" size="3">
      </p>
    </div>

    <div class="char-dmg">
      <p>
        Damage:
        <input class="numDice" type="text" name="" value="" maxlength="2" size="3">
          <select name="dice-type">
                  <option value="4" selected>d4</option>
                  <option value="6">d6</option>
                  <option value="8">d8</option>
                  <option value="10">d10</option>
                  <option value="12">d12</option>
                  <option value="20">d20</option>
                  <option value="100">d100</option>
          </select>
        + <input class="bonus" type="text" name="" value="" maxlength="2" size="3">
      </p>
    </div>

    <div class="char-team">
      Team:
      <select name="team">
              <option value="good" selected>Ally</option>
              <option value="bad">Enemy</option>
      </select>
    </div>
    `);
};

//add a new character stat block
const onAddEnemy = function () {
  $('.main').css('display', 'none');
  $('.main3').css('display', 'block');
  $('.new-char-form').empty();

  $('.new-char-form').append(`
    <div class="char-name">
      <p>
        Name: <input class="name" type="text" name="" value="" maxlength="15" size="15">
      </p>
    </div>
    <div class="char-hp">
      <p>
        Health: <input class="health" type="text" name="" value="" maxlength="3" size="3">
      </p>
    </div>

    <div class="char-ac">
      <p>
        Armor Class: <input class="armor-class" type="text" name="" value="" maxlength="2" size="3">
      </p>
    </div>
    <div class="char-am">
      <p>
        Attack Modifier: <input class="attack-modifier" type="text" name="" value="" maxlength="2" size="3">
      </p>
    </div>

    <div class="char-dmg">
      <p>
        Damage:
        <input class="numDice" type="text" name="" value="" maxlength="2" size="3">
          <select name="dice-type">
                  <option value="4" selected>d4</option>
                  <option value="6">d6</option>
                  <option value="8">d8</option>
                  <option value="10">d10</option>
                  <option value="12">d12</option>
                  <option value="20">d20</option>
                  <option value="100">d100</option>
          </select>
        + <input class="bonus" type="text" name="" value="" maxlength="2" size="3">
      </p>
    </div>

    <div class="char-team">
      Team:
      <select name="team">
              <option value="good">Ally</option>
              <option value="bad" selected>Enemy</option>
      </select>
    </div>
    `);
};

//create character objects
const buildCharacterObjs = function (nameArray, healthArray, armorClassArray,
  attackModifierArray, numDiceArray, diceTypeArray, bonusArray, teamArray) {
  let charArray = [];

  for (let i = 0; i < nameArray.length; i++) {
    let charObject = {
      name: nameArray[i],
      team: teamArray[i],
      ac: armorClassArray[i],
      atkMod: attackModifierArray[i],
      health: parseInt(healthArray[i]),
      damage: {
        number: parseInt(numDiceArray[i]),
        dice: parseInt(diceTypeArray[i]),
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
function addBadResult() {
  $('.results').append(`<div class="result result-bad">
    <p>Bad Wins!</p>
  </div>`);
}

//insert bad result
function addGoodResult() {
  $('.results').append(`<div class="result result-good">
    <p>Good Wins!</p>
  </div>`);
}

//display the results of fight
function displayResults(resultsArray) {
  //hide main
  $('.main').css('display', 'none');

  //reveal main2
  $('.main2').css('display', 'block');
  $('.back-button').css('display', 'block');


  //empty results
  $('.results').empty();


  for (let i = 0; i < resultsArray.length; i++) {
    let winner = resultsArray[i];

    if (winner == 'Good Wins') {
      addGoodResult();
    }
    else if (winner == 'Bad Wins') {
      addBadResult();
    }
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

//calculate damage
function calculateDamage(charArray, charTurn) {
  let numDice = charArray[charTurn].damage.number;
  let diceType = charArray[charTurn].damage.dice;
  // diceType = parseInt(diceType.substring(1));
  let bonus = charArray[charTurn].damage.bonus;
  let damage = ( numDice * ( getRandomInt(0, diceType) + 1 ) ) + bonus;
  return damage;
}

//try to hit enemy
function tryHit(cA, charTurn, validAttack) {
  let roll = getRandomInt(1, 21);
  let attackRoll = roll + parseInt(cA[charTurn].atkMod);
  let armorClass = cA[validAttack].ac;

  if (attackRoll >= armorClass) {
    return true;
  }
  else {
    return false;
  }
}

//decide who to attack
function pickTarget(charArray, cA_Health, charTurn) {
  let validAttack = -1;
  while (validAttack < 0) {
    let rand = getRandomInt(0, charArray.length);
    if (charArray[charTurn].team != charArray[rand].team && cA_Health[rand] > 0) {
      validAttack = rand;
    }
  }
  return validAttack;
}

//running fight simulate
function runFight(cA, gH, bH) {
  //save health in new array bc apparently javascript doesnt know what pass by value is
  let cA_Health = [];
  for (let i = 0; i < cA.length; i++) {
    cA_Health[i] = cA[i].health;
  }

  let turns = 0;
  while (gH > 0 && bH > 0) {

    let charTurn = turns % cA.length;

    if (cA_Health[charTurn] > 0) {

      let validAttack = pickTarget(cA, cA_Health, charTurn);

      let hit = tryHit(cA, charTurn, validAttack);

      if (hit) {
        let damage = calculateDamage(cA, charTurn);

        //apply damage
        let currentHealth = cA_Health[validAttack];
        if (currentHealth >= damage) {
          cA_Health[validAttack] = currentHealth - damage;

          if (cA[validAttack].team == 'good') {
            gH -= damage;
          }
          else if (cA[validAttack].team == 'bad') {
            bH -= damage;
          }
        }
        else {
          cA_Health[validAttack] = 0

          if (cA[validAttack].team == 'good') {
            gH -= currentHealth;
          }
          else if (cA[validAttack].team == 'bad') {
            bH -= currentHealth;
          }
        }
      }// end if hit
    }//end if for valid attack

    turns++;
  }

  if (gH > 0) {
    return 'Good Wins';
  }
  else if (bH > 0) {
    return 'Bad Wins';
  }

}

//start fighting!
const fight = function (charArray, count) {
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

  //store the results of each fight
  let resultsArray = [];

  //simulate a fight for each count
  for (let i = 0; i < count; i++) {
    /////////////////////////////////////
    //shuffle charArray
    //doesn't feel like it shuffles the arrays properly
    // charArray = shuffle(charArray);
    /////////////////////////////////////

    let res = runFight(charArray, goodHealth, badHealth);
    resultsArray[i] = res;
  }

  displayResults(resultsArray)
};

//add a new character stat block
const onRunSimulation = function () {
  //check if there's enough characters
  let numChar = $('.char').length;
  let numBad = $('.bad').children().length;
  let numGood = $('.good').children().length;
  let count = $('#run-count').val();

  //check validation
  //add stuff to validate inputs of above variables

  if (numBad > 1 && numGood > 1) {
    //make arrays to hold char info
    let nameArray = [];
    let healthArray = [];
    let armorClassArray = [];
    let attackModifierArray = [];
    let numDiceArray = [];
    let diceTypeArray = [];
    let bonusArray = [];
    let charArray = [];
    let teamArray = [];

    //extract input info from each char block
    $('.char').each(function( index ) {
      let name = $(this).children('div.stats').children('div.char-name').children('p').children('span.name').text();
      let health = $(this).children('div.stats').children('div.char-hp').children('p').children('span.health').text();
      let armorClass = $(this).children('div.stats').children('div.char-ac').children('p').children('span.armor-class').text();
      let attackModifier = $(this).children('div.stats').children('div.char-am').children('p').children('span.attack-modifier').text();
      let numDice = $(this).children('div.stats').children('div.char-dmg').children('p').children('span.num-dice').text();
      let diceType = $(this).children('div.stats').children('div.char-dmg').children('p').children('span.dice-type').text();
      diceType = diceType.substr(1);
      let bonus = $(this).children('div.stats').children('div.char-dmg').children('p').children('span.bonus').text();

      let team = 'none';
      if ($(this).parent().hasClass('good')) {
        team = 'good';
      }
      else if ($(this).parent().hasClass('bad')) {
        team = 'bad';
      }

      nameArray[index] = name;
      healthArray[index] = health;
      armorClassArray[index] = armorClass;
      attackModifierArray[index] = attackModifier;
      numDiceArray[index] = numDice;
      diceTypeArray[index] = diceType;
      bonusArray[index] = bonus;
      teamArray[index] = team;
    });

    //build character objects
    charArray = buildCharacterObjs(nameArray, healthArray, armorClassArray,
      attackModifierArray, numDiceArray, diceTypeArray, bonusArray, teamArray);

    //fight!
    fight(charArray, count);
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
  $('.back-button').css('display', 'none');

  //empty results
  $('.results').empty();
}

const onCharBack = function () {
  //reveal main
  $('.main').css('display', 'block');

  //hide main2
  $('.main3').css('display', 'none');
  $('.back-button').css('display', 'none');

  //empty results
  $('.new-char-form').empty();
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
  $('#char-submit').on('click', onNewChar);
  $('#char-back').on('click', onCharBack);
  $('#run-sim').on('click', onRunSimulation);
  $('#back').on('click', onBack);
  $('.main').on('click', onCharacterBlock); //activates the remove and copy buttons, uses bubble events

  //supposed to prevent showing the unstylized content, but doesn't work right?
  $('body').css('visibility', 'visible');
};

module.exports = {
  addHandlers,
};
