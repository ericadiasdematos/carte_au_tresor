import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

// Mock the useGameLogic hook to provide dummy data
jest.mock('./hooks/useGameLogic', () => ({
  useGameLogic: () => ({
    mapDimensions: { width: 5, height: 5 },
    mountains: [],
    treasures: [],
    adventurers: [],
    loadingError: null,
    moveAdventurers: jest.fn(),
  }),
}));

test('renders App component without errors', () => {
  const { getByText } = render(<App />);
  
  // Check if the title is rendered
  const titleElement = getByText('Madre de Dios Map');
  expect(titleElement).toBeInTheDocument();

  // Check if the "Faire 1 mouvement" button is rendered
  const moveButton = getByText('Faire 1 mouvement');
  expect(moveButton).toBeInTheDocument();
  
  // Check if the "Download Output" button is rendered
  const downloadButton = getByText('Download Output');
  expect(downloadButton).toBeInTheDocument();
});

test('renders Map component when there is no loading error', () => {
  const { getByTestId } = render(<App />);
  
  // Check if the Map component is rendered when there is no loading error
  const mapComponent = getByTestId('map-component');
  expect(mapComponent).toBeInTheDocument();
});

test('renders error message when there is a loading error', () => {
  // Mock the useGameLogic hook to simulate a loading error
  jest.spyOn(require('./hooks/useGameLogic'), 'useGameLogic').mockReturnValue({
    loadingError: 'Error loading data',
  });

  const { getByText } = render(<App />);
  
  // Check if the error message is rendered when there is a loading error
  const errorElement = getByText('Error loading data');
  expect(errorElement).toBeInTheDocument();
});


