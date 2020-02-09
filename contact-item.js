import { LitElement, html, css } from "lit-element";

export default class ContactItem extends LitElement {
	static get properties() {
    return {
			contact: { type: Object }
    };
	}

	static get styles() {
    return css`
			.contact-item {
				padding: .5rem;
				font-weight: bold;
				background: #5d6961;
			}
    `;
  }

	render() {
		return html`
			<div class="contact-item ${this.contact.favourite ? "favourite" : ""}">
				${this.contact.name}
			</div>
		`;
	}
}

customElements.define("contact-item", ContactItem);
