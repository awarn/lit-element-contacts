contacts = [
	{
		"name": "Roselyn Hahn",
		"email": "roselyn.hahn@example.com"
	},
	{
		"name": "Javon Gleichner",
		"email": "javon.gleichner@example.com"
	},
	{
		"name": "Madonna Metz",
		"email": "madonna.metz@example.com"
	},
	{
		"name": "Jeffrey Ryan",
		"email": "jeffrey.ryan@example.com"
	},
	{
		"name": "Nat Stiedemann",
		"email": "nat.stiedemann@example.com"
	},
	{
		"name": "Nicklaus Stokes",
		"email": "nicklaus.stokes@example.com"
	},
	{
		"name": "Morris Bechtelar",
		"email": "morris.bechtelar@example.com"
	},
	{
		"name": "Michale Hammes",
		"email": "michale.hammes@example.com"
	},
	{
		"name": "Keyon Herzog",
		"email": "keyon.herzog@example.com"
	},
	{
		"name": "Brody Schaefer",
		"email": "brody.schaefer@example.com"
	},
	{
		"name": "Stacey Kozey",
		"email": "stacey.kozey@example.com"
	}
];

function closeDetails() {
	var detailsElement = document.getElementById("contact-details");
	detailsElement.classList.add("hidden");
}

function showDetails(contactId) {
	var detailsElement = document.getElementById("contact-details"); // Fragment

	var contact = contacts[contactId]; // null check?

	var favouriteClass = contact.favourite ? "favourite" : "";

	detailsElement.innerHTML =
		'<span id="close-details">x</span>' +
		'<span id="favourite" class="' + favouriteClass + '">*</span>' +
		"<div>" + contact.name + "</div>" +
		"<div>" + contact.email + "</div>";

	detailsElement.classList.remove("hidden"); // Global "hidden" klass är inte min favorit.
}

function toggleFavourite(contactId, favouriteElement) {
	contacts[contactId].favourite = !contacts[contactId].favourite;

	if (contacts[contactId].favourite) {
		favouriteElement.classList.add("favourite");
	} else {
		favouriteElement.classList.remove("favourite");
	}
}

function renderList() {
	var listFragment = document.createDocumentFragment();

	for (var i = 0; i < contacts.length; i++) {
		var el = document.createElement("div");
		el.innerHTML = contacts[i].name;
		el.className = "contact-name";
		el.id = i; // Modell i vyn.

		el.onclick = e => {
			var contactId = parseInt(e.currentTarget.id);
			showDetails(contactId);

			document.getElementById("favourite").onclick = function (e) {
				toggleFavourite(contactId, e.currentTarget);
			}

			document.getElementById("close-details").onclick = closeDetails;
		};

		listFragment.appendChild(el);
	}

	document.getElementById("contact-list").appendChild(listFragment);
}

function initFilter() {
	document.getElementById("contact-filter").onclick = function (e) {
		var contactNames = document.querySelectorAll(".contact-name");

		if (e.currentTarget.innerText === "Visa alla") {
			e.currentTarget.innerText = "Filtrera favoriter"
			contactNames.forEach(function (node, i) {
				node.setAttribute("class", "contact-name");
			})
		} else {
			e.currentTarget.innerText = "Visa alla";
			contactNames.forEach(function (node, i) {
				if (contacts[i].favourite) {
					node.setAttribute("class", "contact-name");
				} else {
					node.setAttribute("class", "hidden contact-name");
				}
			})
		}
	};
}

function initSearch() {
	document.getElementById("search-button").onclick = function () {
		var contactNames = document.querySelectorAll(".contact-name");
		contactNames.forEach(function (node) {
			var regexp = new RegExp(document.getElementById("search").value.toLowerCase());
			if (regexp.test(node.innerText.toLowerCase())) {
				node.setAttribute("class", "contact-name");
			} else {
				node.setAttribute("class", "hidden contact-name");
			}
		})
	}
}

window.onload = function () {
	renderList();
	initFilter();
	initSearch();
};
