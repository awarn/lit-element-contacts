import ContactList from "./contact-list.js"
import ContactStore from "./contact-store.js"
import ContactDetails from "./contact-details.js";

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

window.onload = function () {
	new ContactDetails();
	new ContactList();
	initFilter();
	initSearch();
	ContactStore.fetchContacts();
};
