import { LitElement, css, html } from 'lit';
import { resets } from './components-css/resets';
import { getUser, userState } from './api/auth';

const windowBreakpoint = 700;

export class HomePage extends LitElement {
	static properties = {
		name: { type: String },
		userState,
		windowWidth: { type: Number },
		navigation: { type: String },
		activePage: { type: String },
	}

	static styles = [
		resets,
		css`
		#wrapper {
			display: grid;  
			grid-template-columns: 1fr 2fr; 
			gap: 10px;
			margin: 0 auto; 
			max-width: 980px; 
			padding-top: 20px;
		}
		main > *:not(:last-child) {
			margin-bottom: 10px; 
		} 

		@media only screen and (max-width: ${windowBreakpoint}px) {
			#wrapper {
				grid-template-columns: 1fr; 
			}
		}
	`
	];
	constructor(name = 'World') {
		super();
		this.name = name;
		this.activePage = '/';
		this.isLogged = userState;
		this.windowWidth = this.getWindowWidth();
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener('resize', this.updateWindowWidth.bind(this));
	}

	disconnectedCallback() {
		window.removeEventListener('resize', this.updateWindowWidth.bind(this));
		super.disconnectedCallback();
	}

	getWindowWidth() {
		return window.innerWidth;
	}

	async updateWindowWidth() {
		this.windowWidth = window.innerWidth;
	}

	render() {
		return html`
			<div id="wrapper">
				<div>
					${this.windowWidth >= windowBreakpoint ? html`<slot name="side"></slot>` : null}
				</div>
				<main>
					<slot name="main"></slot>
				</main>
			</div>
		`;
	}
}

customElements.define('app-root', HomePage);
