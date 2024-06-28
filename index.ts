type Pizza = {
    id: number;
    name: string;
    price: number;
};

type Order = {
    id: number;
    pizza: Pizza;
    status: 'ordered' | 'completed';
};

let cashInRegister: number = 100;
let nextOrderId: number = 1;
let pizzaId: number = 1;

const menu: Array<Pizza> = [
    { id: pizzaId++, name: 'Margherita', price: 8 },
    { id: pizzaId++, name: 'Pepperoni', price: 10 },
    { id: pizzaId++, name: 'Hawaiian', price: 10 },
    { id: pizzaId++, name: 'Veggie', price: 9 },
];

const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Omit<Pizza, 'id'>): Pizza {
    const newPizza = {
        id: pizzaId++,
        ...pizzaObj,
    };

    menu.push(newPizza);
    return newPizza;
}

function placeOrder(pizzaName: string): Order | undefined {
    const selectedPizza = menu.find((pizzaObj) => pizzaObj.name === pizzaName);
    if (!selectedPizza) {
        console.error(`${pizzaName} not found in the menu`);
        return;
    }

    cashInRegister += selectedPizza.price;
    const newOrder: Order = { id: nextOrderId++, pizza: selectedPizza, status: 'ordered' };
    orderQueue.push(newOrder);

    return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
    const order = orderQueue.find((order) => order.id === orderId);
    if (!order) {
        console.error(`Order with id ${orderId} not found`);
        return;
    }

    order.status = 'completed';

    return order;
}

function getPizzaDetail(identifier: number | string): Pizza | undefined {
    if (typeof identifier === 'number') {
        return menu.find((pizza) => pizza.id === identifier);
    } else if (typeof identifier === 'string') {
        return menu.find((pizza) => pizza.name.toLowerCase() === identifier.toLowerCase());
    } else {
        throw new TypeError('Parameter `identifier` must be a number or a string or a number');
    }
}

addNewPizza({ name: 'Chicken Bacon Ranch', price: 12 });
addNewPizza({ name: 'BBQ Chicken', price: 12 });
addNewPizza({ name: 'Spicy Sausage', price: 11 });

placeOrder('Chicken Bacon Ranch');
completeOrder(1);

console.log('Menu:', menu);
console.log('Cash in register:', cashInRegister);
console.log('Order queue:', orderQueue);
