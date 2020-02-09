import { LitElement, html, css } from "lit-element";

export default class IconButton extends LitElement
{
	static get properties() {
		return {
			icon: { type: String },
			label: { type: String }
		}
	}

	static get styles() {
		return css`
			.icon-button {
				height: 1rem;
				width: 1rem;
				border: none;
				padding: 0;
				background-color: transparent;
				background-size: contain;
				background-repeat: no-repeat;
			}

			.icon-button--close {
				background-image: url('/assets/close.svg');
			}

			.icon-button--magnifier {
				background-image: url('/assets/magnifier.svg');
			}

			.icon-button--star {
				background-image: url('/assets/star.svg');
			}

			.icon-button--star_border {
				background-image: url('/assets/star_border.svg');
			}
		`;
	}

	constructor() {
		super();
		this.icon = "";
		this.label = "";
	}

	render() {
		return html`
			<button
				aria-label="${this.label}"
				class="icon-button icon-button--${this.icon}"></button>
		`;
	}
}

customElements.define("icon-button", IconButton);
