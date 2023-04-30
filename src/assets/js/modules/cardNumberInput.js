export default function inputCardNumber() {
	const cardNameInput = document.querySelector('input.js-cardName');
	cardNameInput.addEventListener('input', e => {
		e.target.value = e.target.value.replace(/[А-Яа-я0-9]/g, '');
		e.target.value = e.target.value.toUpperCase();
	});
	const cardInputs = document.querySelectorAll('.cardNumber> input');
	for (let i = 0; i < cardInputs.length; i++) {
		const input = cardInputs[i];
		const nextInput = cardInputs[i + 1];
		const prevInput = cardInputs[i - 1];
		input.addEventListener('input', e => {
			e.target.value = e.target.value.replace(/[^0-9]/g, '');
			if (e.target.value.length === 4 && i < cardInputs.length - 1) {
				nextInput.focus();
			}
			if (e.target.value.length === 0 && i > 0) {
				prevInput.focus();
			}
		});
	}
	const cardExpireInput = document.querySelector('input.js-exp-date');
	cardExpireInput.addEventListener('input', e => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '');
		if (e.target.value.length === 4) {
			e.target.value = e.target.value.slice(0, 2) + '/' + e.target.value.slice(2);
		}
	});
	const cvvInput = document.querySelector('input.js-cvvCode');
	cvvInput.addEventListener('input', e => {
		e.target.value = e.target.value.replace(/[^0-9]/g, '');
	});
}
