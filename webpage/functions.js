let inputValue = '';
let id = '';

(function setEventListeners() {
    document.getElementById("buttonOne").addEventListener("click", function () {
        sendEmail()
    });
    document.getElementById("buttonTwo").addEventListener("click", function () {
        sendEmail()
    });
    document.getElementById("inputOne").addEventListener("change", function (e) {
        setInputValues(e.target.value)
    });
    document.getElementById("inputTwo").addEventListener("change", function (e) {
        setInputValues(e.target.value)
    });
})()

function sendEmail() {
    document.getElementById("invalidEmail").style.display = "none";
    document.getElementById("duplicateEmail").style.display = "none";
    document.getElementById("goodEmail").style.display = "none";

    if (validateEmail(inputValue)) {
        postData('addEmail', { email: inputValue }).then(result => {
            if (result.message === "duplicate email") {
                document.getElementById("duplicateEmail").style.display = "inherit";
            } else {
                document.getElementById("inputOne").value = '';
                document.getElementById("inputTwo").value = '';
                document.getElementById("goodEmail").style.display = "inherit";
            }
        })
    } else {
        document.getElementById("invalidEmail").style.display = "inherit";
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

function saveNewEmail(body) {
    if (this.id) {
        postData('updateEmail', {...body, mailinglistbodyid: this.id}).then(_ => alert('Updated'))
    } else {
        postData('addNewEmail', body).then(_ => alert('Saved'))
    }
}

function sendEmail(body) {
    postData('sendEmail', body).then(_ => alert('Sent'))
}

function getRemainingTime() {
    getData('remainingTime').then(response => {
        const total = response.intervalLeft
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24) % 7);
        const weeks = Math.floor(total / (1000 * 60 * 60 * 24 * 7));

        const clock = document.getElementById('clock')
        clock.innerHTML = weeks + ' weeks, ' + days + ' days, and ' + hours + ' hours left until next delivery.'
    })
}

function getListOfEmails() {
    getData('listOfEmails').then(response => {
        let select = document.getElementById('emailListSelect')
        select.addEventListener('change', (event) => {
            if (event.target.value) {
                getEmail(event.target.value)
            } else {
                document.getElementById('subject').value = ''
                editor.root.innerHTML = ''
                this.id = ''
            }
        });
        response.forEach(email => {
            var option = '<option value="' + email.mailinglistbodyid + '" >' + email.subject + '</option>';
            select.insertAdjacentHTML('beforeend', option);
        })
    })
}

function getEmail(id) {
    getData('specificEmail/' + id).then(response => {
        let email = response[0]
        document.getElementById('subject').value = email.subject
        editor.clipboard.dangerouslyPasteHTML(email.body)
        this.id = email.mailinglistbodyid
    })
}

async function getData(slug) {
    const response = await fetch(window.location.origin + '/' + slug, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
    return response.json();
}

async function postData(slug, body) {
    const response = await fetch(window.location.origin + '/' + slug, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
    });
    return response.json();
}