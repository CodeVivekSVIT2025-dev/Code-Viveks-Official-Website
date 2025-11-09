import { cn } from "@/lib/utils";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  title,
  description,
  header,
  image,
  className,
}: {
  title: string;
  description: string;
  header?: React.ReactNode;
  image?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "group relative rounded-xl border border-white/10 bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 p-5 space-y-3",
        className
      )}
    >
      {header}

      {/* ✅ Add Image */}
      {image && (
        <div className="w-full h-36 rounded-lg overflow-hidden bg-neutral-800">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
};

