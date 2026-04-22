'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Mascot from '@/components/Mascot';
import Confetti, { triggerConfetti } from '@/components/Confetti';
import { loadProgress, saveProgress, addStars } from '@/lib/storage';
import { ArrowLeft, Eraser, Save, Palette, RefreshCw, Download, Star } from 'lucide-react';

const colors = [
  '#FF6B6B', '#FF8E72', '#FFB74D', '#FFF176',
  '#81C784', '#4DB6AC', '#4FC3F7', '#7986CB',
  '#BA68C8', '#F48FB1', '#FFD54F', '#A1887F',
];

export default function DrawingStudio() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#4FC3F7');
  const [brushSize, setBrushSize] = useState(8);
  const [drawingsCreated, setDrawingsCreated] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [savedDrawings, setSavedDrawings] = useState<string[]>([]);

  useEffect(() => {
    const progress = loadProgress();
    setDrawingsCreated(progress.drawingsCreated);
    
    // Load saved drawings
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kinder-drawings');
      if (saved) {
        setSavedDrawings(JSON.parse(saved));
      }
    }
    
    // Initialize canvas
    initCanvas();
  }, []);

  const initCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = 400;
    }
    
    // White background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing style
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.beginPath();
      }
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;
    
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = selectedColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    const newSaved = [dataUrl, ...savedDrawings].slice(0, 10); // Keep last 10
    setSavedDrawings(newSaved);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('kinder-drawings', JSON.stringify(newSaved));
    }
    
    // Update progress
    const progress = loadProgress();
    const newCount = progress.drawingsCreated + 1;
    saveProgress({ drawingsCreated: newCount });
    setDrawingsCreated(newCount);
    
    addStars(5);
    triggerConfetti();
    setShowCelebration(true);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `my-drawing-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const loadDrawing = (dataUrl: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    };
    img.src = dataUrl;
  };

  const deleteDrawing = (index: number) => {
    const newSaved = savedDrawings.filter((_, i) => i !== index);
    setSavedDrawings(newSaved);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('kinder-drawings', JSON.stringify(newSaved));
    }
  };

  return (
    <main className="min-h-screen pb-24">
      <Confetti trigger={showCelebration} onFinished={() => setShowCelebration(false)} />
      
      {/* Header */}
      <div className="bg-kid-pink text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <Link href="/" className="p-2 bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold">Drawing Studio 🎨</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-700">Drawings Created</span>
            <div className="flex items-center gap-2">
              <span className="font-bold text-kid-pink">{drawingsCreated}</span>
              <Palette className="w-5 h-5 text-kid-pink" />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-1">Create 5 drawings to earn Artist badge! 🏆</p>
        </div>
      </div>

      {/* Canvas */}
      <div className="px-4">
        <div className="bg-white rounded-3xl p-4 shadow-xl border-4 border-kid-pink">
          <div className="relative rounded-2xl overflow-hidden border-2 border-gray-200">
            <canvas
              ref={canvasRef}
              className="w-full cursor-crosshair touch-none"
              style={{ height: '400px' }}
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
              onMouseMove={draw}
              onTouchStart={startDrawing}
              onTouchEnd={stopDrawing}
              onTouchMove={draw}
            />
          </div>

          {/* Tools */}
          <div className="flex gap-2 mt-4 flex-wrap">
            <button
              onClick={clearCanvas}
              className="btn-kid-red flex items-center gap-2 flex-1"
            >
              <Eraser className="w-5 h-5" />
              Clear
            </button>
            <button
              onClick={saveDrawing}
              className="btn-kid-green flex items-center gap-2 flex-1"
            >
              <Save className="w-5 h-5" />
              Save ⭐
            </button>
            <button
              onClick={downloadDrawing}
              className="btn-kid-blue flex items-center gap-2 flex-1"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>
        </div>
      </div>

      {/* Color palette */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-2xl p-4 shadow-lg">
          <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Pick a Color!
          </h3>
          <div className="grid grid-cols-6 gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-12 h-12 rounded-full transition-all ${
                  selectedColor === color ? 'scale-125 ring-4 ring-gray-400' : ''
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          
          {/* Brush size */}
          <div className="mt-4">
            <p className="font-bold text-gray-700 mb-2">Brush Size: {brushSize}px</p>
            <input
              type="range"
              min="2"
              max="30"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${selectedColor} 0%, ${selectedColor} ${(brushSize / 30) * 100}%, #e5e7eb ${(brushSize / 30) * 100}%, #e5e7eb 100%)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Saved drawings gallery */}
      {savedDrawings.length > 0 && (
        <div className="px-4 mt-6">
          <h3 className="font-bold text-gray-700 mb-3 text-xl">My Artwork Gallery 🖼️</h3>
          <div className="grid grid-cols-2 gap-4">
            {savedDrawings.map((drawing, index) => (
              <div key={index} className="bg-white rounded-2xl p-2 shadow-lg">
                <img
                  src={drawing}
                  alt={`Drawing ${index + 1}`}
                  className="w-full rounded-xl mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => loadDrawing(drawing)}
                    className="flex-1 btn-kid-blue text-sm py-2"
                  >
                    Load
                  </button>
                  <button
                    onClick={() => deleteDrawing(index)}
                    className="flex-1 btn-kid-red text-sm py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mascot */}
      <div className="flex justify-center mt-6">
        <Mascot emotion="excited" size="medium" />
      </div>
    </main>
  );
}
