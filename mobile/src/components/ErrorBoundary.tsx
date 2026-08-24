import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, ScrollView } from 'react-native';

interface Props {
  children: ReactNode;
  fallbackName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (__DEV__) {
      console.log(`[ErrorBoundary - ${this.props.fallbackName}] Caught error:`, error?.message);
    }
    this.setState({ errorInfo });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <View style={{ padding: 20, backgroundColor: '#ffebee', borderRadius: 8, margin: 10 }}>
          <Text style={{ color: '#c62828', fontWeight: 'bold', marginBottom: 10 }}>
            Something went wrong.
          </Text>
          <Text style={{ color: '#b71c1c' }}>
            We're sorry, but an unexpected error occurred while loading this section. Please try again.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}
