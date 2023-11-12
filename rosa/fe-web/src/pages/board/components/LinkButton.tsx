import React from 'react';
import { Link } from 'react-router-dom';

type LinkButtonColor = 'black' | 'white';

type LinkButtonProps = {
  name: string;
  path: string;
  color?: LinkButtonColor;
};

function LinkButton({ name, path, color }: LinkButtonProps) {
  return (
    <Link to={path} className={color === 'black' ? 'btn btn--black' : 'btn btn--white'}>
      {name}
    </Link>
  );
}

LinkButton.defaultProps = {
  color: 'black',
};

export default LinkButton;
