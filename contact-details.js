import ContactStore from "./contact-store.js";

export default class ContactDetails {
	constructor() {
		ContactStore.addListener(this);
	}

	stateChanged(state) {
		let contact = ContactStore.getCurrentContact(state);
		let element = document.getElementById("contact-details");
		element.innerHTML = "";

		if (contact) {
			element.appendChild(this.render(
				ContactStore.getCurrentContact(state)
			));
		}
	}

	render(contact) {
		let detailsElement = document.createElement("div");

		detailsElement.innerHTML =
			"<div>" + contact.name + "</div>" +
			"<div>" + contact.email + "</div>";

		let closeButton = document.createElement("button");
		closeButton.onclick = () => {
			ContactStore.setCurrentContact(null);
		};
		closeButton.textContent = "x";

		detailsElement.prepend(closeButton);

		let favouriteButton = document.createElement("button");
		favouriteButton.onclick = () => {
			ContactStore.toggleFavourite(contact.id);
		}
		favouriteButton.textContent = "*";
		favouriteButton.className = contact.favourite ? "favourite" : "";

		detailsElement.prepend(favouriteButton);

		return detailsElement;
	}
}

