import Image from "next/image";

export default function Carousel({ images, title }) {
  return (
    <section className="mt-10 laptop:mt-30 p-2 laptop:p-0">
      <h2 className="text-2xl text-bold">{title}</h2>
      <div className="mt-5">
        <div className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory">
          {images.map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-[85vw] tablet:w-[48vw] laptop:w-[32vw] snap-center"
            >
              {/* contenedor relativo para layout="fill" */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
                <Image
                  src={src}
                  alt={`${title}-${i + 1}`}
                  layout="fill"           // <— clave en tu versión
                  objectFit="cover"       // <— para que recorte bien
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
