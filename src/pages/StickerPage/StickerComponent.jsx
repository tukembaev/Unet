import React from 'react';

const StickerComponent = ({ onAddSticker }) => {
  const handleAddSticker = (e) => {
    const { clientX, clientY } = e;
    const newSticker = {
      id: Date.now(), // Уникальный идентификатор, можно использовать другой метод генерации
      x: clientX,
      y: clientY,
      text: 'Sticker',
    };

    onAddSticker(newSticker);
  };

  return (
    <div
      onClick={handleAddSticker}
      style={{ position: 'relative', height: '600px', width: '1000px', border: '1px solid #000' }}
    >
      {/* Здесь можно добавить дополнительные элементы или стили */}
    </div>
  );
};

export default StickerComponent;
