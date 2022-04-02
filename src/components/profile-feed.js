import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { map } from 'lit/directives/map.js';
import { classMap } from 'lit/directives/class-map.js';
import { resets } from '../components-css/resets';
import { getPostsByUserId } from '../api/data';

class ProfileFeed extends LitElement {
	static properties = {
		userPosts: { type: Array },
		user: { type: Object },
		postsQty: { type: Number },
	}

	static styles = [
		resets,
		css`
		:host {
			padding-top: 23px;
		}
		:host > *:not(:last-child) {
			margin-bottom: 10px; 
		} 
		.footer {
			display: flex;
			align-items: center;
		}
		.more-btn {
			margin: 0 auto;
			color: white;
			font-size: 0.9rem;
			font-weight: 500;
			text-align: center;
			border: 0px;
			border-radius: 3px;
			background-color: #0095f6;
			padding: 0.7rem;
		}
		.more-btn:hover {
			background-color: rgba(0, 149, 246, 0.8);
			cursor: pointer;
		}
		`
	];
	constructor() {
		super();
		this.userPosts = [];
		this.user = {};
		this.postsQty = 10;
	}

	connectedCallback() {
		super.connectedCallback();
		this.allUserPosts();
	}

	getMorePosts() {
		this.postsQty += 10;
		this.allUserPosts();
	}

	async allUserPosts() {
		const newData = await getPostsByUserId(this.user.uid, this.postsQty);
		this.userPosts = Object.entries(newData)
			.sort((a, b) => b[1].createdAt - a[1].createdAt);
	}

	render() {
		return html`
		${this.userPosts
			.map(el =>
				html`
				<user-post data-id=${el[0]} creatorUsername=${el[1].creatorUsername ? 	el[1].creatorUsername : 'User'}
					body=${el[1].body} photoURL=${el[1].photoURL}>
				</user-post>`)}
		<div class="footer">
			<button class="more-btn" type="button" @click=${this.getMorePosts}>Load more...</button>
		</div>
		`;
	}
}

customElements.define('profile-feed', ProfileFeed);
