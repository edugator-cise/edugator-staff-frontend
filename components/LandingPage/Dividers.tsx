export const CornerDivider = ({ fill }: { fill: string }) => {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M128 127.782C125.189 127.979 122.351 128.08 119.489 128.08C53.4972 128.08 0 74.583 0 8.59082C0 5.72949 0.100586 2.89111 0.298416 0.0800781H0V8.59082V128.08H119.489H128V127.782Z"
        fill={fill}
      />
    </svg>
  );
};
