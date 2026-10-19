export const BUSINESS = {
  name: "AGYEDABE ENTERPRISE",
  descriptor: "Building Consultants | Real Estate",
  whatsappDisplay: "024 344 1098",
  whatsappUrl: "https://wa.me/233243441098",
  callsDisplay: "053 392 6768",
  callsTel: "tel:+233533926768",
  email: "davidagbemafle390@gmail.com",
} as const;

export function whatsappEnquiry(message: string): string {
  return `${BUSINESS.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
