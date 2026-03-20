import { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';
import * as handpose from '@tensorflow-models/handpose';

export default function HandScroller() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<'initializing' | 'ready' | 'tracking' | 'error'>('initializing');
  const lastYRef = useRef<number | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    let model: handpose.HandPose;

    const setupCamera = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setStatus('error');
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: 'user' },
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await new Promise((resolve) => {
            videoRef.current!.onloadedmetadata = () => {
              resolve(videoRef.current);
            };
          });
          videoRef.current.play();
        }
      } catch (err) {
        console.error("Webcam access denied or unavailable", err);
        setStatus('error');
      }
    };

    const detectHand = async () => {
      if (!model || !videoRef.current || videoRef.current.readyState !== 4) {
        animationFrameId = requestAnimationFrame(detectHand);
        return;
      }

      const predictions = await model.estimateHands(videoRef.current);

      if (predictions.length > 0) {
        setStatus('tracking');
        // The index finger tip is usually landmark 8 in typical mediapipe, but in handpose it's returned under annotations
        const indexFingerTip = (predictions[0].annotations.indexFinger as [number, number, number][])[3];
        const currentY = indexFingerTip[1]; // y-coordinate

        if (lastYRef.current !== null) {
          const deltaY = currentY - lastYRef.current;
          
          // Apply a deadzone to prevent micro-jitters
          if (Math.abs(deltaY) > 2) {
            // Multiple by a sensitivity factor
            window.scrollBy({ top: deltaY * 3, behavior: 'auto' });
          }
        }
        lastYRef.current = currentY;
      } else {
        setStatus('ready');
        lastYRef.current = null; // Reset if hand is lost
      }

      animationFrameId = requestAnimationFrame(detectHand);
    };

    const initialize = async () => {
      await tf.setBackend('webgl');
      await tf.ready();
      model = await handpose.load();
      await setupCamera();
      
      if (videoRef.current?.srcObject) {
        setStatus('ready');
        detectHand();
      }
    };

    initialize();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-none">
      <video 
        ref={videoRef} 
        className="w-32 h-24 bg-black/50 rounded-lg border border-white/10 hidden md:block opacity-30 shadow-[0_0_15px_rgba(99,102,241,0.2)] object-cover" 
        style={{ transform: 'scaleX(-1)' }} 
        playsInline 
        muted 
      />
      
      <div className="glass px-4 py-2 rounded-full flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white">
        <div className={`w-2 h-2 rounded-full ${
          status === 'initializing' ? 'bg-yellow-500 animate-pulse' :
          status === 'ready' ? 'bg-blue-500' :
          status === 'tracking' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' :
          'bg-red-500'
        }`} />
        {status === 'initializing' ? 'Loading AI...' : 
         status === 'ready' ? 'Hand AI Ready' : 
         status === 'tracking' ? 'Tracking Hand' : 
         'AI Offline'}
      </div>
    </div>
  );
}
