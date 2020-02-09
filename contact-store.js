
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

class ContactStore extends Store
{
	state = {
		contacts: [],
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

	async fetchContacts() {
		try {
			let response = await fetch("/contacts.json");
			let contacts = await response.json();
			this.state.contacts = contacts
				.reduce((collection, contact, i) => {
					contact.id = i;
					collection[i] = contact;
					return collection;
				}, {})
		} catch (error) {
			console.error(error);
		} finally {
			this.stateChanged();
		}
	}

	getIsFilteringByFavourites(state) {
		return state.isFilteredByFavourites;
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
		let contact = state.contacts[state.currentContact] ? {
			...state.contacts[state.currentContact]
		} : null
		return contact;
	}
}

export default new ContactStore();
