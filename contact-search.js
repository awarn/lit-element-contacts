import { LitElement, html, css } from "lit-element";

import ContactStore from "./contact-store.js"

import IconButton from "./icon-button.js"

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
				height: 2rem;
				margin: 0 1rem;
				border-radius: .25rem;
				padding: 0 .5rem 0 0;
				font-weight: bold;
				background: #3a3d52;
				justify-content: space-between;
				align-items: center;
			}

			input[type="text"] {
				flex: 1 0;
				border: none;
				padding: .5rem;
				font-size: 1rem;
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

	search() {
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
