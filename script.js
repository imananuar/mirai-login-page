// DOM to access email and password by ID
let email = document.getElementById('email');
let pwd = document.getElementById('password');
const span = document.createElement('span'); //Create element span
var searchTimeout = null; // Timeout declare for setTimout

// Function -> Update value email and pass from user
const updateEmailInput = (value) => email.value = value;
const updatePwdInput = (value) => pwd.value = value;

// When key was pressed, execute emailValidity and passwordValidity function after 0.5s
email.addEventListener('keyup', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(emailValidity(email.value), 100);
});

pwd.addEventListener('keyup', () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {passwordValidity(pwd.value)}, 100);
});

/**
* function to add the element after the choosen node.
*/
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

/**
* function to remove the element
*/
function idRemoval(id_string) {
  if (document.getElementById(id_string) !== null) {
    document.getElementById(id_string).remove();
  }
}

/**
* function to  test the availability of sign '@' in the input.
* return true if @ is available
*/

const emailValidity = (str) => {
  let regex = /@/;
  let counter = 0;
  const div_email_input = document.getElementById('email-input'); //Get element by id

  idRemoval('warning-1');

  if (regex.test(str)) {
    idRemoval('email-exclamation');

    if (document.getElementById('email-check') === null) {
      span.className = 'fas fa-check'; //Assign classname fas fa-check yang mana kita run font checkmark
      span.id = 'email-check';
      insertAfter(span, div_email_input.firstElementChild.nextSibling); //insert span tu lepas first child.
    }

    return true;

  } else {
      if (!regex.test(str) && document.getElementById('email-check') !== null) {
        document.getElementById('email-check').remove(); // Remove check mark if it is exist.
      };

      // Add exclamation mark
      if (document.getElementById('email-exclamation') === null) {
        span.className = 'fas fa-exclamation';
        span.id = 'email-exclamation';
        insertAfter(span, div_email_input.firstElementChild.nextSibling);
      }
      return false;
  }
}

/**
FUNCTION TO TEST PASSWORD CONTAIN:
 MORE THAN 8 LETTERS
 1[A-Z], 1[a-z], 1[0-9], 1[+-/*]
 return true if both are true
*/
const passwordValidity = (str) => {
  let regex1 = /[A-Z]/;
  let regex2 = /[a-z]/;
  let regex3 = /[0-9]/;
  let regex4 = /[+-/*]/;
  const pwCharacter = {
    'capitalLetter': false,
    'smallLetter': false,
    'number': false,
    'specialCharacter': false
  };

  const para = document.createElement("p");
  let div_password_input = document.getElementById("password-input");
  const passLetters = document.createTextNode("Your password should be at least 8 letters");
  const passChar = document.createTextNode("Your password should contain at least 1 capital [A-Z], 1 lower[a-z], 1 numeric [0-9] and 1 special character [+-/*]")
  let sign_in_form = document.getElementById('sign-in-form');

  if (str.length < 8) {

    if (document.getElementById('warning-1') === null) {
      insertAfter(para, sign_in_form.children[1].nextSibling);

      para.id = "warning-1";
      para.className = "warning-1";
      para.appendChild(passLetters);
    }

    if (document.getElementById('password-exclamation') === null) {
      idRemoval('password-check');

      span.className = 'fas fa-exclamation';
      span.id = 'password-exclamation';
      insertAfter(span, div_password_input.firstElementChild.nextSibling);
    }
    return false;

  } else if (str.length > 8){
    idRemoval('warning-1');

    for (var i = 0; i < str.length; i++) {
      if (regex1.test(str[i])) {
        pwCharacter['capitalLetter'] = true;

      } else if (regex2.test(str[i])){
        pwCharacter['smallLetter'] = true;

      } else if (regex3.test(str[i])) {
        pwCharacter['number'] = true;

      } else if (regex4.test(str[i])) {
        pwCharacter['specialCharacter'] = true;

      }
    }
  }

  if (Object.values(pwCharacter).every(bool => bool === true)) {
    idRemoval('password-exclamation');

    span.className = 'fas fa-check';
    span.id = 'password-check';
    insertAfter(span, div_password_input.firstElementChild.nextSibling);

    return true;

  } else {
    idRemoval('password-check');
    insertAfter(para, sign_in_form.children[1].nextSibling);

    para.id = "warning-1";
    para.className = "warning-1";
    para.appendChild(passChar);

    return false;
  }
}

document.querySelector("button").addEventListener("click", () => {
  if (emailValidity(email.value) && passwordValidity(pwd.value) === true) {
    alert("You have logged in!");
  } else {
    alert("Please fix you email / password!");
  }
});
