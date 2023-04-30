export default function cart() {
	const cartItems = [...document.querySelectorAll('.drawer__item')];
	const tax = 1.2;
	const shipping = 100;
	let subtotal = document.querySelector('.js-subtotal');
	let total = document.querySelector('.js-total');
	let taxElem = document.querySelector('.js-tax');
	const calcTotal = () => {
		let subtotalPrice =
			[...document.querySelectorAll('.drawer__priceVal')].length > 0
				? [...document.querySelectorAll('.drawer__priceVal')]
						.map(el => +el.innerText)
						.reduce((a, b) => a + b)
				: 0;
		let totalPrice = subtotalPrice * tax + shipping;

		const taxVal = subtotalPrice > 0 ? subtotalPrice * 0.2 : 0;
		return {
			tax: '$ ' + taxVal,
			subtotal: '$' + subtotalPrice,
			total: '$ ' + totalPrice,
		};
	};
	subtotal.innerText = calcTotal().subtotal;
	taxElem.innerText = calcTotal().tax;
	total.innerText = calcTotal().total;
	const cartLogic = cartItem => {
		const increment = cartItem.querySelector('.js-increment');
		const decrement = cartItem.querySelector('.js-decrement');
		const price = cartItem.querySelector('.drawer__priceVal');
		const deleteBtn = cartItem.querySelector('.drawer__closeIcon');
		deleteBtn.addEventListener('click', e => {
			e.target.closest('.drawer__item').remove();
			subtotal.innerText = calcTotal().subtotal;
			total.innerText = calcTotal().total;
			taxElem.innerText = calcTotal().tax;
			if (document.querySelectorAll('.drawer__item').length == 0) {
				console.log('корзина пуста');
				subtotal.innerText = '$0';
				total.innerText = '$0';
			}
		});
		let priceValue = Number(price.innerText);
		const quantity = cartItem.querySelector('.drawer__quantity');

		increment.addEventListener('click', e => {
			if (Number(quantity.innerText) >= 1) {
				let quantityValue = Number(quantity.innerText);
				quantityValue++;
				quantity.innerText = quantityValue;
				price.innerText = quantityValue * priceValue;
				subtotal.innerText = calcTotal().subtotal;
				taxElem.innerText = calcTotal().tax;
				total.innerText = calcTotal().total;
			}
		});
		decrement.addEventListener('click', e => {
			if (Number(quantity.innerText) > 1) {
				let quantityValue = Number(quantity.innerText);
				quantityValue--;
				quantity.innerText = quantityValue;
				price.innerText = quantityValue * priceValue;
				subtotal.innerText = calcTotal().subtotal;
				taxElem.innerText = calcTotal().tax;
				total.innerText = calcTotal().total;
			}
		});
	};
	cartItems.forEach(cartLogic);
}
