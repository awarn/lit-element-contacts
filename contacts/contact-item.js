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
				padding: .75rem;
				font-size: .875rem;
				font-weight: bold;
				color: #fff;
				background: #3a3d52;
				cursor: pointer;
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
