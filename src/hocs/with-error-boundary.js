import React, { Component } from "react";

const DefaultFallbackComp = () => <div>Something broken</div>;
const defaultOnError = () => {};
export const withErrorBoundary = (
  Comp,
  FallbackComp = DefaultFallbackComp,
  onError = defaultOnError
) => {
  class WithErrorBoundary extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null
      };

      this.resetError = this.resetError.bind(this);
    }

    render() {
      const {
        props,

        state: { error },

        resetError
      } = this;

      return error ? (
        <FallbackComp
          error={error}
          onReset={resetError}
          originalProps={props}
        />
      ) : (
        <Comp {...props} />
      );
    }

    componentDidCatch(error, info) {
      onError(error, info);
      this.setState({ error });
    }

    resetError() {
      this.setState({ error: null });
    }
  }

  WithErrorBoundary.displayName = `withErrorBoundary(${Comp.displayName ||
    Comp.name})`;

  return WithErrorBoundary;
};

