import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    let hideTimer;
    let removeTimer;

    const finish = () => {
      hideTimer = window.setTimeout(() => {
        setHidden(true);
        document.body.classList.remove('is-loading');
        removeTimer = window.setTimeout(() => setRemoved(true), 700);
      }, 900);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });

    return () => {
      window.removeEventListener('load', finish);
      window.clearTimeout(hideTimer);
      window.clearTimeout(removeTimer);
      document.body.classList.remove('is-loading');
    };
  }, []);

  if (removed) return null;

  return (
    <div id="loader" className={hidden ? 'loader-hidden' : ''}>
      <div className="loader-logo">RAKA<span>.</span></div>
      <div className="loader-bar"><div className="loader-progress" /></div>
    </div>
  );
}
