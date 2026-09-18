import { lazy, Suspense, useEffect, useState } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

const HeroScene = lazy(() => import('./3d/HeroScene'))

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
  } catch {
    return false
  }
}

export function Hero() {
  const reduced = !!useReducedMotion()
  const [webgl, setWebgl] = useState(false)
  useEffect(() => setWebgl(canUseWebGL()), [])

  return (
    <section id="inicio" className="relative min-h-[760px] overflow-hidden bg-[#f8fbfc] pt-20 lg:min-h-screen">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(8,174,185,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(8,174,185,.045)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <div className="container-page relative grid min-h-[calc(100vh-5rem)] items-center gap-4 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-10">
        <motion.div className="relative z-10 max-w-2xl" initial={reduced ? false : { opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-aqua-100 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[.18em] text-aqua-600 shadow-sm"><span className="h-2 w-2 rounded-full bg-aqua-500" />Serviços de saúde • cuidado integrado</div>
          <h1 className="display-title max-w-[690px]">Saúde, tecnologia e cuidado humano em <span className="bg-gradient-to-r from-aqua-600 to-skybrand bg-clip-text text-transparent">perfeito equilíbrio.</span></h1>
          <p className="body-large mt-7 max-w-[610px]">A Equilibrium Multi oferece soluções médicas personalizadas, conectando excelência profissional, inovação e atendimento humanizado.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a className="button-primary" href="#servicos">Conheça nossas soluções <ArrowRight size={17} /></a><a className="button-secondary" href="#contato">Solicite uma proposta</a></div>
          <div className="mt-12 flex items-center gap-3 text-xs font-semibold uppercase tracking-[.14em] text-slate-500"><span className="grid h-9 w-9 place-items-center rounded-full border border-slate-200"><ArrowDown size={14} /></span>Explore a Equilibrium</div>
        </motion.div>
        <div className="relative h-[390px] sm:h-[500px] lg:h-[620px]" aria-label="Símbolo oficial da Equilibrium Multi com movimento tridimensional sutil" role="img">
          <div className="ambient-blob absolute inset-[5%] rounded-full" />
          {webgl && <Suspense fallback={null}><HeroScene /></Suspense>}
          <div className="absolute bottom-[12%] left-[2%] z-20 rounded-2xl border border-white bg-white/80 p-4 shadow-soft backdrop-blur-lg"><span className="block text-xs font-bold uppercase tracking-[.17em] text-aqua-600">Conexão que cuida</span><span className="mt-1 block text-sm text-slate-600">Pessoas • instituições • tecnologia</span></div>
        </div>
      </div>
    </section>
  )
}
