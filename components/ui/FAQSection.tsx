/**
 * FAQ Section Component
 * Frequently asked questions with collapsible answers
 */

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "Is ReelFetch free to use?",
    answer:
      "Yes! ReelFetch is completely free to use. You can download as many Instagram Reels as you want without any cost or registration.",
  },
  {
    question: "Is it legal to download Instagram Reels?",
    answer:
      "Downloading reels for personal use is generally allowed. However, you should respect content creators' rights and not redistribute or use their content commercially without permission.",
  },
  {
    question: "Can I download private account reels?",
    answer:
      "No, ReelFetch can only download reels from public Instagram accounts. Private account content cannot be accessed by our service.",
  },
  {
    question: "What quality can I download?",
    answer:
      "We offer HD quality downloads (up to 1080p) when available. The exact quality depends on the original upload quality of the reel.",
  },
  {
    question: "Do I need to install anything?",
    answer:
      "No installation required! ReelFetch works entirely in your browser on any device - desktop, tablet, or mobile phone.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. We don't store your downloaded videos or any personal information. Your privacy and security are our top priorities.",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Got questions? We've got answers
          </p>
        </div>

        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className={cn("faq-item", openIndex === index && "faq-item-open")}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "faq-chevron",
                    openIndex === index && "faq-chevron-open"
                  )}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                aria-hidden={openIndex !== index}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
