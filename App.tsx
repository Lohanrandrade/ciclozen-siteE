
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, Play, ShieldCheck, Star, 
  ArrowRight, Flower, ChevronDown, ChevronUp, 
  Lock, RefreshCcw, Sparkles, MessageCircle, ShoppingBag, Clock, Users
} from 'lucide-react';
import { CTAButton } from './components/Button';
import { PROMISES, METHOD_DETAILS, FAQS } from './constants';
import ScrollReveal from './components/ScrollReveal';

const recentPurchases = [
  { name: "Maria", state: "SP", time: "agora" },
  { name: "Cláudia", state: "AM", time: "2m" },
  { name: "Adriana", state: "RJ", time: "1m" },
  { name: "Sônia", state: "MG", time: "5m" },
  { name: "Luciana", state: "RS", time: "3m" },
  { name: "Fernanda", state: "BA", time: "4m" }
];

const CHECKOUT_URL = "https://www.ggcheckout.com/checkout/v3/SsgryyjMe1uWCThT2jRh";

const App: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [purchaseIndex, setPurchaseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes
  const [vagas, setVagas] = useState(12);
  const [showStickyCta, setShowStickyCta] = useState(false);

  // Countdown logic
  useEffect(() => {
    const savedTime = localStorage.getItem('ciclozen_timer');
    if (savedTime) setTimeLeft(parseInt(savedTime));

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev > 0 ? prev - 1 : 0;
        localStorage.setItem('ciclozen_timer', next.toString());
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Vagas logic
  useEffect(() => {
    const vInterval = setInterval(() => {
      setVagas(prev => prev > 3 ? prev - Math.floor(Math.random() * 2) : prev);
    }, 45000);
    return () => clearInterval(vInterval);
  }, []);

  // Sticky CTA Logic
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = 600;
      setShowStickyCta(window.scrollY > heroHeight);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setPurchaseIndex((prev) => (prev + 1) % recentPurchases.length);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 4500);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCTAClick = () => {
    document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-slate-200 selection:bg-red-900/30 relative overflow-x-hidden">
      
      {/* 1. SOCIAL PROOF POPUP */}
      <div className={`fixed bottom-24 left-4 z-[100] transition-all duration-700 ease-out transform ${showPopup ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0 pointer-events-none'}`}>
        <div className="bg-slate-900/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-2xl p-3 flex items-center gap-3 border border-white/10 max-w-[240px]">
          <div className="relative">
            <div className="bg-[#800020] rounded-xl p-2 flex-shrink-0 shadow-sm">
              <ShoppingBag className="text-white w-4 h-4" />
            </div>
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <p className="text-[11px] font-bold text-white truncate">
                {recentPurchases[purchaseIndex].name} ({recentPurchases[purchaseIndex].state})
              </p>
              <CheckCircle2 className="w-2.5 h-2.5 text-blue-400 fill-current" />
            </div>
            <p className="text-[10px] text-slate-400 font-medium">Acabou de adquirir o acesso ✨</p>
          </div>
        </div>
      </div>

      {/* 2. STICKY CTA MOBILE */}
      <div className={`fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md border-t border-white/10 z-[90] transition-transform duration-300 md:hidden ${showStickyCta ? 'translate-y-0' : 'translate-y-full'}`}>
        <button 
          onClick={handleCTAClick}
          className="w-full py-4 rounded-xl bg-[#800020] text-[#d4af37] font-black text-sm uppercase tracking-widest shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 border border-[#d4af37]/30"
        >
          <Sparkles size={16} /> SIM!! QUERO CURAR A MENOPAUSA
        </button>
      </div>

      {/* 3. FLOATING WHATSAPP */}
      <a 
        href="https://wa.me/5511940362890?text=Olá,%20tenho%20dúvidas%20sobre%20o%20CicloZen" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-green-500 text-white p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all shadow-green-100 hidden md:flex"
        aria-label="WhatsApp"
      >
        <MessageCircle size={28} />
      </a>

      {/* HEADER */}
      <nav className="py-4 px-6 border-b border-white/5 flex justify-center sticky top-0 bg-black/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div className="bg-[#800020] p-2 rounded-full shadow-lg shadow-red-900/20">
            <Flower className="text-[#d4af37] w-5 h-5" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-white">Ciclo<span className="text-[#d4af37]">Zen</span></span>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-12 pb-20 px-6 max-w-5xl mx-auto text-center">
        <ScrollReveal direction="left" delay={0}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-900/20 text-[#d4af37] rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-[#d4af37]/20">
            <Sparkles size={12} /> Resgate da Feminilidade & Libido
          </div>
        </ScrollReveal>
        
        <ScrollReveal direction="left" delay={150}>
          <h1 className="font-serif text-3xl md:text-5xl leading-[1.1] mb-6 font-bold text-white uppercase">
            VOCÊ NÃO ESTÁ FICANDO <span className="text-[#d4af37] italic">LOUCA</span>, É APENAS SEU CORPO PEDINDO SOCORRO.
          </h1>
        </ScrollReveal>
        
        <ScrollReveal direction="left" delay={300}>
          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            O protocolo natural que cura a menopausa antes e após os 40.
          </p>
        </ScrollReveal>

        {/* VSL VIDEO SECTION */}
        <ScrollReveal direction="right" delay={300} duration={800}>
          <div className="relative aspect-video w-full max-w-3xl mx-auto bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden mb-12 border-4 border-white group">
            <iframe 
              src="https://www.youtube.com/embed/zBtgXn2zxgs?rel=0&modestbranding=1" 
              title="CicloZen VSL"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="left" delay={450}>
          <CTAButton onClick={handleCTAClick} className="!max-w-xl mx-auto bg-[#800020] hover:bg-[#600018] text-[#d4af37] border border-[#d4af37]/30">
            SIM!! QUERO CURAR A MENOPAUSA
          </CTAButton>
          <p className="mt-4 text-slate-300 font-medium text-lg italic">
            Acesso imediato e seguro. 7 dias de garantia total.
          </p>
          <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest">Acesso imediato • Pagamento 100% Seguro</p>
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={600}>
          <div className="mt-8 flex items-center justify-center gap-6 text-[9px] font-bold text-slate-500 uppercase tracking-[0.15em]">
            <span className="flex items-center gap-1.5 text-green-500/70"><ShieldCheck size={12}/> Seguro</span>
            <span className="flex items-center gap-1.5 text-slate-400"><Star size={12} className="text-[#d4af37] fill-current"/> +14k Alunas</span>
          </div>
        </ScrollReveal>
      </header>

      {/* COMMON ENEMY SECTION */}
      <section className="py-24 bg-black px-6 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#800020]/5 blur-[100px] rounded-full"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal direction="up">
            <h2 className="text-center font-serif text-3xl md:text-5xl mb-8 text-white leading-tight">
              Por que os médicos e a indústria farmacêutica querem que você <span className="text-[#d4af37] italic">continue sofrendo?</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <div className="bg-slate-900/40 p-8 md:p-12 rounded-[2rem] border border-white/10 backdrop-blur-xl">
              <p className="text-xl text-slate-300 leading-relaxed text-center">
                Eles lucram com a sua insônia e com a sua falta de desejo. Eles querem te entupir de pílulas que apenas mascaram o problema. A verdade é que seu corpo está <span className="text-white font-bold underline decoration-[#800020]">inflamado e desregulado</span>, e o CicloZen é a única chave para 'destravar' sua biologia feminina.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* PROMISES */}
      <section className="py-20 bg-black px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <h2 className="text-center font-serif text-3xl mb-12 text-white">O que o <span className="text-[#d4af37]">CicloZen</span> vai fazer por você:</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROMISES.map((p, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 150}>
                <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 shadow-sm hover:shadow-md transition-all h-full">
                  <div className="w-10 h-10 bg-red-900/20 rounded-xl flex items-center justify-center mb-5 text-[#d4af37]">
                    {p.icon}
                  </div>
                  <h4 className="text-base font-bold mb-2 text-white">{p.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{p.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal direction="up">
            <h2 className="text-center font-serif text-4xl md:text-6xl mb-16 leading-tight text-white">
              Mulheres que <span className="text-[#d4af37] italic underline decoration-red-900/30 underline-offset-8">escaparam do pesadelo</span> da menopausa:
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <ScrollReveal direction="up" delay={200}>
              <div className="relative aspect-video w-full bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white group">
                <iframe 
                  src="https://www.youtube.com/embed/h-NO7ixK3pU?rel=0&modestbranding=1" 
                  title="Depoimento Aluna 1"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <div className="relative aspect-video w-full bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden border-4 border-white group">
                <iframe 
                  src="https://www.youtube.com/embed/C91A9MNlNVM?rel=0&modestbranding=1" 
                  title="Depoimento Aluna 2"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                ></iframe>
              </div>
            </ScrollReveal>
          </div>
          <ScrollReveal direction="up" delay={400}>
            <p className="text-center mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
              <Sparkles className="inline-video w-3 h-3 text-[#d4af37] mr-1" /> Histórias Reais de Transformação
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ScrollReveal direction="up">
              <h2 className="font-serif text-3xl md:text-5xl mb-6 text-white uppercase">Faça parte da nossa <span className="text-[#d4af37] italic">Comunidade</span></h2>
            </ScrollReveal>
            <div className="space-y-6">
              {METHOD_DETAILS.map((m, i) => (
                <ScrollReveal key={i} direction="left" delay={i * 150}>
                  <div className="flex gap-4 items-start p-4 rounded-2xl hover:bg-slate-900/50 transition-colors">
                    <div className="bg-red-900/20 p-2.5 rounded-lg flex-shrink-0 text-[#d4af37]">{m.icon}</div>
                    <div>
                      <h4 className="font-bold text-base text-white">✅ {m.title}</h4>
                      <p className="text-slate-400 text-sm">{m.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
          <ScrollReveal direction="right" delay={200} duration={800} className="relative p-4">
            <div className="absolute inset-0 bg-red-900/10 rounded-[2rem] rotate-2"></div>
            <img src="https://i.imgur.com/lfcIajc.jpeg" className="relative z-10 rounded-[2rem] shadow-xl border-8 border-slate-900" alt="Rotina Zen" referrerPolicy="no-referrer" />
          </ScrollReveal>
        </div>
      </section>

      {/* OFFER SECTION */}
      <section id="oferta" className="py-24 px-6 bg-black text-white relative overflow-hidden border-t border-white/5">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-900/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <ScrollReveal direction="up">
              <h2 className="font-serif text-4xl md:text-5xl mb-4">Escolha sua <span className="text-[#d4af37] italic">Transformação</span></h2>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={150}>
              <p className="text-slate-400 text-sm">Acesso imediato enviado para o seu e-mail.</p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={350} duration={800}>
            <div className="bg-slate-900/40 text-white rounded-[3rem] p-1 md:p-1.5 shadow-2xl relative border-4 border-[#d4af37]/20 backdrop-blur-xl">
              <div className="bg-slate-900/60 rounded-[2.8rem] p-8 md:p-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#800020] text-[#d4af37] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg border border-[#d4af37]/30">
                  OFERTA EXCLUSIVA DE HOJE
                </div>
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-serif font-bold mb-1 text-white tracking-tight">CicloZen VIP</h3>
                  <p className="text-[#d4af37] text-[10px] uppercase tracking-widest font-black">O PROTOCOLO DEFINITIVO DE RESGATE</p>
                </div>

                {/* URGENCY TIMER */}
                <div className="mb-10 p-4 bg-red-900/20 rounded-3xl border border-red-500/20 flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[9px] font-black text-red-400 uppercase tracking-tighter mb-1">Oferta expira em:</span>
                    <div className="flex items-center gap-2 text-2xl font-black text-[#d4af37] font-mono">
                      <Clock size={20} />
                      {formatTime(timeLeft)}
                    </div>
                  </div>
                  <div className="w-[1px] h-10 bg-red-500/20 mx-2"></div>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-[9px] font-black text-red-400 uppercase tracking-tighter mb-1">Vagas Restantes:</span>
                    <div className="flex items-center gap-1.5 text-2xl font-black text-white">
                      <Users size={20} className="text-[#d4af37]" />
                      {vagas}
                    </div>
                  </div>
                </div>
                
                <div className="text-center mb-10">
                  <p className="text-slate-500 text-sm line-through mb-1 font-bold">De R$ 59,90</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-bold text-slate-400">Por apenas R$</span>
                    <span className="text-7xl font-black tracking-tighter text-white">29,90</span>
                  </div>
                  <p className="text-[#d4af37] text-[10px] mt-4 uppercase tracking-[0.2em] font-black">PAGAMENTO ÚNICO • ACESSO VITALÍCIO</p>
                </div>
                
                <div className="grid grid-cols-1 gap-y-3 mb-10 flex-grow text-xs font-bold text-slate-300">
                  {[
                    "Protocolo Libido Explosiva",
                    "Shake Ativador Feminino 40+",
                    "Plano Alimentar Hormonal 21 Dias",
                    "Treinos Hormone-Boost",
                    "Guia Anti-Calor Noturno",
                    "Lista de Compras Anti-Inflamatória",
                    "Manual da Saúde Íntima Feminina 40+",
                    "Cardápio Hormonal Rejuvenescedor",
                    "Guia da vitalidade pos 40+",
                    "Suporte Prioritário"
                  ].map((txt, idx) => (
                    <div key={idx} className="flex gap-3 items-center bg-slate-800/40 p-3 rounded-2xl border border-white/5">
                      <Star className="text-yellow-400 w-4 h-4 fill-current flex-shrink-0"/> 
                      <span className="leading-tight">{txt}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mb-8 flex items-center justify-center gap-4 p-4 bg-slate-800/20 rounded-2xl border border-white/5">
                  <ShieldCheck className="w-10 h-10 text-[#d4af37]" />
                  <div className="text-left">
                    <p className="text-[11px] font-bold text-white uppercase tracking-wider">Garantia Incondicional</p>
                    <p className="text-[10px] text-slate-400">7 dias para testar ou seu dinheiro de volta.</p>
                  </div>
                </div>

                <a 
                  href={CHECKOUT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-6 rounded-2xl bg-[#800020] text-[#d4af37] font-black hover:bg-[#600018] transition-all text-center text-base uppercase tracking-widest shadow-[0_15px_40px_rgba(128,0,32,0.3)] hover:scale-[1.02] active:scale-[0.98] border border-[#d4af37]/30"
                >
                  SIM!! QUERO CURAR A MENOPAUSA
                </a>
                
                <div className="mt-8 flex items-center justify-center gap-6 text-[10px] font-bold text-slate-500 uppercase">
                  <span className="flex items-center gap-1.5"><Lock size={14}/> 100% SEGURO</span>
                  <span className="flex items-center gap-1.5"><RefreshCcw size={14}/> 7 DIAS DE GARANTIA</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* GUARANTEE SECTION */}
      <section className="py-20 bg-black px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal direction="up">
            <div className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-[#800020]/10 rounded-full border border-[#d4af37]/20 p-4">
              <ShieldCheck className="w-full h-full text-[#d4af37]" />
            </div>
            <h2 className="font-serif text-3xl md:text-5xl mb-6 text-white">Risco Zero: <span className="text-[#d4af37] italic">Garantia Blindada</span></h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
              Eu tenho tanta confiança no protocolo <span className="text-white font-bold">CicloZen</span> que eu tiro todo o risco das suas costas e coloco nas minhas.
            </p>
            <div className="bg-slate-900/40 p-8 md:p-12 rounded-[2.5rem] border border-[#d4af37]/10 backdrop-blur-xl inline-block text-left max-w-3xl">
              <p className="text-slate-400 leading-relaxed italic text-lg">
                "Se por qualquer motivo — ou até mesmo sem motivo — você sentir que o CicloZen não é para você, basta me enviar um e-mail nos primeiros <span className="text-white font-bold">7 dias</span> e eu devolvo 100% do seu dinheiro. Sem perguntas, sem letras miúdas e sem ressentimentos. Ou você fica satisfeita, ou fica com o seu dinheiro."
              </p>
            </div>
          </ScrollReveal>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#800020]/5 blur-[120px] rounded-full pointer-events-none"></div>
      </section>

      {/* MINIMALIST SUPPORT */}
      <section className="py-20 px-6 bg-black text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-serif text-2xl mb-8 italic text-white">Não deixe seu casamento esfriar mais um dia. <span className="text-[#d4af37] font-bold">Fale com nossa consultora agora.</span></h2>
          <div className="flex flex-col items-center gap-4">
            <a 
              href="https://wa.me/5511940362890?text=Olá,%20preciso%20de%20ajuda%20urgente%20com%20o%20CicloZen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-red-900/20 text-red-400 px-8 py-4 rounded-2xl font-bold hover:bg-red-900/30 transition-all group border border-red-500/20"
            >
              <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
              <span>Chamar no WhatsApp agora</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-black">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal direction="up">
            <h2 className="text-center font-serif text-3xl mb-12 text-white">Perguntas Frequentes</h2>
          </ScrollReveal>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} direction="up" delay={i * 100}>
                <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden shadow-sm">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-6 text-left flex justify-between items-center"
                  >
                    <span className="font-bold text-sm text-slate-200">{faq.q}</span>
                    {openFaq === i ? <ChevronUp size={18} className="text-[#d4af37]" /> : <ChevronDown size={18} className="text-slate-600" />}
                  </button>
                  {openFaq === i && (
                    <div className="p-6 pt-0 text-slate-400 text-[13px] border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 bg-black border-t border-white/5 text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
        <div className="max-w-4xl mx-auto">
          <p className="mb-6 text-slate-600">CicloZen &copy; {new Date().getFullYear()} • Todos os direitos reservados</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="hover:text-[#d4af37] transition-colors">Políticas de Privacidade</a>
            <a href="#" className="hover:text-[#d4af37] transition-colors">Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
