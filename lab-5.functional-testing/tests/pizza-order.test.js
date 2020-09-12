import { Selector, RequestLogger } from 'testcafe';

const url = 'http://localhost:3000';

// Создаем фикстуру и привязываем к ней тестируемую страницу
fixture('Pizza order').page(url);

const data = {
	address: 'Krasnoarsk, Home',
	date: '2020-05-11',
	time: '18:00',
	pizzaName: 'margarita',
	pizzaSize: 'large',
	drinks: 'none',
	sauces: 'cheese',
};

//Привязываемся к элементам формы на странице
const address = Selector('#address');
const date = Selector('#date');
const time = Selector('#time');

const pizzaName = Selector('#pizza-name');
const pizzaNameOption = pizzaName.find('option');

const pizzaSize = Selector('#pizza-size');
const pizzaSizeOption = pizzaSize.find('option');

const drinks = Selector('#drinks');
const drinksOption = drinks.find('option');

const sauces = Selector('#sauces');
const saucesOption = sauces.find('option');

const submit = Selector('#submit');

test("Order pizza 'Margarita'", async (t) => {
	// Заполняем inputs
	await t
		.typeText(address, data.address)
		.typeText(date, data.date)
		.typeText(time, data.time)
		.click(pizzaName).click(pizzaNameOption.withText(data.pizzaName))
		.click(pizzaSize).click(pizzaSizeOption.withText(data.pizzaSize))
		.click(drinks).click(drinksOption.withText(data.drinks))
		.click(sauces).click(saucesOption.withText(data.sauces))
		.click(submit);

	await t.wait(500);

	//Привязываемся к элементам всплывающего окна,
	//появившегося после ответа сервера
	const orderAdress = Selector('#order-address');
	const orderDate = Selector('#order-date');
	const orderTime = Selector('#order-time');
	const orderPizzaName = Selector('#order-pizzaName');
	const orderPizzaSize = Selector('#order-pizzaSize');
	const orderDrinks = Selector('#order-drinks');
	const orderSauces = Selector('#order-sauces');

	//Проверяем поля всплывающего окна
	await t
		.expect(orderAdress.innerText).contains(data.address)
		.expect(orderDate.innerText).contains(data.date)
		.expect(orderTime.innerText).contains(data.time)
		.expect(orderPizzaName.innerText).contains(data.pizzaName)
		.expect(orderPizzaSize.innerText).contains(data.pizzaSize)
		.expect(orderDrinks.innerText).contains(data.drinks)
		.expect(orderSauces.innerText).contains(data.sauces);
});
