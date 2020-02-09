import { LitElement, html, css } from "lit-element";

export default class ContactItem extends LitElement
{
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
				display: flex;
				width: 100%;
				border: none;
				padding: .5rem;
				font-size: 1rem;
				font-weight: bold;
				color: #fff;
				background: #5d6961;
				cursor: pointer;
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
			<button class="contact-item ${this.favourite ? "favourite" : ""}">
				${this.name}
			</button>
		`;
	}
}

customElements.define("contact-item", ContactItem);
