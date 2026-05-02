import { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (text.trim() === "") {
      alert("Please enter text");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/translate",
        {
          text: text,
          tone: tone,
        }
      );

      setResult(response.data.translated);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
    // setText("")
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 md:p-10">

        <div className="text-center mb-8">
          <p className="inline-block px-4 py-1 text-sm rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 mb-4">
            Workplace AI Assistant
          </p>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Corporate Translator AI
          </h1>

          <p className="text-slate-300 text-base md:text-lg">
            Turn raw frustration into polished professionalism.
          </p>
        </div>

        <div className="space-y-5">

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Your Message
            </label>

            <textarea
              rows="6"
              placeholder="Write your frustrated message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full rounded-2xl bg-slate-900/70 border border-slate-700 text-white placeholder-slate-400 px-5 py-4 outline-none resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Select Tone
            </label>

            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-2xl bg-slate-900/70 border border-slate-700 text-white px-5 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            >
              <option>Professional</option>
              <option>Polite</option>
              <option>Assertive</option>
              <option>Passive Aggressive</option>
              <option>HR Safe</option>
            </select>
          </div>

          <button
            onClick={handleTranslate}
            disabled={loading}
            className="w-full rounded-2xl bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold py-4 transition-all duration-300 shadow-lg shadow-indigo-900/40"
          >
            {loading ? "Translating..." : "Translate"}
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-slate-900/70 border border-slate-700 rounded-2xl p-6">
            <p className="text-sm uppercase tracking-widest text-indigo-300 mb-3">
              Polished Output
            </p>

            <p className="text-white text-lg leading-relaxed">
              {result}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;