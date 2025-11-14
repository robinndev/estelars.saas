interface ICoupleCard {
  title: string;
  image: string;
  bg: string;
  setBgImage: (img: string) => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const CoupleCard = ({
  title,
  image,
  bg,
  setBgImage,
  onMouseEnter,
  onMouseLeave,
}: ICoupleCard) => {
  const handleEnter = () => {
    setBgImage(bg);
    onMouseEnter?.();
  };

  const handleLeave = () => {
    setBgImage("/robin-rebeca.png");
    onMouseLeave?.();
  };

  return (
    <div
      className="w-44 h-64 rounded-lg bg-cover bg-center transform transition-all duration-300 hover:scale-110 hover:brightness-110 cursor-pointer flex-shrink-0 relative"
      style={{ backgroundImage: `url(${image})` }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-all flex items-end justify-center text-center pb-2 font-semibold text-white text-sm rounded-lg">
        {title}
      </div>
    </div>
  );
};
