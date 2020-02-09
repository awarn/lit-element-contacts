import { LitElement, html, css } from "lit-element";

import ContactStore from "./contact-store.js";

import IconButton from "./icon-button.js"

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
				min-height: 20rem;
				margin: 1rem 0;
				padding: .5rem;
				border-radius: .25rem;
				background: rgb(208, 226, 233);
				color: #000;
			}

			.close {
				position: absolute;
				top: .5rem;
				right: .5rem;
			}

			.email {
				font-size: .75rem;
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

	firstUpdated() {
		this.contact = ContactStore.getCurrentContact(ContactStore.state);
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
				<div class="close">
					<icon-button
						label="Stäng"
						icon="close"
						@click="${this.close}"></icon-button>
				</div>

				<div class="header">
					<div class="name">${this.contact.name}</div>

					<div class="favourite">
						<icon-button
							label="Favourite"
							icon="${this.contact.favourite ? "star" : "star_border" }"
							@click="${this.favourite}"></icon-button>
					</div>
				</div>

				<div class="email">${this.contact.email}</div>
			</div>
		` : html``;
	}
}

customElements.define("contact-details", ContactDetails);
