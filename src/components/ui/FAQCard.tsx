// src/components/ui/FAQCard.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import { FAQItem } from '@/data/faq';

interface FAQCardProps {
  faq: FAQItem;
  index: number;
}

export const FAQCard: React.FC<FAQCardProps> = ({ faq, index }) => {
  return (
    <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600 transition-all duration-300">
      <div className="p-8 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0 p-3 bg-blue-600 rounded-lg">
            <HelpCircle className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-blue-400 bg-blue-400/10 px-2 py-1 rounded-full">
                {faq.category}
              </span>
              <span className="text-xs text-gray-500">
                #{index + 1}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-white leading-tight">
              {faq.question}
            </h3>
          </div>
        </div>

        {/* Answer */}
        <div className="flex-1">
          <p className="text-gray-300 leading-relaxed">
            {faq.answer}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            ¿Tienes más preguntas? <span className="text-blue-400">Contáctanos</span>
          </p>
        </div>
      </div>
    </Card>
  );
};