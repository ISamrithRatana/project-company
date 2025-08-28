// ShoppingCart.tsx
export default function ShoppingCart() {
  // Mock data for the products in the cart
  const cartItems = [
    {
      id: 1,
      name: 'Heirloom tomato',
      price: 5.99,
      unit: 'lb',
      quantity: 1,
      imageUrl: 'tomato_placeholder.png'
    },
    {
      id: 2,
      name: 'Organic ginger',
      price: 12.99,
      unit: 'lb',
      quantity: 0.5,
      imageUrl: 'ginger_placeholder.png'
    },
    {
      id: 3,
      name: 'Sweet onion',
      price: 2.99,
      unit: 'lb',
      quantity: 5,
      imageUrl: 'onion_placeholder.png'
    },
  ];

  // Calculate order summary
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 3.99;
  const tax = 2.00;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <main className="container mx-auto p-6 md:p-12">
        <div className="flex items-end space-x-4 mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-light">Basket</h1>
          <p className="text-lg text-gray-500">{cartItems.length} items</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shopping cart items list */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-6 p-4 rounded-lg shadow-sm border border-gray-200">
                {/* Placeholder for the image */}
                <div className="w-24 h-24 bg-gray-300 rounded-lg flex-shrink-0"></div>
                <div className="flex-grow">
                  <p className="font-bold text-lg">{item.name}</p>
                  <p className="text-green-700 font-semibold">${item.price.toFixed(2)} / {item.unit}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-sm text-gray-600">{item.quantity} {item.unit}</span>
                    {/* Placeholder for the edit icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>
                <div className="text-lg font-bold">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Order summary section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
            <h2 className="text-xl font-semibold mb-4">Order summary</h2>
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-300">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="mt-6 w-full flex items-center justify-center space-x-2 bg-green-700 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-800 transition-colors">
              <span>Continue to payment</span>
              {/* Placeholder for the arrow icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
