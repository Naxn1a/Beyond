'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { GoPaste } from "react-icons/go";
import { motion, useMotionValue } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Thread } from '@/types/type';
import Header from '@/components/header';

const MotionA = dynamic(() => import('framer-motion').then(mod => mod.motion.a), { ssr: false });

export default function Forum() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [index, setIndex] = useState(0);
  const overflow = useMotionValue('scroll');

  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products?offset=${index}0&limit=12`)
      .then((res) => setThreads(res.data))
      .catch((err) => console.log(err));
  }, []);

  const fetchTitle = () => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products?offset=${index}0&limit=12`)
      .then((res) => {
        setThreads((prevThreads) => [...prevThreads, ...res.data]);
        if (res.data.length < 12) {
          window.removeEventListener('scroll', fetchTitle);
        }
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  const pathname = usePathname();
  return (
    <div className="bg-main" style={{ overflow: 'hidden' }}>
      <Header />
      <InfiniteScroll
        dataLength={threads.length}
        next={fetchTitle}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        <div className="grid grid-cols-3 gap-6 p-4">
          {threads.map((thread, index) => (
            <motion.div
              key={thread.id}
              className="p-4 m-2 bg-gray-800 text-white rounded-lg shadow-lg"
              style={{
                backgroundColor: 'rgba(30, 30, 30, 0.78)',
                border: '1px solid white',
                backdropFilter: 'blur(14px)',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'linear', stiffness: 300 }}
              onAnimationStart={() => overflow.set('hidden')}
            >
              <div className="main-text flex items-center mb-2">
                <GoPaste className="text-4xl mr-2" />
                <h2 className="main-text text-2xl font-bold pb-6">{thread.title}</h2>
              </div>
              <p className="text-sm text-gray-400">
                Created by: {thread.createBy ? thread.createBy : 'Unknown'}
              </p>
              <p className="text-sm text-gray-400">
                Created at: {new Date(thread.createAt).toLocaleString()}
              </p>
              <MotionA
                className={`inline-block text-blue-400 mt-2 ${pathname === `/threads/${thread.id}` ? 'text-slate-' : ''}`}
                whileHover={{ scale: 1.1, rotate: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link href={`/forum/${thread.title}`} passHref>
                  View Post
                </Link>
              </MotionA>
            </motion.div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
