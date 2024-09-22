import cartReducer, { addItem, removeItem, checkout } from '../features/cart/cartSlice';

describe('cart Slice', () => {
    const initialState = {
        items: {},
        totalItems: 0,
    };

    test('should handle initial state', () => {
        expect(cartReducer(undefined, {})).toEqual(initialState);
    });

    test('should handle addItem', () => {
        const actual = cartReducer(initialState, addItem({ id: 1 }));
        expect(actual.items[1]).toEqual(1);
        expect(actual.totalItems).toEqual(1);
    });

    test('should handle removeItem', () => {
        const stateWithItem = {
            items: { 1: 2 },
            totalItems: 2,
        };
        const actual = cartReducer(stateWithItem, removeItem({ id: 1 }));
        expect(actual.items[1]).toEqual(1);
        expect(actual.totalItems).toEqual(1);
    });

    test('should handle checkout', () => {
        const stateWithItems = {
            items: { 1: 2, 2: 1 },
            totalItems: 3,
        };
        const actual = cartReducer(stateWithItems, checkout());
        expect(actual.items).toEqual({});
        expect(actual.totalItems).toEqual(0);
    });
});
