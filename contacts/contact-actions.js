import { LitElement, html, css } from "lit-element";

import ContactStore from "./contact-store.js"

export default class ContactActions extends LitElement
{
	static get properties() {
    return {
			isFilteringByFavourites: { type: Boolean }
    };
	}

	static get styles() {
		return css`
			.contact-actions {
				display: flex;
				padding: 1rem 1rem 0;
				justify-content: flex-end;
			}

			.filter {
				border: none;
				padding: .5rem 0;
				font-size: .875rem;
				color: #fff;
				background: transparent;
				cursor: pointer;
			}
		`;
	}

	constructor() {
		super();
		ContactStore.addListener(this);
		this.isFilteringByFavourites = false;
	}

	firstUpdated() {
		this.isFilteringByFavourites = ContactStore.getIsFilteringByFavourites(ContactStore.state);
	}

	stateChanged(state) {
		this.isFilteringByFavourites = ContactStore.getIsFilteringByFavourites(state);
	}

	toggleFilteringByFavourites() {
		ContactStore.toggleFilterByFavourites();
	}

	render() {
		return html`
		<div class="contact-actions">
			<button
				@click="${this.toggleFilteringByFavourites}"
				class="filter">${this.isFilteringByFavourites ? "Show all" : "Show favourites"}</button>
		</div>
		`;
	}
}

customElements.define("contact-actions", ContactActions);
