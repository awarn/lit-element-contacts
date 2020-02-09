
import ContactDetails from "./contact-details.js";
import ContactList from "./contact-list.js"
import ContactSearch from "./contact-search.js"
import ContactStore from "./contact-store.js"

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

window.onload = function () {
	initFilter();
	ContactStore.fetchContacts();
};
