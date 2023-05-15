import React from 'react'


export function BoardPreview({board}) {

  return (
    <div className='board-preview' style={board.style}>
      <span className='board-title'>{board.title}</span>

    </div>
  )
}

