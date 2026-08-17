// app/page.tsx
'use client';

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./components/Editor').then((m) => m.Editor), {
  ssr: false,
  loading: () => <div style={
    { padding: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "50px",
      fontFamily: "Segoe UI, sans-serif",
      height: "100vh",
      width: "100vw",
    }

   }>Loading Editor...</div>,
});

export default function Page() {
  return <Editor />;
}