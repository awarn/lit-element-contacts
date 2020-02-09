export default class ContactItem {
	constructor(contact) {
		this.contact = contact;
	}

	render() {
		let el = document.createElement("li");
		el.innerHTML = this.contact.name;
		el.className = "contact-item";

		if (this.contact.favourite) {
			el.classList.add("favourite");
		}

		return el;
	}
}
