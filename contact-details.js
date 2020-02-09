import { LitElement, html, css } from "lit-element";

import ContactStore from "./contact-store.js";

export default class ContactDetails extends LitElement
{
	static get properties() {
    return {
			contact: { type: Object }
    };
	}

	static get styles() {
		return css`
			.contact-details {
				position: relative;
				padding: .5rem;
				border-radius: .25rem;
				background: rgb(124, 157, 170);
			}

			.close {
				position: absolute;
				top: .5rem;
				right: .5rem;
			}

			.header {
				display: flex;
			}
		`;
	}

	constructor() {
		super();
		ContactStore.addListener(this);
		this.contact = null;
	}

	stateChanged(state) {
		this.contact = ContactStore.getCurrentContact(state);
	}

	close() {
		ContactStore.setCurrentContact(null);
	}

	favourite() {
		ContactStore.toggleFavourite(this.contact.id);
	}

	render() {
		return this.contact ? html`
			<div class="contact-details">
				<button
					@click="${this.close}"
					class="close">x</button>

				<div class="header">
					<div class="name">${this.contact.name}</div>
					<button
						@click="${this.favourite}"
						class="favourite">*</button>
				</div>

				<div class="email">${this.contact.email}</div>
			</div>
		` : html``;
	}
}

customElements.define("contact-details", ContactDetails);
