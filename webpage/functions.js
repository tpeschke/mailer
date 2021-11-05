let inputValue = '';

(function setEventListeners() {
    document.getElementById("buttonOne").addEventListener("click", function() {
        sendEmail()
    });
    document.getElementById("buttonTwo").addEventListener("click", function() {
        sendEmail()
    });
    document.getElementById("inputOne").addEventListener("change", function(e) {
        setInputValues(e.target.value)
    });
    document.getElementById("inputTwo").addEventListener("change", function(e) {
        setInputValues(e.target.value)
    });
})()

function sendEmail () {
    if (validateEmail(inputValue)) {
        postData().then(result => {
            document.getElementById("inputOne").value = ''
            document.getElementById("inputTwo").value = ''
        })
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

function setInputValues(value) {
    document.getElementById("inputOne").value = value
    document.getElementById("inputTwo").value = value
    inputValue = value
}

async function postData() {
    const response = await fetch(window.location.href + 'addEmail', {
      method: 'POST',
      mode: 'cors', 
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify({email: inputValue})
    });
    return response.json();
  }