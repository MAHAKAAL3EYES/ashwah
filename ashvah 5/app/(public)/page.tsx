import { Hero } from "@/components/sections/Hero";
import { BrandOverview } from "@/components/sections/BrandOverview";
import { Marquee } from "@/components/sections/Marquee";
import { CategoryUniverse } from "@/components/sections/CategoryUniverse";
import { StarProducts } from "@/components/sections/StarProducts";
import { WhyChoose } from "@/components/sections/WhyChoose";
import { Process } from "@/components/sections/Process";
import { CustomFabric } from "@/components/sections/CustomFabric";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import {
  getCategories,
  getStarProducts,
  getFeaturedTestimonials,
  getHero,
  getContact,
} from "@/lib/queries";

export const revalidate = 300;

export default async function HomePage() {
  const [hero, categories, starProducts, testimonials, contact] = await Promise.all([
    getHero(),
    getCategories(),
    getStarProducts(),
    getFeaturedTestimonials(),
    getContact(),
  ]);

  return (
    <>
      <Hero hero={hero} />
      <BrandOverview />
      <Marquee />
      <CategoryUniverse categories={categories} />
      <StarProducts products={starProducts} />
      <WhyChoose />
      <Process />
      <CustomFabric />
      <Testimonials testimonials={testimonials} />
      <Contact contact={contact} />
    </>
  );
}
