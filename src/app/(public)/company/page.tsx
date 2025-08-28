"use client";
import { useDialog } from '@/components/dialogProvider/DialogProvider';
export default function AboutPage() {
    const { showDialog } = useDialog();

    return (
        <div>
            <h1>About Us</h1>
            <p>Learn more about our mission and values.</p>
                          <button
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
        onClick={() => showDialog("Hello from the global dialog!")}
      >
        Open Dialog
      </button>
        </div>
    );
}
