"use strict";

const busTable = document.getElementById("busTable");
class Buses {
	

	
	static onSignIn(googleUser) {
		alert("SignedIn");
		Buses.profile = googleUser.getBasicProfile();
		Buses.email = profile.getEmail();
		Buses.id = email.substring(0, email.lastIndexOf("@"));
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
		nameCol.innerHTML = `${Buses.profile.getName()}: ${Buses.id}`;
	}
}

	
                                                //# sourceMappingURL=buses.js.map
