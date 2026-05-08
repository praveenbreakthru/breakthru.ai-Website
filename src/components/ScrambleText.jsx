import { useState, useEffect } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+{}|:<>?~-=[]';

export default function ScrambleText({ text, speed = 30, delay = 0 }) {
  const [displayText, setDisplayText] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timeout;
    if (delay > 0) {
      timeout = setTimeout(() => {
        setMounted(true);
      }, delay);
    } else {
      setMounted(true);
    }
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!mounted) return;

    let frame = 0;
    const length = text.length;
    let interval;

    const animate = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < length; i++) {
        // Reveal characters sequentially based on frame rate
        if (i < frame / 3) {
          output += text[i];
          complete++;
        } else if (text[i] === ' ' || text[i] === '—') {
          output += text[i]; // Preserve spaces and em dashes
        } else {
          output += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }
      }

      setDisplayText(output);

      if (complete >= length) {
        clearInterval(interval);
        setDisplayText(text); // Ensure final text matches exactly
      } else {
        frame++;
      }
    };

    // Initial render with full scramble
    let initialRender = '';
    for (let i = 0; i < length; i++) {
      if (text[i] === ' ' || text[i] === '—') {
        initialRender += text[i];
      } else {
        initialRender += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
      }
    }
    setDisplayText(initialRender);

    interval = setInterval(animate, speed);

    return () => clearInterval(interval);
  }, [mounted, text, speed]);

  // Keep a non-breaking space or initial empty space if not mounted yet
  return <span>{mounted ? displayText : '\u00A0'}</span>;
}
