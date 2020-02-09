import ContactItem from "./contact-item.js"
import ContactStore from "./contact-store.js"

export default class ContactList {
	constructor() {
		ContactStore.addListener(this);
	}

	stateChanged(state) {
		let contactListElement = document.getElementById("contact-list");
		contactListElement.innerHTML = "";
		contactListElement.appendChild(this.render(
			ContactStore.getFilteredContactsList(state)
		));
	}

	render(contacts) {
		let listFragment = document.createDocumentFragment();
	
		for (let i = 0; i < contacts.length; i++) {
			const contact = contacts[i];
			let contactItem = new ContactItem(contact);
			let el = contactItem.render();
			el.onclick = () => {
				ContactStore.setCurrentContact(contact.id);
			};
			listFragment.appendChild(el);
		}
	
		let listElement = document.createElement("ul");
		listElement.appendChild(listFragment);
		return listElement;
	}
}
