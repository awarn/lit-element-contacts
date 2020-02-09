import { LitElement, html, css } from "lit-element";

import ContactStore from "./contacts/contact-store.js";

import ContactDetails from "/contacts/contact-details.js";
import ContactList from "/contacts/contact-list.js";
import ContactSearch from "/contacts/contact-search.js";
import ContactActions from "/contacts/contact-actions.js";

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
				margin: 1.25rem 1rem .75rem;
				font-size: 1.25rem;
				font-weight: bold;
			}
		`;
	}

	constructor() {
		super();
		ContactStore.addListener(this);
		this.contacts = [];
		ContactStore.fetchContacts();
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
