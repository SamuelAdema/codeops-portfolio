import { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorName: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorName: error.message };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '1rem', border: '1px solid #d32f2f', background: '#ffebee', color: '#d32f2f', borderRadius: '4px' }}>
          <strong>Section Crashed:</strong> {this.state.errorName}
        </div>
      );
    }
    return this.props.children;
  }
}