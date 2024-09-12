'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Popup from './popup';
import popupData from '@/data/popup.json';

export default function Card() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {popupData.map((item: PopupData, index: number) => (
        <Popup
          key={index}
          x={item.x}
          y={item.y}
          isHovered={isHovered}
          setIsHovered={setIsHovered}
          image={item.src}
          alt={item.alt}
          path={item.route}
        />
      ))}

      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          position: 'relative',
          width: '400px',
          padding: '30px',
          borderRadius: '20px',
          backgroundColor: 'rgba(30, 30, 30, 0.78)',
          color: 'white',
          textAlign: 'center',
          zIndex: 1,
          border: '2px solid white',
          backdropFilter: 'blur(14px)',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <motion.div>
          <p style={{ fontSize: '32px', margin: '0 0 15px 0' }}>
            Hey, I'm <span style={{ backgroundColor: '#8A2BE2', padding: '2px 8px', borderRadius: '5px' }}>Name 👨‍💼</span>
          </p>
          <p style={{ fontSize: '28px', margin: '15px 0' }}>
            I'm a <span style={{ backgroundColor: '#FFA500', padding: '2px 8px', borderRadius: '5px' }}>product designer,</span>
          </p>
          <p style={{ fontSize: '24px', margin: '15px 0' }}>
            currently at <span style={{ backgroundColor: '#32CD32', padding: '2px 8px', borderRadius: '5px' }}>Prisma ↗</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
