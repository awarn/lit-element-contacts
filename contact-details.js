import ContactStore from "./contact-store.js";

export default class ContactDetails {
	constructor() {
		ContactStore.addListener(this);
	}

	stateChanged(state) {
		this.render(ContactStore.getCurrentContact(state));
	}

	closeDetails() {
		var detailsElement = document.getElementById("contact-details");
		detailsElement.classList.add("hidden");
	}

	render(contact) {
		if (!contact) {
			return;
		}

		let detailsElement = document.getElementById("contact-details"); // Fragment

		let favouriteClass = contact.favourite ? "favourite" : "";

		detailsElement.innerHTML =
			'<span id="close-details">x</span>' +
			'<span id="favourite" class="' + favouriteClass + '">*</span>' +
			"<div>" + contact.name + "</div>" +
			"<div>" + contact.email + "</div>";

		detailsElement.classList.remove("hidden"); // Global "hidden" klass är inte min favorit.

		document.getElementById("favourite").onclick = () => {
			ContactStore.toggleFavourite(contact.id);
		}

		document.getElementById("close-details").onclick = this.closeDetails;
	}
}

