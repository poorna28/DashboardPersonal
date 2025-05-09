import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

test('renders Navbar component', () => {
    render(<Navbar />);
    const linkElement = screen.getByText(/home/i);
    expect(linkElement).toBeInTheDocument();
});

test('renders correct title', () => {
    render(<Navbar title="My App" />);
    const titleElement = screen.getByText(/my app/i);
    expect(titleElement).toBeInTheDocument();
});