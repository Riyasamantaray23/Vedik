import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import { ErrorBoundary } from 'react-error-boundary';
import * as THREE from 'three';

function Earth({ scale }) {
  const earthRef = useRef();
  const texture = useLoader(TextureLoader, '/earth_texture.jpg');

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elapsedTime / 10;
  });

  return (
    <Sphere ref={earthRef} args={[2, 64, 64]} scale={scale}>
      <meshPhongMaterial 
        map={texture} 
        shininess={50}
        specular={new THREE.Color(0x333333)}
      />
    </Sphere>
  );
}

function Fallback() {
  return null;
}

function Scene({ scale }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 6;
  }, [camera]);

  return (
    <>
      <Suspense fallback={null}>
        <Earth scale={scale} />
      </Suspense>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
    </>
  );
}

function Background3D() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollPosition / maxScroll;
      const newScale = 1 + scrollPercentage * 0.5; // Adjust the 0.5 to change the scaling effect
      setScale(newScale);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Scene scale={scale} />
      </Canvas>
    </ErrorBoundary>
  );
}

export default Background3D;