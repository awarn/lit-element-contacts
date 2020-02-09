import { LitElement, html, css } from "lit-element";

export default class ContactItem extends LitElement {
	static get properties() {
    return {
			id: { type: String },
			name: { type: String },
			favourite: { type: String }
    };
	}

	static get styles() {
    return css`
			.contact-item {
				padding: .5rem;
				font-weight: bold;
				background: #5d6961;
			}

			.contact-item.favourite {
				background: gold;
			}
    `;
	}
	
	constructor() {
		super();
		this.id = "";
		this.name = "";
		this.favourite = "";
	}

	render() {
		return html`
			<div class="contact-item ${this.favourite ? "favourite" : ""}">
				${this.name}
			</div>
		`;
	}
}

customElements.define("contact-item", ContactItem);
