"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FOOD_MENU, DRINK_MENU, type MenuItem } from "@/lib/menu";

type Tab = "food" | "drink";

function Row({ item }: { item: MenuItem }) {
  return (
    <li className="grid grid-cols-[1fr_auto] items-baseline gap-6 py-[0.6rem] text-[0.95rem] leading-[1.5] text-ink">
      <span>{item.name}</span>
      <span className="tabular-nums">{item.price}</span>
    </li>
  );
}

export function MenuList() {
  const [tab, setTab] = useState<Tab>("food");

  return (
    <div>
      <div className="mb-10 flex items-center gap-10 border-b border-ink/15">
        {(["food", "drink"] as const).map((key) => {
          const label = key === "food" ? "Food Menu" : "Drink Menu";
          const active = tab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`-mb-px border-b-2 pb-3 text-[0.95rem] font-bold transition-colors ${
                active
                  ? "border-ink text-ink"
                  : "border-transparent text-mute hover:text-ink"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {tab === "food" ? (
          <motion.ul
            key="food"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {FOOD_MENU.map((item) => (
              <Row key={item.name} item={item} />
            ))}
          </motion.ul>
        ) : (
          <motion.div
            key="drink"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {DRINK_MENU.map((section) => (
              <section key={section.title} className="mb-10 last:mb-0">
                <h3 className="mb-4 text-[0.95rem] font-bold text-ink">
                  {section.title}
                </h3>
                <ul className="flex flex-col">
                  {section.items.map((item) => (
                    <Row key={item.name} item={item} />
                  ))}
                </ul>
              </section>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
