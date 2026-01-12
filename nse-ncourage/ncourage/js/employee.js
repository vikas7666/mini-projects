function getQueryParam(name) {

    const urlSearchParams = new URLSearchParams(window.location.search);

    return urlSearchParams.get(name);

}

function getCookie(name) {

    var value = "; " + document.cookie;

    var parts = value.split("; " + name + "=");

    if (parts.length === 2) return parts.pop().split(";").shift();

}

var userName = getCookie("username");

if (userName) {

    document.getElementById("welcomeMessage").textContent =

        "Welcome, " + userName + " !";

}