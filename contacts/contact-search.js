import { LitElement, html, css } from "lit-element";

import ContactStore from "./contact-store.js"

import IconButton from "/buttons/icon-button.js"

export default class ContactSearch extends LitElement
{
	static get properties() {
    return {
			query: { type: String }
    };
	}

	static get styles() {
    return css`
			.contact-search {
				display: flex;
				margin: 0 1rem;
				border-radius: .25rem;
				padding: 0 .75rem 0 0;
				font-weight: bold;
				background: #3a3d52;
				justify-content: space-between;
				align-items: center;
			}

			input[type="text"] {
				flex: 1 0;
				border: none;
				padding: .75rem;
				font-size: .875rem;
				font-weight: bold;
				color: #fff;
				background: transparent;
			}

			input[type="text"]::placeholder {
				color: #aaa;
			}
    `;
	}

	constructor() {
		super();
		this.query = "";
	}

	search(e) {
		e.preventDefault();
		ContactStore.searchFor(this.query.toLowerCase());
	}

	render() {
		return html`
			<form
				@submit="${this.search}"
				class="contact-search">
				<input 
					type="text"
					placeholder="Search"
					@change="${e => this.query = e.target.value}" />
				<icon-button
					label="Search"
					icon="magnifier"
					@click="${this.search}"></icon-button>
			</form>
		`;
	}
}

customElements.define("contact-search", ContactSearch);
