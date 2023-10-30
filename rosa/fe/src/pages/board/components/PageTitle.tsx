import React from 'react';

type PageTitleProps = {
  title: string;
};

function PageTitle({ title }: PageTitleProps) {
  return <h2 className="page-tit">{title}</h2>;
}

export default PageTitle;
