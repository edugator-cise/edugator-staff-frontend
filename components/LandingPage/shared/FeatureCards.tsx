export const FeatureMaskStyles = {
  WebkitMaskImage:
    "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
  backgroundImage: "radial-gradient(#79a1f94c 1px, transparent 0)",
  backgroundSize: "30px 30px",
  backgroundPosition: "-10px -10px",
};

export const FeatureGraphicWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
        backgroundImage: "radial-gradient(#79a1f940 1px, transparent 0)",
        backgroundSize: "30px 30px",
        backgroundPosition: "-10px -10px",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export const FeatureWrapper = ({
  children,
  title,
  description,
  onMouseEnter,
  onMouseLeave,
  className,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  className?: string;
}) => {
  return (
    <li
      className={`flex flex-col relative rounded-md bg-nav-darker bg-opacity-50 hover:bg-opacity-60 transition p-6 border border-slate-500/10 hover:border-slate-500/20 ${
        className || ``
      }`}
      onMouseEnter={onMouseEnter || (() => {})}
      onMouseLeave={onMouseLeave || (() => {})}
    >
      {children}
      <h3 className="font-ambit text-white text-xl font-semibold pt-4">
        {title}
      </h3>
      <p className="font-inter text-white/80 pt-1 text-sm">{description}</p>
    </li>
  );
};
