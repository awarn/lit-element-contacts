import { LitElement, html, css } from "lit-element";

import ContactItem from "./contact-item.js"
import ContactStore from "./contact-store.js"

export default class ContactList extends LitElement {
	static get properties() {
    return {
			contacts: { type: Array }
    };
	}

	static get styles() {
    return css`
      .contact-list {
        margin: 0;
        padding: 0;
			}

			li {
				margin: .125rem 0 0;
				overflow: hidden;
			}

			li:first-child {
				margin: 0;
				border-radius: .25rem .25rem 0 0;
			}

			li:last-child {
				border-radius: 0 0 .25rem .25rem;
			}
    `;
  }

	constructor() {
		super();
		ContactStore.addListener(this);
		this.contacts = [];
	}

	stateChanged(state) {
		this.contacts = ContactStore.getFilteredContactsList(state);
	}

	itemClickHander(contactId) {
		ContactStore.setCurrentContact(contactId);
	}

	render() {
		return html`
			<ul class="contact-list">
				${this.contacts.map(contact => html`
					<li>
						<contact-item
							.id="${contact.id}"
							.name="${contact.name}"
							.favourite="${contact.favourite}"
							@click="${e => this.itemClickHander(e.target.id)}"></contact-item>
					</li>
				`)}
			</ul>
		`;
	}
}

customElements.define("contact-list", ContactList);
