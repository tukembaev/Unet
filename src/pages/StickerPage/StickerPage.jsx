import React, { useState } from 'react';

const StickerPage = () => {
  const [stickers, setStickers] = useState([]);
  const [activeSticker, setActiveSticker] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [stickerText, setStickerText] = useState(''); // Для текста стикера
  const [stickerColor, setStickerColor] = useState('#ff5733'); // Для цвета стикера
const [stickerTexts, setStickerTexts] = useState({}); // Для текста каждого стикера



const handleAddSticker = (x, y) => {
  // Проверяем, есть ли уже стикер в этом месте
  const isClickOnSticker = stickers.some(
    (sticker) =>
      x >= sticker.x &&
      x <= sticker.x + sticker.width &&
      y >= sticker.y &&
      y <= sticker.y + sticker.height
  );

  if (!isClickOnSticker) {
    // Создаем стикер с пустым текстом и размером 100x100
    const newSticker = {
      id: Date.now(), // Уникальный идентификатор
      x,
      y,
      width: 100,
      height: 100,
      text: stickerTexts[activeSticker?.id] || '', // Используем текст из активного стикера или из stickerText
    };

    setStickers([...stickers, newSticker]);
    setActiveSticker(newSticker);
  } else {
    setActiveSticker(stickers.find((sticker) =>
      x >= sticker.x &&
      x <= sticker.x + sticker.width &&
      y >= sticker.y &&
      y <= sticker.y + sticker.height
    ));
  }
};


  const handleStickerColorChange = (e) => {
    if (activeSticker) {
      const updatedStickers = stickers.map((s) =>
        s.id === activeSticker.id ? { ...s, color: e.target.value } : s
      );
      setStickers(updatedStickers);
    }
  };
  
  

  
  
  const handleStickerTextChange = (e, sticker) => {
    if (activeSticker && activeSticker.id === sticker.id) {
      const updatedStickerTexts = { ...stickerTexts };
      updatedStickerTexts[sticker.id] = e.target.value;
      setStickerTexts(updatedStickerTexts);
    }
  };
  
  
  const handleStickerTextBlur = (e, sticker) => {
    if (activeSticker) {
      const updatedStickerTexts = { ...stickerTexts };
      updatedStickerTexts[sticker.id] = e.target.value;
      setStickerTexts(updatedStickerTexts);
    }
  };
  
  const handleDeleteSticker = (sticker) => {
    const updatedStickers = stickers.filter((s) => s.id !== sticker.id);
    setStickers(updatedStickers);
    setActiveSticker(null);
  };

  const handleStickerMouseDown = (e, sticker) => {
    e.stopPropagation();
    setActiveSticker(sticker);
    setDragging(true);
  };

  const handleStickerMouseMove = (e) => {
    if (dragging && activeSticker) {
      const x = e.clientX;
      const y = e.clientY;

      const updatedStickers = stickers.map((s) =>
        s.id === activeSticker.id
          ? { ...s, x, y }
          : s
      );
      setStickers(updatedStickers);
    }
  };

  const handleStickerMouseUp = () => {
    setDragging(false);
  };

  const handlePageClick = () => {
    if (activeSticker) {
      setActiveSticker(null);
    }
  };

  return (
    <div
      onClick={(e) => handleAddSticker(e.clientX, e.clientY)}
      onMouseMove={handleStickerMouseMove}
      onMouseUp={handleStickerMouseUp}
      style={{
        position: 'relative',
        height: '800px',
        width: '1500px',
        border: '1px solid #000',
      }}
    >
{stickers.map((sticker) => (
    <div
    key={sticker.id}
    style={{
      position: 'absolute',
      left: sticker.x,
      top: sticker.y,
      width: sticker.width,
      height: sticker.height,
      border: '1px solid #ccc',
      padding: '5px',
      backgroundColor: sticker.color,
      borderRadius: '4px',
      zIndex: activeSticker === sticker ? 1 : 'auto',
    }}
    onMouseDown={(e) => handleStickerMouseDown(e, sticker)}
  >
   {activeSticker === sticker ? (
  <>
       <textarea
      value={stickerTexts[sticker.id] || ''}
      onChange={(e) => handleStickerTextChange(e, sticker)}
      onBlur={(e) => handleStickerTextBlur(e, sticker)}
      style={{ width: '100%', height: '80%', border: 'none', resize: 'none' }}
    />
    <input
      type="color"
      value={sticker.color || stickerColor}
      onChange={(e) => handleStickerColorChange(e, sticker)}
      style={{ width: '100%', height: '20%' }}
    />
    <button onClick={() => handleDeleteSticker(sticker)}>Удалить</button>
  </>
) : (
  <div style={{ flex: 1, wordWrap: 'break-word', color: '#fff' }}>
    {sticker.text}
  </div>
)}

  </div>
))}




    </div>
  );
};

export default StickerPage;
