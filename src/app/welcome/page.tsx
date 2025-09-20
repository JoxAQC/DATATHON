import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="relative h-screen w-screen flex flex-col items-center justify-end overflow-hidden">
       <Image
        src="/fondo.jpg"
        alt="A stunning landscape to inspire adventure."
        fill
        className="object-cover z-0"
        data-ai-hint="adventure landscape"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="z-20 flex flex-col items-center text-center text-white animate-in fade-in-0 duration-1000 p-4 pb-20">
        <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] mb-4 text-amber-400" style={{ textShadow: '4px 4px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 2px 2px 0px #000' }}>
          Proyecto A.N.D.E.S
        </h1>
        <p className="text-lg md:text-xl mb-8 drop-shadow-md max-w-lg font-body font-bold" style={{ textShadow: '2px 2px 0px #000' }}>
          ¿Estás listo para comenzar a investigar cómo está el Perú?
        </p>
        <Link href="/">
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90 transform transition-transform duration-300 hover:scale-105 shadow-lg font-bold px-10 py-7 text-xl border-4 border-black rounded-lg"
            aria-label="Comenzar la aventura"
          >
            Comenzar a investigar
          </Button>
        </Link>
      </div>
    </main>
  );
}