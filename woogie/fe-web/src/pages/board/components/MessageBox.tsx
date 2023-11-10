import React from 'react';

type MessageBoxProps = {
  title: string;
  description: string;
};

function MessageBox({ title, description }: MessageBoxProps) {
  return (
    <div className="message-box">
      <strong>{title}</strong>
      <span>{description}</span>
    </div>
  );
}

export default MessageBox;
