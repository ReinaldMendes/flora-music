import Section from '@/components/ui/Section'
import AnimatedText from '@/components/ui/AnimatedText'

export default function InstagramSection() {
  return (
    <Section className="bg-flora-offwhite">
      <div className="text-center">
        <AnimatedText>
          <p className="text-xs font-body font-medium tracking-[0.2em] uppercase text-flora-moss mb-4">Instagram</p>
          <h2 className="font-display text-title text-flora-deep mb-6">@flora.musica</h2>
          <p className="font-body text-flora-forest/70 mb-12">
            Bastidores, natureza e momentos entre as canções.
          </p>
        </AnimatedText>

        <AnimatedText delay={0.2}>
          <a
            href="https://instagram.com/flora.musica"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 border border-flora-deep/20 text-flora-deep font-body text-sm rounded hover:bg-flora-deep hover:text-flora-cream transition-all duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
            Seguir no Instagram
          </a>
        </AnimatedText>
      </div>
    </Section>
  )
}
