import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AlgorithmSelector from 'src/components/AlgorithmSelector';

describe('AlgorithmSelector Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with all algorithm options', () => {
    render(<AlgorithmSelector selected="Wave" onChange={mockOnChange} />);

    expect(screen.getByLabelText('Choose Your Algorithm:')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    
    const options = screen.getAllByRole('option');

    expect(options).toHaveLength(9);
    expect(options[0]).toHaveValue('Wave');
    expect(options[1]).toHaveValue('ConCirc');
    expect(options[2]).toHaveValue('TruchRound');
    expect(options[3]).toHaveValue('Diagonals');
    expect(options[4]).toHaveValue('Sslines');
    expect(options[5]).toHaveValue('Squigs');
  });

  it('displays the selected value', () => {
    render(<AlgorithmSelector selected="ConCirc" onChange={mockOnChange} />);
    expect(screen.getByRole('combobox')).toHaveValue('ConCirc');
  });

  it('calls onChange when selection changes', () => {
    render(<AlgorithmSelector selected="Wave" onChange={mockOnChange} />);
    
    fireEvent.change(screen.getByRole('combobox'), {
      target: { value: 'ConCirc' }
    });

    expect(mockOnChange).toHaveBeenCalledWith('ConCirc');
  });

  it('applies correct CSS classes', () => {
    render(<AlgorithmSelector selected="Wave" onChange={mockOnChange} />);
    
    expect(screen.getByRole('combobox')).toHaveClass('algorithm-dropdown');
    expect(screen.getByText('Choose Your Algorithm:')).toHaveClass('algorithm-label');
  });
});