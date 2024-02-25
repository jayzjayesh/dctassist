const transactions = {
    invoice_number: 123,
    items: [
        {
            id: 1,
            item_name: 'Tomato Puree',
            total: 12,
            count: 3,
            split: [1, 2, 3]
        },
        {
            id: 2,
            item_name: 'Swiss Cheese',
            total: 12,
            count: 2,
            split: [3, 2]
        },
        {
            id: 3,
            item_name: 'Whole Milk',
            total: 8,
            split: [3]
        },
        {
            id: 4,
            item_name: 'Toilet Cleaner',
            total: 6,
            split: [2]
        }
    ],
    debit_card_number: 1093,
    tax: 12,
    subtotal: 58,
    savings: 12,
    invoice_date: 'Decemeber 12, 2024',
    invoice_time: '3:42 PM',
    store_name: 'Kroger'
}

const peopleOptions = [
    { id: 1, label: 'AP' },
    { id: 2, label: 'JK' },
    { id: 3, label: 'SR' },
    { id: 4, label: 'SC' },
    { id: 5, label: 'PB' },
    { id: 6, label: 'YK' },
    { id: 7, label: 'DS' }
];

export { transactions, peopleOptions };