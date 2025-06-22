interface SpinnerProps {
    size?: number | string; // accepts tailwind (e.g. "h-6 w-6") or px (e.g. 24)
    className?: string;
  }
  
  export const Spinner = ({ size = 24, className = "" }: SpinnerProps) => {
    const dimension =
      typeof size === "number" ? `${size}px` : undefined;
  
    return (
      <div className={`flex items-center justify-center h-100% ${className}`}>
        <svg
          className="animate-spin text-pink-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          style={{
            height: dimension,
            width: dimension,
          }}
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
      </div>
    );
  };
  