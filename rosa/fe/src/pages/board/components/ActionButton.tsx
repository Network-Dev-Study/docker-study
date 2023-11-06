import React from 'react';

type ActionButtonColor = 'black' | 'white';
type ActionButtonType = 'normal' | 'submit';

type ActionButtonProps = {
  name: string;
  color?: ActionButtonColor;
  type?: ActionButtonType;
  onClickButton?: () => void;
};

function ActionButton({ name, color, type, onClickButton }: ActionButtonProps) {
  switch (type) {
    case 'normal':
      return (
        <button className={color === 'black' ? 'btn btn--black' : 'btn btn--white'} onClick={onClickButton}>
          {name}
        </button>
      );
    case 'submit':
      return (
        <button type="submit" className={color === 'black' ? 'btn btn--black' : 'btn btn--white'}>
          {name}
        </button>
      );
    default:
      throw new Error(`${type}에 해당하는 버튼 타입이 존재하지 않습니다.`);
  }
}

ActionButton.defaultProps = {
  color: 'black',
  type: 'normal',
};

export default ActionButton;
