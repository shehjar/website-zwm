import React from 'react';
import { motion } from 'framer-motion';
import { GlassWaterIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type RecipeIngredient = {
  /** Ingredient name, e.g. "Aperol" — rendered uppercase in Bebas Neue */
  name: string;
  /** Optional amount, e.g. "4 cl" */
  amount?: string;
};

export type RecipeCardVariant = 'sage' | 'white';

export type RecipeCardProps = {
  /** Drink name, e.g. "Aperol Spritz" */
  title: string;
  /** Optional short description */
  subtitle?: string;
  imageSrc?: string;
  imageAlt?: string;
  ingredients: RecipeIngredient[];
  /** Character tag, e.g. "Klassiker", "Fruchtig", "Alkoholfrei" */
  tag?: string;
  /** `sage` = pale sage card (default), `white` = white card with thin sage border */
  variant?: RecipeCardVariant;
  loading?: boolean;
  className?: string;
};

const BEBAS = "'Bebas Neue', 'Oswald', sans-serif";

export function RecipeCard({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  ingredients,
  tag,
  variant = 'sage',
  loading = false,
  className
}: RecipeCardProps) {
  const surface =
  variant === 'sage' ? 'bg-card text-text' : 'border border-border bg-surface text-text';
  const placeholder = variant === 'sage' ? 'bg-wash' : 'bg-card';

  if (loading) {
    return (
      <div
        aria-busy="true"
        aria-label="Rezept wird geladen"
        className={twMerge('w-full max-w-sm overflow-hidden rounded-[32px]', surface, className)}>
        
        <div className={twMerge('aspect-[3/4] w-full animate-pulse', placeholder)} />
        <div className="flex flex-col items-center gap-3 p-6">
          <div className={twMerge('h-6 w-2/3 animate-pulse rounded-full', placeholder)} />
          {[0, 1, 2, 3].map((i) =>
          <div key={i} className={twMerge('h-5 w-1/3 animate-pulse rounded-full', placeholder)} />
          )}
        </div>
      </div>);

  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={twMerge('group flex w-full max-w-sm flex-col overflow-hidden rounded-[32px]', surface, className)}>
      
      <div className={twMerge('relative aspect-[3/4] w-full overflow-hidden', placeholder)}>
        {imageSrc ?
        <img
          src={imageSrc}
          alt={imageAlt ?? title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /> :


        <div className="flex h-full w-full items-center justify-center text-muted-text">
            <GlassWaterIcon className="h-10 w-10" strokeWidth={1.25} aria-hidden="true" />
          </div>
        }
        {tag &&
        <span className="absolute left-4 top-4 rounded-full bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-text">
            {tag}
          </span>
        }
      </div>

      <div className="flex flex-1 flex-col items-center px-6 pb-8 pt-6 text-center">
        <h3 className="text-lg font-medium uppercase tracking-[0.18em] text-text md:text-xl">{title}</h3>
        {subtitle && <p className="mt-2 text-sm font-light leading-relaxed text-text">{subtitle}</p>}

        <span aria-hidden="true" className="my-5 block h-px w-12 bg-border" />

        <h4 className="sr-only">Zutaten</h4>
        <ul className="flex flex-col gap-1" style={{ fontFamily: BEBAS }}>
          {ingredients.map((ing, i) =>
          <li key={`${ing.name}-${i}`} className="text-2xl uppercase leading-tight tracking-[0.08em] text-text">
              {ing.name}
              {ing.amount && <span className="ml-2 text-muted-text">{ing.amount}</span>}
            </li>
          )}
        </ul>
      </div>
    </motion.article>);

}