import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    const wrapper = render(<CheckoutForm />);
    const header = wrapper.getByText('Checkout Form');
    expect(header).toBeInTheDocument();
});

test("form shows success message on submit with form details", async () => {
    const wrapper = render(<CheckoutForm />);
    const submitButton = wrapper.getByText('Checkout');
    fireEvent.click(submitButton);
    await waitFor( () => { 
        expect( wrapper.getByTestId('successMessage') ).toBeInTheDocument() 
    });
});
