"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  Send,
  ChevronRight,
  Lightbulb,
  FileCheck,
  ShieldAlert,
  User,
  Loader2,
} from "lucide-react";
import { AIMessage } from "@/types";
import { suggestedQuestions, initialChatHistory } from "@/services/aiAssistantService";
import { cn } from "@/lib/utils";

export function AiAssistantView() {
  const [messages, setMessages] = useState<AIMessage[]>(initialChatHistory);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: textToSend }),
      });

      const data = await res.json();
      if (data.success && data.message) {
        setMessages((prev) => [...prev, data.message]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            sender: "lead-ai",
            text: "Ocurrió un error al procesar tu consulta con la IA. Por favor, intenta nuevamente.",
            timestamp: new Date().toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: "lead-ai",
          text: "No se pudo conectar con el servidor de inteligencia artificial.",
          timestamp: new Date().toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
            Asistente IA de LEAD
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Tu aliado para comprender los datos y tomar mejores decisiones.
          </p>
        </div>

        {/* Feature Tag */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-sky-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>IA con enfoque educativo</span>
        </div>
      </div>

      {/* Main 2-Column Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Preguntas sugeridas + Privacidad */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Preguntas sugeridas
            </h3>
            <div className="space-y-2">
              {suggestedQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  disabled={isLoading}
                  className="w-full text-left p-3 rounded-xl border border-slate-100 hover:border-sky-300 hover:bg-sky-50/50 text-xs font-semibold text-sky-800 flex items-center justify-between transition-all group shadow-xs"
                >
                  <span className="line-clamp-2 leading-relaxed">{q}</span>
                  <ChevronRight className="w-4 h-4 text-sky-400 group-hover:translate-x-1 transition-transform shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Privacidad y Uso Responsable Card */}
          <div className="bg-sky-50/70 rounded-2xl p-4 border border-sky-200/70 text-slate-700">
            <div className="flex items-center gap-2 font-bold text-xs text-sky-900 mb-1.5">
              <ShieldAlert className="w-4 h-4 text-sky-700" />
              <span>Privacidad y uso responsable</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-600">
              La IA de LEAD no toma decisiones automáticas sobre estudiantes. Toda
              recomendación debe ser revisada por el equipo educativo.
            </p>
          </div>
        </div>

        {/* Right Column: Chat History & Input */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-100 shadow-soft flex flex-col h-[650px] overflow-hidden">
          {/* Chat Messages Scroll */}
          <div className="flex-1 p-6 overflow-y-auto space-y-5">
            {messages.map((msg) => {
              if (msg.sender === "user") {
                return (
                  <div key={msg.id} className="flex justify-end items-start gap-2.5">
                    <div className="max-w-lg bg-sky-100/90 text-sky-950 px-4 py-3 rounded-2xl rounded-tr-sm text-xs font-medium leading-relaxed shadow-xs">
                      <p>{msg.text}</p>
                      <span className="text-[9px] text-sky-700/60 block text-right mt-1">
                        {msg.timestamp}
                      </span>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center shrink-0 text-xs shadow-xs">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              }

              // LEAD AI Response
              return (
                <div key={msg.id} className="flex items-start gap-3 max-w-2xl">
                  {/* Lead Rock Avatar */}
                  <div className="relative w-8 h-8 rounded-xl overflow-hidden bg-slate-900 shrink-0 p-0.5 border border-slate-700 shadow-sm">
                    <Image
                      src="/images/lead-logo.png"
                      alt="LEAD AI"
                      width={32}
                      height={32}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="space-y-3 flex-1">
                    {/* Introductory text */}
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-800 leading-relaxed shadow-xs">
                      <p>{msg.text}</p>

                      {/* Factores identificados */}
                      {msg.identifiedFactors && msg.identifiedFactors.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-200/60">
                          <h4 className="font-bold text-slate-900 mb-1.5">
                            Posibles factores identificados:
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-slate-700">
                            {msg.identifiedFactors.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Recomendación Box */}
                    {msg.recommendation && (
                      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 text-xs shadow-xs">
                        <div className="flex items-center gap-2 font-bold text-amber-900 mb-1.5">
                          <div className="w-5 h-5 rounded-md bg-amber-200/80 flex items-center justify-center text-amber-800">
                            <Lightbulb className="w-3.5 h-3.5" />
                          </div>
                          <span>Recomendación</span>
                        </div>
                        <p className="text-amber-900/90 leading-relaxed font-medium">
                          {msg.recommendation}
                        </p>
                      </div>
                    )}

                    {/* Evidencia Box */}
                    {msg.evidence && (
                      <div className="bg-sky-50/50 border border-sky-100 rounded-xl p-3 text-xs text-slate-600 flex items-start gap-2.5 shadow-xs">
                        <FileCheck className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-slate-800 block text-[11px]">
                            Evidencia
                          </strong>
                          <span className="text-[11px] text-slate-600">
                            {msg.evidence}
                          </span>
                        </div>
                      </div>
                    )}

                    <span className="text-[10px] text-slate-400 pl-1 block">
                      LEAD AI • {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center shrink-0">
                  <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-500 font-medium animate-pulse">
                  Analizando datos de la escuela y generando diagnóstico pedagógico...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Escribe tu pregunta aquí..."
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !inputQuery.trim()}
                className="w-10 h-10 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white flex items-center justify-center disabled:opacity-40 transition-colors shadow-md shadow-sky-600/20 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

