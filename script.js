const username = document.querySelector("#username");
const pass = document.querySelector("#password");
const pass2 = document.querySelector("#password2");
const email = document.querySelector("#email");
const sendBtn = document.querySelector(".send");
const clearBtn = document.querySelector(".clear");
const popup = document.querySelector(".popup");
const close = document.querySelector(".close");

const showError = (input, msg) => {
  const formBox = input.parentElement;
  const errMsg = formBox.querySelector(".error-text");
  formBox.classList.add("error");
  errMsg.textContent = msg;
};

const clearErr = (input) => {
  const formBox = input.parentElement;
  formBox.classList.remove("error");
};
const checkForm = (input) => {
  input.forEach((el) => {
    if (el.value === "") {
      showError(el, el.placeholder);
    } else {
      clearErr(el);
    }
  });
};

const checkLength = (input, minVal) => {
  if (input.value.length < minVal) {
    showError(
      input,
      `${input.previousElementSibling.innerText.slice(
        0,
        -1
      )} musi składać się co namjmniej z ${minVal} znaków`
    );
  }
};

const checkPassword = (pass1, pass2) => {
  if (pass1.value !== pass2.value) {
    showError(pass2, "Hasła nie są takie same");
  }
};

const checkMail = (email) => {
  const validateEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (validateEmail.test(email.value)) {
    clearErr(email);
  } else {
    showError(email, "E-mail jest niepoprawny");
  }
};

const checkErr = () => {
  const allInput = document.querySelectorAll(".from-box");
  let errCount = 0;
  allInput.forEach((el) => {
    if (el.classList.contains("error")) {
      errCount++;
    }

    if (errCount === 0) {
        popup.classList.add("show-popup");
      }
  });

 
};

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();

  checkForm([username, pass, pass2, email]);
  checkLength(username, 3);
  checkLength(pass, 8);
  checkPassword(pass, pass2);
  checkMail(email);
  checkErr();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();

  [username, pass, pass2, email].forEach((el) => {
    el.value = "";
    clearErr(el);
  });
});

close.addEventListener("click", (e) => {
  e.preventDefault();
  popup.classList.remove("show-popup");
});
