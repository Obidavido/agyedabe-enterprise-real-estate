import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ContactForm from "@/components/contact/ContactForm";
import { BUSINESS } from "@/lib/contact";

export const metadata = { title: "Contact", description: "Contact AGYEDABE ENTERPRISE about property or building consultancy." };

type ContactPageProps = { searchParams: Promise<{ propertyReference?: string | string[] }> };

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const propertyReference = Array.isArray(params.propertyReference) ? params.propertyReference[0] : params.propertyReference ?? "";
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-intro"><div className="page-intro-inner"><p className="section-kicker">Contact</p><h1>Let’s talk about your property plans.</h1><p>Choose a direct contact channel or use the presentation demo enquiry form.</p><span className="demo-note">Demo form · no remote delivery</span></div></section>
        <section className="section contact-page-section">
          <div className="section-inner contact-layout">
            <div className="contact-side">
              <p className="section-kicker">Reach the team</p><h2 className="section-heading">Choose the right way to connect.</h2><p className="section-intro">The supplied contact details are separated by contact method. Please use each number only for its stated purpose.</p>
              <div className="contact-methods">
                <a className="contact-method" href={BUSINESS.whatsappUrl} target="_blank" rel="noreferrer"><span><MessageCircle size={18} /></span><div><small>WhatsApp only</small><strong>{BUSINESS.whatsappDisplay}</strong><em>Start a WhatsApp conversation <ArrowUpRight size={13} /></em></div></a>
                <a className="contact-method" href={BUSINESS.callsTel}><span><Phone size={18} /></span><div><small>Calls only</small><strong>{BUSINESS.callsDisplay}</strong><em>Call the business <ArrowUpRight size={13} /></em></div></a>
                <a className="contact-method" href={`mailto:${BUSINESS.email}`}><span><Mail size={18} /></span><div><small>Email</small><strong>{BUSINESS.email}</strong><em>Compose an email <ArrowUpRight size={13} /></em></div></a>
              </div>
              <div className="contact-demo-note"><strong>Demo limitation</strong><p>Submitting the form below only shows a local confirmation. It does not send or store an enquiry. A real enquiry backend must be connected before production.</p></div>
            </div>
            <ContactForm initialReference={propertyReference} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
