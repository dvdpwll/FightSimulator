
//add a new character stat block
const onAddCharacter = function () {
  $('.good').append(`<div class="char">
      <div class="remove">
        <button type="button" class="btn btn-default remove">
          <span class="glyphicon glyphicon-trash"></span>
        </button>
      </div>

      <div class="char-name">
        <p>Name: <input type="text" name="" value="Character" maxlength="20" size="21"></p>
      </div>

      <div class="char-dmg">
        <p>
          Damage:
          <input type="text" name="" value="# of" maxlength="2" size="3">
          <input type="text" name="" value="dice" maxlength="4" size="5">
          + <input type="text" name="" value="bonus" maxlength="2" size="5">
        </p>
      </div>
    </div>`);
};

//add a new character stat block
const onAddEnemy = function () {
  $('.bad').append(`<div class="char">
    <div class="remove">
      <button type="button" class="btn btn-default">
        <span class="glyphicon glyphicon-trash"></span>
      </button>
    </div>

    <div class="char-name">
      <p>Name: <input type="text" name="" value="Enemy" maxlength="20" size="21"></p>
    </div>

    <div class="char-dmg">
      <p>
        Damage:
        <input type="text" name="" value="# of" maxlength="2" size="3">
        <input type="text" name="" value="dice" maxlength="4" size="5">
        + <input type="text" name="" value="bonus" maxlength="2" size="5">
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
};

module.exports = {
  addHandlers,
};
