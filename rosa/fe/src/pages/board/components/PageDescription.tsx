import React from 'react';

type PageDescriptionProps = {
  description: string;
};

function PageDescription({ description }: PageDescriptionProps) {
  return <p className="page-desc">{description}</p>;
}

export default PageDescription;
