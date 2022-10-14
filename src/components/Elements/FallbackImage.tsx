type FallbackImageProps = {
  src: string;
  className: string;
  fallback: string;
  alt: string;
};
export const FallbackImage = ({
  src,
  fallback,
  className,
  alt,
}: FallbackImageProps) => {
  return (
    <picture>
      <source srcSet={fallback} type="image/webp" />
      <img src={src} alt={alt} className={className} />
    </picture>
  );
};
