function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.querySelector(".close");
const formData = document.querySelectorAll(".formData");
const form = document.getElementById("form");
const validForm = document.querySelector(".validationForm");

// Const 
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locationTournament = document.getElementsByName("location");
const condition = document.getElementById("checkbox1");
const validMessage = document.getElementById("validMessage");
const btnSubmit = document.getElementById("btnSubmit");
const btnValid = document.getElementById("btnValid");

// Const Text
const firstText = document.getElementById("firstText");
const lastText = document.getElementById("lastText");
const emailText = document.getElementById("emailText");
const birthdateText = document.getElementById("birthdateText");
const quantityText = document.getElementById("quantityText");
const locationText = document.getElementById("locationText");
const conditionText = document.getElementById("conditionText");

//  Const
const numbers = /^[0-9]+$/;

//
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal form 
modalBtnClose.addEventListener("click", function() {          
  modalbg.style.display = "none";                             
});

// RegExp
let regExTypeText = new RegExp(
  '^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$'
);

let regExTypeEmail = new RegExp( 
  '^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'
);

// function
firstName.addEventListener('change', function() {
  generiqueValidate(this,regExTypeText,"Veuillez rentrer deux caractères minimum", firstText, this);
});

lastName.addEventListener('change', function() {
  generiqueValidate(this,regExTypeText,"Veuillez rentrer deux caractères minimum", lastText, this);
});

email.addEventListener('change', function() {
  generiqueValidate(this,regExTypeEmail,"Veuillez rentrer une adresse email valide", emailText, this);
});

function msgValide(label, border) {    //  Champ Valide
  label.innerHTML = "Champ Valide";
  label.classList.remove('text-danger');
  label.classList.add('text-succes');
  border.classList.remove('border-danger');
  border.classList.add('border-succes');
  return true;
}

function msgNonValide(msg, label, border) {   //  Champ Non Valide
  label.innerHTML = msg;
  label.classList.remove('text-succes');
  label.classList.add('text-danger');
  border.classList.remove('border-succes');
  border.classList.add('border-danger');
  return false;
}

function generiqueValidate(input,regEx,msg,label,border) {
  let testValid = regEx.test(input.value);
  if(testValid) {
    return msgValide(label, border);
   } else {
    return msgNonValide(msg, label, border);
   }
}

// birthdate
birthdate.addEventListener('change', function() {
  validBirthdate(this);
});

const validBirthdate = function() {

  if(!birthdate.value.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)) {
    return msgNonValide("Veuillez entrer une date de naissance valide", birthdateText, birthdate);
  } else {
    return msgValide(birthdateText, birthdate);
  }
};

// quantity
quantity.addEventListener('change', function() {
  validQuantity(this);
});

const validQuantity = function() {
  if(!quantity.value.match(numbers)) {
    return msgNonValide("Veuillez indiquer le nombre de tournois", quantityText,quantity)
  } else {
    return msgValide(quantityText,quantity);
  }
};

// city
function verifLocationTournament() {
  let locTournamentCheck = false; 
  for(let i = 0; i < locationTournament.length; i++) {
    const isCheck = locationTournament[i].checked;
    if(isCheck) {
      locTournamentCheck = true;
      return true;
    }
  }
  return false;
}

locationTournament.forEach((checkedBoxInput) => checkedBoxInput.addEventListener('change', function() {
  validLocationTournament(); 
}));

function validLocationTournament() {
  if(! verifLocationTournament()) {
      locationText.innerHTML = "Veuillez de cocher une ville";
      locationText.classList.remove('text-succes');
      locationText.classList.add('text-danger');
      return false;
  } else {
      locationText.innerHTML = "Champs valide";
      locationText.classList.remove('text-danger');
      locationText.classList.add('text-succes');
      return true;
  }
}

// condition
condition.addEventListener('change', function() {
  validCondition(this); 
});

const validCondition = function() {   // vérifier si les conditions sont cochées
  if(condition.checked == false ) {                  
    conditionText.innerHTML = "Veuillez accepter les conditions d'utilisations";
    conditionText.classList.remove('text-succes');
    conditionText.classList.add('text-danger');
    return false;
  } else {
    conditionText.innerHTML = "Champs Valide";
    conditionText.classList.remove('text-danger');
    conditionText.classList.add('text-succes');
    return true;
  }
};

// validation
form.noValidate = true;   // désactiver la validation automatique par le navigateur
form.addEventListener('submit', (element) => {    // conserver les entrées de données du formulaire
  element.preventDefault();
})

function openRemerciments() {
  form.style.display = "none";
  validForm.style.display = "flex";
  validMessage.innerHTML = "Merci pour votre inscription";
};

function validate() {
  if (generiqueValidate(firstName, regExTypeText, "Veuillez rentrer deux caractères minimum", firstText, firstName)
    && generiqueValidate(lastName, regExTypeText, "Veuillez rentrer deux caractères minimum", lastText, lastName)
    && generiqueValidate(email, regExTypeEmail, "Veuillez rentrer une adresse email valide", emailText, email)
    && validBirthdate(birthdate) 
    && validQuantity(quantity) 
    && validLocationTournament()
    && validCondition(condition)) {
      openRemerciments();
    } 
  }

// submit
btnValid.addEventListener("click", function() { 
  window.location.reload();
});
