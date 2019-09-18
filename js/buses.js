"use strict";
function submit() {
    var name = document.getElementById("name");
    var busList = document.getElementsByName("bus");
    var bus = 0;
    for (var i = 0; i < busList.length; i++) {
        if (busList[i].checked) {
            bus = i + 1;
            break;
        }
    }
    if (bus === 0) {
        alert("Pick a bus");
        return;
    }
    var table = document.getElementById("status");
    table.innerHTML += "<tr><td class=\"entry\">" + name + "</td><td class=\"entry\">" + bus + "</td></tr>";
    function onSignin(googleUser) {
        var profile = googleUser.getBasicProfile();
        name.innerHTML = profile.getName();
        var email = profile.getEmail();
        var id = email.substring(0, email.lastIndexOf("@"));
    }
}
//# sourceMappingURL=buses.js.map