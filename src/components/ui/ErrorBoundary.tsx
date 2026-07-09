import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in UI component:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-red-600 flex flex-col items-center justify-center min-h-[200px] w-full">
          <h2 className="text-lg font-bold mb-2">Algo salió mal</h2>
          <p className="text-sm">No pudimos cargar esta sección.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
