import React from 'react';

type BoardSectionProps = {
  children: React.ReactNode;
  name: string;
};

function BoardSection({ children, name }: BoardSectionProps) {
  return (
    <section id={name}>
      <div className="container">
        <div className="row">
          <div className={name}>{children}</div>
        </div>
      </div>
    </section>
  );
}

export default BoardSection;
