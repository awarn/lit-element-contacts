import { LitElement, html, css } from "lit-element";

import ContactStore from "./contact-store.js"

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
				border-radius: .25rem;
				font-weight: bold;
				background: #5d6961;
				justify-content: space-between;
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
					placeholder="Sök"
					.value="${this.query}" />
				<button>Sök</button>
			</form>
		`;
	}
}

customElements.define("contact-search", ContactSearch);
