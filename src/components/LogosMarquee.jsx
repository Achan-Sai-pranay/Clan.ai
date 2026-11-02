import React from 'react';

const LOGOS = [
  'Northwind',
  'Acme Labs',
  'Vertex',
  'Lumen',
  'Orbital',
  'Kestrel',
  'Parallax',
  'Quanta'
];

export default function LogosMarquee() {
  return (
    <div className="logos">
      <p>Trusted by teams shipping agents to production</p>
      <div className="mq" id="mq">
        {LOGOS.map((name, i) => (
          <span key={`l1-${i}`}>{name}</span>
        ))}
        {LOGOS.map((name, i) => (
          <span key={`l2-${i}`}>{name}</span>
        ))}
      </div>
    </div>
  );
}
