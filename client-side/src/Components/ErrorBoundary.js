import React, { useEffect, useState } from 'react';
function ErrorBoundary(props) {
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    if (props.children) {
      setHasError(false);
    }
  }, [props.children]);

  const handleOnError = () => {
    setHasError(true);
  };

  return hasError ? (
    <div>
      <h1>Something went wrong.</h1>
      <p>Please try again later.</p>
    </div>
  ) : (
    <div onError={handleOnError}>{props.children}</div>
  );
}

export default ErrorBoundary;
