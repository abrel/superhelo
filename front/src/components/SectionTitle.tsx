import React from 'react';

const SectionTitle: React.FC<{ title: string; className: string }> = ({
  title,
  className,
}) => (
  <div className={className}>
    <h2
      className="text-2xl font-main font-semibold text-main mb-2 scroll-mt-24"
      id={title
        .replace(/\s/g, '-')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')}
    >
      {title}
    </h2>
    <hr />
  </div>
);

export default SectionTitle;
