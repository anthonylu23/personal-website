import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import StatusPage from "./StatusPage";

type ErrorBoundaryProps = {
  children: ReactNode;
  /** When this changes after an error (e.g. the route path), the boundary resets. */
  resetKey?: unknown;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Catches render errors (including failed lazy-chunk loads) and shows the
 * shared minimal error view.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <StatusPage message="Something went wrong" />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
