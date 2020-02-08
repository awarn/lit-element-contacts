import ContactStore from "./contact-store.js"

function closeDetails() {
	var detailsElement = document.getElementById("contact-details");
	detailsElement.classList.add("hidden");
}

function showDetails(contactId) {
	ContactStore.setCurrentContact(contactId);
}

function toggleFavourite(contactId) {
	ContactStore.toggleFavourite(contactId);
}

function renderList(contacts, searchQuery, filterByFavourites) {
	let listFragment = document.createDocumentFragment();

	for (let i = 0; i < contacts.length; i++) {
		const contact = contacts[i];

		let el = document.createElement("div");
		el.innerHTML = contact.name;
		el.className = "contact-name";
		el.id = i; // Modell i vyn.

		if (contact.favourite) {
			el.classList.add("favourite");
		}
		else if (filterByFavourites) {
			el.classList.add("hidden");
		}

		if (searchQuery) {
			let regexp = new RegExp(searchQuery);
			if (!regexp.test(contact.name.toLowerCase())) {
				el.classList.add("hidden");
			}
		}

		el.onclick = e => {
			let contactId = parseInt(e.currentTarget.id);
			showDetails(contactId);

			document.getElementById("favourite").onclick = function (e) {
				toggleFavourite(contactId, e.currentTarget);
			}

			document.getElementById("close-details").onclick = closeDetails;
		};

		listFragment.appendChild(el);
	}

	let contactListElement = document.getElementById("contact-list");
	contactListElement.innerHTML = "";
	contactListElement.appendChild(listFragment);
}

function renderDetails(contact) {
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
}

function initFilter() {
	document.getElementById("contact-filter").onclick = function (e) {
		ContactStore.toggleFilterByFavourites();

		if (e.currentTarget.innerText === "Visa alla") {
			e.currentTarget.innerText = "Filtrera favoriter";
		} else {
			e.currentTarget.innerText = "Visa alla";
		}
	};
}

function initSearch() {
	document.getElementById("search-button").onclick = function () {
		let query = document.getElementById("search").value.toLowerCase();
		ContactStore.searchFor(query);
	}
}

class ContactList {
	constructor() {
		ContactStore.addListener(this);
		ContactStore.showAllContacts();
		initFilter();
		initSearch();
	}

	stateChanged(state) {
		renderList(state.contacts, state.searchQuery, state.isFilteredByFavourites);
		renderDetails(state.contacts[state.currentContact]);
	}
}

window.onload = function () {
	let list = new ContactList();
};
