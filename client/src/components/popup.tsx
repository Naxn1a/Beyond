import { motion } from 'framer-motion';
import router from 'next/router';

export default function Popup({ x, y, isHovered, setIsHovered, image, alt, path }: any) {
  const handleImageClick = (route: string) => {
    if (route.startsWith('http')) {
      window.open(route, '_blank');
    } else {
      router.push(route);
    }
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={{
        opacity: isHovered ? 1 : 0,
        scale: isHovered ? 1 : 0,
        x: isHovered ? x : 0,
        y: isHovered ? y : 0,
      }}
      transition={{ duration: 0.1, delay: 0.1 }}
      onClick={() => handleImageClick(path)}
      style={{
        position: 'absolute',
        width: '240px',
        height: '240px',
        borderRadius: '15px',
        overflow: 'hidden',
        cursor: 'pointer',
        zIndex: 0,
      }}
    >
      <img
        src={image}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </motion.div>
  )
}
