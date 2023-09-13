import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Location {
  id: number;
  name: string;
}

interface SearchFormProps {
  locations:  Location[];
  onSubmit: (departure: string, arrival: string, departureDate: string, returnDate: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ locations, onSubmit }) => {
  const navigate = useNavigate();
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const handleDepartureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeparture(e.target.value);
  };

  const handleArrivalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrival(e.target.value);
  };

  const handleDepartureDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartureDate(e.target.value);
  };

  const handleReturnDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReturnDate(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(departure, arrival, departureDate, returnDate);
    navigate('/otherpage'); // Replace '/otherpage' with the actual path of the other page you want to navigate to
  };

  const departureSuggestions = locations.filter(location =>
    location.name.toLowerCase().includes(departure.toLowerCase())
  );

  const arrivalSuggestions = locations.filter(location =>
    location.name.toLowerCase().includes(arrival.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Departure:
        <input type="text" value={departure} onChange={handleDepartureChange} />
      </label>
      <ul>
        {departureSuggestions.map(location => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
      <label>
        Arrival:
        <input type="text" value={arrival} onChange={handleArrivalChange} />
      </label>
      <ul>
        {arrivalSuggestions.map(location => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
      <label>
        Departure Date:
        <input type="date" value={departureDate} onChange={handleDepartureDateChange} />
      </label>
      <label>
        Return Date:
        <input type="date" value={returnDate} onChange={handleReturnDateChange} />
      </label>
      <br />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;