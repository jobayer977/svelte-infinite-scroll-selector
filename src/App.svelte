<script lang="ts">
	import { clickOutside, inview } from './actions'
	import { createEventDispatcher } from 'svelte'
	export let requried: boolean = false
	export { className as class }
	export let label: string = ''
	export let placeholder: string = ''
	let className: string = ''
	export let total: number = 0
	export let perPage: number = 0
	export let loading: boolean = false
	export let value: any = {
		label: '',
		value: null,
	}
	export let options: {
		label: string
		value: any
	}[] = []
	const dispatch = createEventDispatcher()
	let isExpanded = false
	const onLoadMore = () => {
		dispatch('loadMore')
	}
	let searchTerm = ''
	const onSearch = (term: string) => {
		searchTerm = term
		dispatch('search', term)
	}
	const onClear = () => {
		dispatch('clear')
		searchTerm = ''
	}
	const onChange = (value: any) => {
		dispatch('change', value)
		isExpanded = false
	}
	function removeDuplicateObject(array: any[], key: string) {
		return array.filter((obj, index, self) => {
			return self.findIndex((t) => t[key] === obj[key]) === index
		})
	}
</script>

<div
	class={`${className} relative`}
	use:clickOutside
	on:click_outside={(e) => {
		isExpanded = false
	}}
>
	<label for="City"
		>{label}
		{#if requried && label?.length}
			<span class="text-red-500">*</span>
		{/if}</label
	>
	<div
		class="field relative"
		on:click={() => {
			isExpanded = true
		}}
	>
		{#if placeholder.length && !value?.label?.length}
			<span style="color: #dddddd;">{placeholder || 'Select'}</span>
		{:else}
			<span>{value?.label || ''}</span>
		{/if}
	</div>
	{#if isExpanded}
		<div class="options">
			<div class="search ">
				<div class="search__inner">
					<div class="icon cursor-pointer">
						<svg
							viewBox="0 0 24 24"
							fill="none"
							width="1.5em"
							height="1.5em"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								stroke="gray"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="s-cSvF7Efxq9Wy"
							/></svg
						>
					</div>
					{#if searchTerm?.length}
						<div
							on:click={onClear}
							class="icon"
							style="left: auto; cursor: pointer; right: 15px;"
						>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								width="1.5em"
								height="1.5em"
								xmlns="http://www.w3.org/2000/svg"
								><path
									d="M6 18L18 6M6 6l12 12"
									stroke="gray"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="s-cSvF7Efxq9Wy"
								/></svg
							>
						</div>
					{/if}
					<input
						autofocus={true}
						bind:value={searchTerm}
						on:keyup={(e) => {
							onSearch(e.target['value'])
						}}
						type="text"
					/>
				</div>
			</div>
			{#if options?.length > 0}
				<ul>
					{#each removeDuplicateObject(options, 'label') as item}
						<li
							class:active={JSON.stringify(item) ===
								JSON.stringify(value?.value)}
							on:click={() => onChange(item)}
						>
							{item?.label}
						</li>
					{/each}
				</ul>
			{:else if options?.length === 0 && !loading}
				<div class="empty-screen">
					<svg
						fill="none"
						height="150"
						viewBox="0 0 150 150"
						width="150"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="110.091"
							cy="21.0909"
							r="10.5909"
							stroke="white"
							stroke-width="3"
						/>
						<path
							d="M110.769 22.9443H109.128L108.896 16.0469H111.001L110.769 22.9443ZM109.948 24.0244C110.281 24.0244 110.548 24.1224 110.748 24.3184C110.953 24.5143 111.056 24.765 111.056 25.0703C111.056 25.3711 110.953 25.6195 110.748 25.8154C110.548 26.0114 110.281 26.1094 109.948 26.1094C109.62 26.1094 109.354 26.0114 109.148 25.8154C108.948 25.6195 108.848 25.3711 108.848 25.0703C108.848 24.7695 108.948 24.5212 109.148 24.3252C109.354 24.1247 109.62 24.0244 109.948 24.0244Z"
							fill="#e8eaeb"
						/>
						<path
							clip-rule="evenodd"
							d="M109.606 76.7091V130.481C109.606 145.48 105.618 140.202 100.308 133.177C94.415 125.38 86.8948 115.43 81.3939 128.655C71.2023 153.158 64.4152 137.705 61.4653 130.988L61.4639 130.985L61.4607 130.977C61.3854 130.806 61.3127 130.64 61.2424 130.481C58.4212 124.091 53.1818 115.875 44.3152 130.481C35.4485 145.088 30.2091 139.842 30.2091 128.655L29.1015 79.5911C29.0342 78.6392 29 77.6781 29 76.7091C29 54.4503 47.0443 36.4061 69.303 36.4061C91.3157 36.4061 109.207 54.0535 109.599 75.9723C109.604 76.0102 109.606 76.0486 109.606 76.0877V76.7091ZM85.4242 74.9333C87.1146 74.9333 88.4848 73.5631 88.4848 71.8727C88.4848 70.1824 87.1146 68.8121 85.4242 68.8121C83.7339 68.8121 82.3636 70.1824 82.3636 71.8727C82.3636 73.5631 83.7339 74.9333 85.4242 74.9333ZM85.4242 79.9333C89.876 79.9333 93.4848 76.3245 93.4848 71.8727C93.4848 67.421 89.876 63.8121 85.4242 63.8121C80.9725 63.8121 77.3636 67.421 77.3636 71.8727C77.3636 76.3245 80.9725 79.9333 85.4242 79.9333ZM60.2727 71.8727C60.2727 73.5631 58.9024 74.9333 57.2121 74.9333C55.5218 74.9333 54.1515 73.5631 54.1515 71.8727C54.1515 70.1824 55.5218 68.8121 57.2121 68.8121C58.9024 68.8121 60.2727 70.1824 60.2727 71.8727ZM65.2727 71.8727C65.2727 76.3245 61.6639 79.9333 57.2121 79.9333C52.7604 79.9333 49.1515 76.3245 49.1515 71.8727C49.1515 67.421 52.7604 63.8121 57.2121 63.8121C61.6639 63.8121 65.2727 67.421 65.2727 71.8727Z"
							fill="#e8eaeb"
							fill-rule="evenodd"
						/>
					</svg>
				</div>
			{/if}
			{#if total < perPage === false && options?.length > 0}
				<div
					use:inview={{
						rootMargin: '0px',
					}}
					on:enter={onLoadMore}
				>
					<div class="py-4">
						<h4 class="text-center">loading..</h4>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	.search__inner {
		position: relative;
	}
	.empty-screen {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 200px;
	}
	.cursor-pointer {
		cursor: pointer;
	}
	.search {
		position: sticky;
		padding: 0 10px;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 99999;
		background-color: white;
	}
	.search input {
		background: #e8eaeb;
		border: 1px solid #e5e7eb;
		border-radius: 24px;
		width: 100%;
		padding: 11px 24px;
		height: 35px;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 500;
		font-size: 14px;
		line-height: 20px;
		color: #060606;
		border: 1px solid #e5e7eb;
		margin: 10px 0;
		padding-left: 40px;
	}
	.search input:focus {
		outline: none;
	}
	.search .icon {
		position: absolute;
		top: 50%;
		left: 13px;
		transform: translateY(-59%);
	}
	.field {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		width: 100%;
		border: 1px solid #ddd;
		font-size: 14px;
		height: 40px;
		line-height: 38px;
		padding: 0 35px 0 10px;
		margin-bottom: 2px;
		outline: none;
		color: #212121;
		line-height: 38px;
		font-weight: 500;
		font-size: 14px;
		cursor: pointer;
		border-radius: 30px;
	}
	.options {
		line-height: 1.28571;
		border: 1px solid #eff0f5;
		border-radius: 2px;
		box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 25%);
		font-size: 14px;
		line-height: 28px;
		padding: 12px 0;
		min-width: 100px;
		background: #fff;
		position: absolute;
		top: 99%;
		width: 100%;
		z-index: 999;
		height: 350px;
		overflow-y: scroll;
		box-shadow: 1px 1px 4px 0 rgb(0 0 0 / 25%);
		padding-top: 0;
	}
	/* width */
	.options::-webkit-scrollbar {
		width: 5px;
	}
	/* Track */
	.options::-webkit-scrollbar-track {
		background: #f1f1f1;
	}
	/* Handle */
	.options::-webkit-scrollbar-thumb {
		background: #888;
	}
	/* Handle on hover */
	.options::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
	ul {
		width: 100%;
	}
	li {
		padding: 3px 20px;
		position: relative;
		cursor: pointer;
		white-space: nowrap;
		transition: background 0.2s ease;
		font-size: 14px;
		line-height: 28px;
	}
	li:hover {
		color: #212121;
		background: #eff0f5;
	}
	li.focues {
		color: #212121;
		background: #eff0f5;
	}
</style>
