"use strict";


class Buses {
	
let profile;
let id;
let email;
	
const busTable = document.getElementById("busTable");
	
	static onSignIn(googleUser) {
		alert("SignedIn");
		profile = googleUser.getBasicProfile();
		const email = profile.getEmail();
		id = email.substring(0, email.lastIndexOf("@"));
		if (!email.endsWith("nbtschools.org")) {
			alert("Not a valid google account");
			throw new Error("Not a valid google account");
		}
		const divButton = document.getElementById("SignIn");
		divButton.hidden = true;
	}
	static submit() {
		const busList = document.getElementsByName("bus");
		let bus = 0;
		for (let busNum of busList) {
			if (busNum.checked) {
				bus = Number.parseInt(busNum.value);
				break;
			}
		}
		const newRow = busTable.insertRow();
		const nameCol = newRow.insertCell();
		const busCol = newRow.insertCell();
		busCol.innerHTML = `${bus}`;
		nameCol.innerHTML = `${profile.getName()}: ${id}`;
	}
}

	
                                                //# sourceMappingURL=buses.js.map
