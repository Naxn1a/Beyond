'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FaHome, FaPaintBrush, FaEnvelope, FaUser, FaTwitter, FaShoppingCart } from 'react-icons/fa';

const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });
const MotionNav = dynamic(() => import('framer-motion').then(mod => mod.motion.nav), { ssr: false });
const MotionA = dynamic(() => import('framer-motion').then(mod => mod.motion.a), { ssr: false });

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navItems = [
    { icon: <FaHome />, link: '/', name: 'Start' },
    { icon: <FaPaintBrush />, link: '/home', name: 'Home' },
    { icon: <FaEnvelope />, link: '/forum', name: 'Forum' },
    { icon: <FaUser />, link: '#', name: '#' },
    { icon: <FaTwitter />, link: '#', name: '#', external: true },
    { icon: <FaShoppingCart />, link: '#', name: '#' }
  ];

  if (!isClient) {
    return null;
  }

  return (
    <MotionNav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed bottom-4 left-0 right-0 mx-auto flex justify-center items-center z-50"
    >
      <MotionDiv
        className="backdrop-blur-lg bg-opacity-40 p-3 rounded-3xl flex space-x-10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        style={{
          backgroundColor: 'rgba(30, 30, 30, 0.78)',
          boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        {navItems.map((item, index) => (

          item.external ? (
            <MotionA
              key={index}
              href={item.link}
              className={`text-white text-2xl p-2 rounded-full ${pathname === item.link ? 'text-zinc-800' : ''}`}
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link href={item.link} key={index} passHref>
                {item.icon}
              </Link>
            </MotionA>
          ) : (
            <MotionA
              className={`text-white text-2xl p-2 rounded-full ${pathname === item.link ? 'text-neutral-600' : ''}`}
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link href={item.link} key={index} passHref>
                {item.icon}
              </Link>
            </MotionA>
          )
        ))}
      </MotionDiv>

    </MotionNav >
  );
}
