"use client";
export default function Placeholder({ title, text }: { title: string; text: string }) {
  return (
    <div className="text-center p-10 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-gray-600 mt-2">{text}</p>
    </div>
  );
}