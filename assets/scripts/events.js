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
