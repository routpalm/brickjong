import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FileUploader from 'src/components/FileUploader';

describe('FileUploader Component', () => {
  const mockOnFileSelect = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders upload button in default state', () => {
    render(<FileUploader onFileSelect={mockOnFileSelect} isUploading={false} />);
    
    const uploadButton = screen.getByText('Upload');
    const fileInput = screen.getByTestId('imageUpload');
    
    expect(uploadButton).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
    expect(fileInput).toHaveStyle({ display: 'none' });
  });

  it('renders uploading state when isUploading is true', () => {
    render(<FileUploader onFileSelect={mockOnFileSelect} isUploading={true} />);
    
    const uploadingButton = screen.getByText('Uploading...');
    expect(uploadingButton).toBeInTheDocument();
    expect(uploadingButton).toBeDisabled();
  });

  it('handles file selection correctly', () => {
    render(<FileUploader onFileSelect={mockOnFileSelect} isUploading={false} />);
    
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('imageUpload');
    
    fireEvent.change(fileInput, {
      target: { files: [file] }
    });
    
    expect(mockOnFileSelect).toHaveBeenCalledTimes(1);
    expect(mockOnFileSelect).toHaveBeenCalledWith(file);
  });

  it('does not call onFileSelect when no file is selected', () => {
    render(<FileUploader onFileSelect={mockOnFileSelect} isUploading={false} />);
    
    const fileInput = screen.getByTestId('imageUpload');
    
    fireEvent.change(fileInput, {
      target: { files: [] }
    });
    
    expect(mockOnFileSelect).not.toHaveBeenCalled();
  });

  it('has correct label association', () => {
    render(<FileUploader onFileSelect={mockOnFileSelect} isUploading={false} />);
    
    const label = screen.getByText('Upload').closest('label');
    expect(label).toHaveAttribute('for', 'imageUpload');
  });

  it('applies correct CSS classes', () => {
    render(<FileUploader onFileSelect={mockOnFileSelect} isUploading={false} />);
    
    const button = screen.getByText('Upload').closest('label');
    expect(button).toHaveClass('upload-button');
  });
});