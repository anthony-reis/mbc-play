"use client";

import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { useRouter } from "next/navigation";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

export function ErrorState({
  title = "Ops! Algo deu errado",
  message = "Não conseguimos carregar o conteúdo. Isso pode ser um problema temporário.",
  onRetry,
  showHomeButton = false,
}: ErrorStateProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>

        <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>

        <p className="text-zinc-400 mb-8 leading-relaxed">{message}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-dark font-medium rounded-lg hover:bg-zinc-200 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Tentar novamente
            </button>
          )}

          {showHomeButton && (
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-dark-300 text-white font-medium rounded-lg hover:bg-dark-200 transition-colors"
            >
              <Home className="w-4 h-4" />
              Voltar ao início
            </button>
          )}
        </div>

        <p className="text-sm text-zinc-500 mt-6">
          Se o problema persistir, tente novamente mais tarde.
        </p>
      </div>
    </div>
  );
}
