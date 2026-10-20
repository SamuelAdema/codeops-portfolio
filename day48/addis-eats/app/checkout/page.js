import OrderForm from "../../components/OrderForm";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 text-3xl font-bold">
        Checkout
      </h1>
      <p className="mb-6">
        Enter the contact number for your order.
      </p>
      <OrderForm />
    </main>
  );
}