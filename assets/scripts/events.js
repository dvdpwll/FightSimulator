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
        Health: <input type="text" name="" value="200" maxlength="3" size="5">
      </p>
    </div>

    <div class="char-dmg">
      <p>
        Damage:
        <input type="text" name="" value="3" maxlength="2" size="3">
        <input type="text" name="" value="d12" maxlength="4" size="5">
        + <input type="text" name="" value="5" maxlength="2" size="5">
      </p>
    </div>

  </div>`);
};

//create character objects
const buildCharacterObjs = function (nameArray, healthArray, numDiceArray, diceTypeArray, bonusArray) {
  let charArray = [];

  for (let i = 0; i < nameArray.length; i++) {
    let charObject = {
      name: nameArray[i],
      health: healthArray[i],
      damage: {
        number: numDiceArray[i],
        dice: diceTypeArray[i],
        bonus: bonusArray[i]
      }
    };

    charArray[i] = charObject;
  }

  return charArray;
};

//start fighting!
const fight = function (charArray) {
  console.log('fighting');

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

    //extract input info from each char block
    $('.char').each(function( index ) {
      let name = $(this).children('div.char-name').children('p').children('input').val();
      let health = $(this).children('div.char-hp').children('p').children('input').val();
      let numDice = $(this).children('div.char-dmg').children('p').children('input:nth-child(1)').val();
      let diceType = $(this).children('div.char-dmg').children('p').children('input:nth-child(2)').val();
      let bonus = $(this).children('div.char-dmg').children('p').children('input:nth-child(3)').val();

      nameArray[index] = name;
      healthArray[index] = health;
      numDiceArray[index] = numDice;
      diceTypeArray[index] = diceType;
      bonusArray[index] = bonus;
    });

    //build character objects
    charArray = buildCharacterObjs(nameArray, healthArray, numDiceArray, diceTypeArray, bonusArray);

    //fight!
    fight(charArray);

  }
  else {
    console.log('Please add an enemy or character.');
  }

};

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
  $('.main').on('click', onCharacterBlock); //only remove button for now, uses bubble events
};

module.exports = {
  addHandlers,
};
