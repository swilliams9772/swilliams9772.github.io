import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Visualization Error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    this.props.onReset?.();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-[400px] text-muted-foreground space-y-4"
          >
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-lg">Visualization Error</h3>
              <p className="max-w-md text-sm">
                Something went wrong while rendering this visualization.
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <span className="block mt-2 text-xs text-red-500">
                    {this.state.error.toString()}
                  </span>
                )}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={this.handleReset}
              className="mt-4"
            >
              Try Again
            </Button>
          </motion.div>
        </Card>
      );
    }

    return this.props.children;
  }
} 