import React, { useState } from 'react';
import '../Styles/InputComponent.css'; // Import the CSS file

function InputComponent() {
  const [inputValue, setInputValue] = useState('');
  const [boxes, setBoxes] = useState([{ id: 1, color: '#4895ef', left: 0, top: 0 }]);
  const [whiteBoxCount, setWhiteBoxCount] = useState(0);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted value: ${inputValue}`);
    setInputValue('');
  };

  const handleBoxClick = (id, color) => {
    if (color === '#4895ef') {
      setBoxes((prevBoxes) => {
        const clickedBox = prevBoxes.find((box) => box.id === id);
        const otherBoxes = prevBoxes.filter((box) => box.id !== id);
        const newBoxCount = whiteBoxCount + 1;
        const newBox = { id: prevBoxes.length + 1, color: '#F1F0F3', left: clickedBox.left, top: clickedBox.top, number: newBoxCount };

        setWhiteBoxCount(newBoxCount);

        let newLeft = clickedBox.left + 240;
        let newTop = clickedBox.top;

        if ((clickedBox.left / 240) % 4 === 3) {
          newLeft = 0;
          newTop += 327; // 297px height + 30px margin
        }

        return [
          ...otherBoxes,
          { ...clickedBox, left: newLeft, top: newTop },
          newBox,
        ];
      });

      setTimeout(() => {
        window.location.href = '/CreateForm'; // Redirect to CreateForm page after 2 seconds
      }, 2000);
    } else if (color === '#F1F0F3') {
      window.location.href = '/ReviewForm'; // Redirect to ReviewForm page immediately
    }
  };

  return (
    <div className="input-container">
      {boxes.map((box) => (
        <div
          key={box.id}
          className="dynamic-box"
          style={{ backgroundColor: box.color, left: `${box.left}px`, top: `${box.top}px`, borderRadius: '4px' }}
          onClick={() => handleBoxClick(box.id, box.color)}
        >
          {box.color === '#F1F0F3' && <span className="box-number">{box.number}</span>}
        </div>
      ))}
    </div>
  );
}

export default InputComponent;
