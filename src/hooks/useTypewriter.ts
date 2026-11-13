import { useEffect, useState } from "react";

export function useTypewriter(words: string[], typeSpeed = 85, deleteSpeed = 45, pause = 1600): string {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let delay = deleting ? deleteSpeed : typeSpeed;

    if (!deleting && text === current) delay = pause;

    const timer = window.setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1));
      }
    }, delay);

    return () => window.clearTimeout(timer);
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause]);

  return text;
}
