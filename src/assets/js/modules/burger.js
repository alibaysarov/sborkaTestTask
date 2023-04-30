export default function () {
	const burger = document.querySelector('.header__button_burger');
	const menu = document.querySelector('.sideBar');
	const closeIcon = document.querySelector('.closeMenu-icon');
	if (window.matchMedia('(max-width:1024px)').matches === true) {
		burger.classList.add('show');
		burger.addEventListener('click', e => {
			menu.classList.toggle('active');
		});
		closeIcon.addEventListener('click', e => {
			menu.classList.remove('active');
		});
	}
}
