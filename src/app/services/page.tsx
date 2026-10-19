import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Hammer, Home, KeyRound, Ruler, UsersRound } from "lucide-react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import { whatsappEnquiry } from "@/lib/contact";

export const metadata = { title: "Services", description: "Explore building consultancy and property services from AGYEDABE ENTERPRISE." };

const services = [
  { id: "building-consultancy", title: "Building consultancy", icon: Ruler, copy: "Discuss your building plans and the consultancy support you may need. Share your questions and the team can help you understand possible next steps." },
  { id: "property-sales", title: "Property sales", icon: Home, copy: "Explore properties for sale and ask for more information about a listing, its details and enquiry process." },
  { id: "property-rentals", title: "Property rentals", icon: KeyRound, copy: "Browse rental opportunities and contact the team with questions about the property or viewing availability." },
  { id: "build-and-sell", title: "Build and sell", icon: Hammer, copy: "Talk through a building project with a sale purpose. Start with your project questions and the property goals you have in mind." },
  { id: "build-and-rent", title: "Build and rent", icon: Building2, copy: "Explore a building project with a rental purpose and discuss the steps and consultancy support that may be relevant." },
  { id: "property-enquiries-and-viewing-assistance", title: "Property enquiries and viewing assistance", icon: UsersRound, copy: "Send an enquiry about a listing and ask the team about its details or viewing availability. An enquiry is not a viewing booking." },
];

export default function ServicesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-intro">
          <div className="page-intro-inner">
            <p className="section-kicker">Services</p>
            <h1>Property and building support, shaped around your plans.</h1>
            <p>AGYEDABE ENTERPRISE assists customers with properties for sale and rent and provides building consultancy.</p>
            <span className="demo-note">Building Consultants | Real Estate</span>
          </div>
        </section>
        <section className="section"><div className="section-inner service-detail-list">
          {services.map(({ id, title, icon: Icon, copy }, index) => (
            <article className={`service-detail${index % 2 ? " service-detail-reverse" : ""}`} id={id} key={id}>
              <div className="service-detail-number">0{index + 1}</div>
              <div className="service-detail-icon"><Icon size={26} /></div>
              <div className="service-detail-copy"><p className="section-kicker">AGYEDABE ENTERPRISE</p><h2>{title}</h2><p>{copy}</p><div className="service-detail-actions"><a className="text-link" href={whatsappEnquiry(`Hello AGYEDABE ENTERPRISE, I would like to enquire about ${title}. Please share more information.`)} target="_blank" rel="noreferrer">Ask about this service <ArrowUpRight size={14} /></a><Link className="text-link" href="/contact">Contact page <ArrowRight size={14} /></Link></div></div>
            </article>
          ))}
        </div></section>
        <section className="final-cta"><div className="final-cta-inner"><div><h2>Not sure where to begin?</h2><p>Send the team a question and explain what you are looking for.</p></div><div className="final-cta-actions"><Link className="button-light" href="/contact">Make an enquiry <ArrowRight size={15} /></Link></div></div></section>
      </main>
      <SiteFooter />
    </>
  );
}
