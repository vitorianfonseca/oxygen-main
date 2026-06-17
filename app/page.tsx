import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import IdentityStrip from '@/components/IdentityStrip'
import Manifesto from '@/components/Manifesto'
import Services from '@/components/Services'
import SkewContainer from '@/components/SkewContainer'
import Classes from '@/components/Classes'
import Trainers from '@/components/Trainers'
import SocialMarquee from '@/components/SocialMarquee'
import Plans from '@/components/Plans'
import ClosingCTA from '@/components/ClosingCTA'
import Footer from '@/components/Footer'
import PageReveal from '@/components/PageReveal'

function Divider() {
  return (
    <div className="w-full py-0">
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#009FDF]/20 to-transparent" />
    </div>
  )
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <PageReveal />
      <Navbar />
      <Hero />
      <Divider />
      <IdentityStrip />
      <Divider />
      <Manifesto />
      <Divider />
      <SkewContainer>
        <Services />
      </SkewContainer>
      <Divider />
      <Classes />
      <Divider />
      <Trainers />
      <Divider />
      <SocialMarquee />
      {/* <Divider /> */}
      {/* <Plans /> */}
      <Divider />
      <ClosingCTA />
      <Divider />
      <Footer />
    </main>
  )
}