
const contacts = [
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

class Store {
	listeners = [];
	state = {};

	addListener(listener) {
		this.listeners.push(listener);
	}

	stateChanged() {
		for (let i = 0; i < this.listeners.length; i++) {
			const listener = this.listeners[i];
			listener.stateChanged(this.state);
		}
	}
}

class ContactStore extends Store {
	state = {
		contacts: contacts.reduce((collection, contact, i) => {
			contact.id = i;
			collection[i] = contact;
			return collection;
		}, {}),
		searchQuery: null,
		isFilteredByFavourites: false,
		currentContact: null
	}

	toggleFavourite(contactId) {
		this.state.contacts[contactId].favourite = !this.state.contacts[contactId].favourite;
		this.stateChanged();
	}

	toggleFilterByFavourites() {
		this.state.isFilteredByFavourites = !this.state.isFilteredByFavourites;
		this.stateChanged();
	}

	searchFor(query) {
		this.state.searchQuery = query;
		this.stateChanged();
	}

	setCurrentContact(contactId) {
		this.state.currentContact = contactId;
		this.stateChanged();
	}

	showAllContacts() {
		this.searchQuery = "";
		this.isFilteredByFavourites = false;
		this.stateChanged();
	}

	getContactsList(state) {
		return Object.values(state.contacts);
	}

	getFilteredContactsList(state) {
		return Object.values(state.contacts)
			.filter((contact) => {
				return !state.isFilteredByFavourites || contact.favourite;
			})
			.filter((contact) => {
				if (state.searchQuery) {
					let regexp = new RegExp(state.searchQuery);
					if (!regexp.test(contact.name.toLowerCase())) {
						return false;
					}
				}
				return true;
			});
	}

	getCurrentContact(state) {
		return state.contacts[state.currentContact];
	}
}

export default new ContactStore();
