import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Ensures we use the Router context
import UserContext from '../context/UserContext'; 
import Login from '../Components/Login'; 

const mockSetUser = jest.fn();

describe('Login Component', () => {
  // Wrap the entire render call inside <Router>
  const renderWithRouter = (component) => {
    return render(
      <Router>
        <UserContext.Provider value={{ setUser: mockSetUser }}>
          {component}
        </UserContext.Provider>
      </Router>
    );
  };

  test('renders the login form correctly', () => {
    renderWithRouter(<Login />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
});
