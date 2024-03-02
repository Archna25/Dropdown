import React, { useState, useEffect } from 'react';

const DropdownComponent = () => {
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');

  useEffect(() => {
    console.log('Fetching data from API...');
    fetch('http://localhost:3001/options')
      .then(response => {
        console.log('API Response:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);
        setOptions(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleDropdownChange = event => {
    const selectedOption = event.target.value;

    // Check if the selected option is available in the options fetched from the API
    const optionExists = options.find(option => option.value === selectedOption);
    if (optionExists) {
      setShowPopup(true);
      setPopupMessage('Success Message');
      setPopupType('success');
      setSelectedValue(selectedOption);
    } else {
      setShowPopup(true);
      setPopupMessage('Error: Option not available in the API list');
      setPopupType('error');
      setSelectedValue('');
    }
  };

  const filteredOptions = options.filter(option =>
    option.option.toLowerCase().includes(selectedValue.toLowerCase())
  );

  return (
    <div style={{ textAlign: 'center' }}>
      <select
        value={selectedValue}
        onChange={handleDropdownChange}
        style={{
          fontSize: '16px', // Change font size
          color: 'black',    // Change text color
          margin: '10px',   // Change margin
          width: '200px',   // Change width
          height: '40px',   // Change height
          borderRadius: '5px', // Rounded corners
          border: '1px solid #ccc', // Border
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)', // Box shadow
          outline: 'none', // Remove default focus outline
          backgroundColor: 'pink', // Background color
        }}
      >
        <option value="" style={{ color: 'gray' }}>Select an option</option>
        <option value="" style={{ color: 'gray' }}>Hello</option>
        {filteredOptions.map(option => (
          <option key={option.id} value={option.value} style={{ color: 'black' }}>
            {option.option}
          </option>
        ))}
      </select>
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            backgroundColor: popupType === 'success' ? 'green' : 'red',
            color: 'white',
            borderRadius: '5px',
            textAlign: 'center',
            zIndex: '9999' // Ensure popup appears on top of other elements
          }}
        >
          {popupMessage}
          <button style={{ marginLeft: '10px', cursor: 'pointer' }} onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownComponent;
