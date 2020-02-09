import { LitElement, html, css } from "lit-element";

import ContactStore from "./contact-store.js";

import ContactDetails from "./contact-details.js";
import ContactList from "./contact-list.js";
import ContactSearch from "./contact-search.js";
import ContactActions from "./contact-actions.js";

export default class ContactsApp extends LitElement
{
	static get properties() {
    return {
			currentContact: { type: Object }
    };
	}

	static get styles() {
		return css`
			.title {
				margin: 0 1rem;
			}
		`;
	}

	constructor() {
		super();
		ContactStore.addListener(this);
		this.contacts = [];
		ContactStore.fetchContacts();
	}

	firstUpdated() {
		this.currentContact = ContactStore.getCurrentContact(ContactStore.state);
	}

	stateChanged(state) {
		this.currentContact = ContactStore.getCurrentContact(state);
	}

	render() {
		return html`
			<h1 class="title">Contacts</h1>

			<contact-search></contact-search>

			${this.currentContact ?
				html`<contact-details></contact-details>` :
				html`
					<contact-actions></contact-actions>
					<contact-list></contact-list>`
			}
		`;
	}
}

customElements.define("contacts-app", ContactsApp);