"use client";

import React from 'react';
import { DeliveryTimeline, DeliveryTimelineBadge } from './DeliveryTimeline';

// Demo component to showcase the DeliveryTimeline functionality
export function DeliveryTimelineDemo() {
  const sampleDeliveryTimes = [
    {
      title: "Impresión Digital",
      deliveryTime: {
        standard: "2-3 días hábiles",
        rush: "24 horas",
        notes: "Tiempo puede variar según cantidad y complejidad"
      }
    },
    {
      title: "Grabado Láser",
      deliveryTime: {
        standard: "2-4 días hábiles",
        rush: "24-48 horas",
        notes: "Tiempo depende del material y complejidad del diseño"
      }
    },
    {
      title: "Folletos y Papelería",
      deliveryTime: {
        standard: "3-5 días hábiles",
        rush: "48 horas",
        notes: "Diseño incluido en el servicio"
      }
    },
    {
      title: "Lonas y Gran Formato",
      deliveryTime: {
        standard: "3-5 días hábiles",
        notes: "Instalación disponible con costo adicional"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-white mb-4">
            Delivery Timeline Component Demo
          </h1>
          <p className="text-gray-400">
            Showcasing the DeliveryTimeline component with different service examples
          </p>
        </div>

        {/* Full Timeline Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sampleDeliveryTimes.map((service, index) => (
            <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
              <DeliveryTimeline deliveryTime={service.deliveryTime} />
            </div>
          ))}
        </div>

        {/* Badge Examples */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-semibold text-white mb-4">Badge Variations</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">With Rush Option</h4>
              <DeliveryTimelineBadge deliveryTime={sampleDeliveryTimes[0].deliveryTime} />
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Without Rush Option</h4>
              <DeliveryTimelineBadge deliveryTime={sampleDeliveryTimes[3].deliveryTime} />
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Hide Rush Option</h4>
              <DeliveryTimelineBadge 
                deliveryTime={sampleDeliveryTimes[0].deliveryTime} 
                showRush={false} 
              />
            </div>
          </div>
        </div>

        {/* Mobile Preview */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-semibold text-white mb-4">Mobile Preview</h3>
          <div className="max-w-sm mx-auto bg-gray-900 rounded-lg p-4 border border-gray-600">
            <DeliveryTimeline deliveryTime={sampleDeliveryTimes[1].deliveryTime} />
          </div>
        </div>
      </div>
    </div>
  );
}